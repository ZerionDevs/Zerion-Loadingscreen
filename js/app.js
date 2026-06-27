(function () {
    'use strict';

    const cfg = typeof Config !== 'undefined' ? Config : {};

    /* ── Theme ───────────────────────────────────────────────────────────── */
    function applyTheme() {
        const t = cfg.theme || {};
        const root = document.documentElement;
        if (t.accent) root.style.setProperty('--accent', t.accent);
        if (t.accentMuted) root.style.setProperty('--accent-muted', t.accentMuted);
        if (t.glassBackground) root.style.setProperty('--glass-bg', t.glassBackground);
        if (t.glassBorder) root.style.setProperty('--glass-border', t.glassBorder);
        if (t.linkAccent) root.style.setProperty('--link-accent', t.linkAccent);
        if (t.linkBorder) root.style.setProperty('--link-border', t.linkBorder);
        if (t.fontFamily) root.style.setProperty('--font', t.fontFamily);
    }

    /* ── Branding ────────────────────────────────────────────────────────── */
    function initBranding() {
        const s = cfg.server || {};
        const nameEl = document.getElementById('brand-name');
        const tagEl = document.getElementById('brand-tagline');
        const logoEl = document.getElementById('brand-logo');

        if (nameEl) nameEl.textContent = s.name || 'Server';
        if (tagEl) tagEl.textContent = s.tagline || '';

        if (logoEl && s.logo) {
            logoEl.src = s.logo;
            logoEl.classList.remove('hidden');
        }
    }

    /* ── Slideshow ───────────────────────────────────────────────────────── */
    function initSlideshow() {
        const bg = cfg.backgrounds || {};
        const images = bg.images || [];
        if (!images.length) return;

        const fadeMs = bg.fadeDuration || 1800;
        const slideMs = bg.slideDuration || 8000;
        const overlayOpacity = bg.overlayOpacity ?? 0.55;

        document.documentElement.style.setProperty('--fade-duration', fadeMs + 'ms');

        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.style.background = `
                radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity * 0.5}) 0%, rgba(0,0,0,${overlayOpacity}) 100%)
            `;
        }

        const slideA = document.querySelector('.slide-a');
        const slideB = document.querySelector('.slide-b');
        if (!slideA || !slideB) return;

        let index = 0;
        let useA = true;

        function setSlide(el, src) {
            el.style.backgroundImage = `url("${src}")`;
        }

        setSlide(slideA, images[0]);
        slideA.classList.add('active');

        if (images.length < 2) return;

        setInterval(function () {
            index = (index + 1) % images.length;
            const incoming = useA ? slideB : slideA;
            const outgoing = useA ? slideA : slideB;

            setSlide(incoming, images[index]);
            incoming.classList.add('active');
            outgoing.classList.remove('active');
            useA = !useA;
        }, slideMs);
    }

    /* ── Music Player ────────────────────────────────────────────────────── */
    function initMusic() {
        const music = cfg.music || {};
        const songs = music.songs || [];
        if (!songs.length) {
            const player = document.getElementById('music-player');
            if (player) player.style.display = 'none';
            return;
        }

        const audio = document.getElementById('audio');
        const player = document.getElementById('music-player');
        const cover = document.getElementById('player-cover');
        const title = document.getElementById('player-title');
        const artist = document.getElementById('player-artist');
        const seek = document.getElementById('player-seek');
        const volume = document.getElementById('player-volume');
        const currentEl = document.getElementById('player-current');
        const durationEl = document.getElementById('player-duration');
        const btnPlay = document.getElementById('btn-play');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const btnVolDown = document.getElementById('btn-vol-down');
        const btnVolUp = document.getElementById('btn-vol-up');

        let trackIndex = 0;
        let isPlaying = false;
        let isSeeking = false;
        const defaultVol = Math.round((music.defaultVolume ?? 0.45) * 100);

        function formatTime(sec) {
            if (!isFinite(sec) || sec < 0) return '0:00';
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60);
            return m + ':' + String(s).padStart(2, '0');
        }

        function loadTrack(idx) {
            trackIndex = ((idx % songs.length) + songs.length) % songs.length;
            const song = songs[trackIndex];

            if (cover) {
                cover.src = song.cover || '';
                cover.alt = song.title || 'Cover';
            }
            if (title) title.textContent = song.title || 'Unknown';
            if (artist) artist.textContent = song.artist || 'Unknown';

            if (audio) {
                audio.src = song.audio || '';
                audio.load();
            }

            if (seek) seek.value = 0;
            if (currentEl) currentEl.textContent = '0:00';
            if (durationEl) durationEl.textContent = '0:00';
        }

        function togglePlay() {
            if (!audio) return;
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(function () {});
            }
        }

        function nextTrack() {
            loadTrack(trackIndex + 1);
            if (isPlaying && audio) audio.play().catch(function () {});
        }

        function prevTrack() {
            if (audio && audio.currentTime > 3) {
                audio.currentTime = 0;
                return;
            }
            loadTrack(trackIndex - 1);
            if (isPlaying && audio) audio.play().catch(function () {});
        }

        function setVolume(val) {
            const v = Math.max(0, Math.min(100, val));
            if (volume) volume.value = v;
            if (audio) audio.volume = v / 100;
        }

        loadTrack(0);
        setVolume(defaultVol);

        if (audio) {
            audio.volume = defaultVol / 100;

            audio.addEventListener('loadedmetadata', function () {
                if (durationEl) durationEl.textContent = formatTime(audio.duration);
            });

            audio.addEventListener('timeupdate', function () {
                if (isSeeking || !seek) return;
                const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
                seek.value = pct;
                if (currentEl) currentEl.textContent = formatTime(audio.currentTime);
            });

            audio.addEventListener('ended', function () {
                if (music.shuffle) {
                    let next;
                    do {
                        next = Math.floor(Math.random() * songs.length);
                    } while (next === trackIndex && songs.length > 1);
                    loadTrack(next);
                } else {
                    loadTrack(trackIndex + 1);
                }
                audio.play().catch(function () {});
            });

            audio.addEventListener('play', function () {
                isPlaying = true;
                if (player) player.classList.add('is-playing');
            });

            audio.addEventListener('pause', function () {
                isPlaying = false;
                if (player) player.classList.remove('is-playing');
            });
        }

        if (btnPlay) btnPlay.addEventListener('click', togglePlay);
        if (btnNext) btnNext.addEventListener('click', nextTrack);
        if (btnPrev) btnPrev.addEventListener('click', prevTrack);

        if (btnVolDown) {
            btnVolDown.addEventListener('click', function () {
                setVolume(parseInt(volume.value, 10) - 10);
            });
        }

        if (btnVolUp) {
            btnVolUp.addEventListener('click', function () {
                setVolume(parseInt(volume.value, 10) + 10);
            });
        }

        if (volume) {
            volume.addEventListener('input', function () {
                setVolume(parseInt(volume.value, 10));
            });
        }

        if (seek) {
            seek.addEventListener('mousedown', function () { isSeeking = true; });
            seek.addEventListener('touchstart', function () { isSeeking = true; }, { passive: true });

            function releaseSeek() {
                if (!isSeeking || !audio) return;
                isSeeking = false;
                const pct = parseFloat(seek.value) / 100;
                if (audio.duration) audio.currentTime = pct * audio.duration;
            }

            seek.addEventListener('mouseup', releaseSeek);
            seek.addEventListener('touchend', releaseSeek);
            seek.addEventListener('input', function () {
                if (isSeeking && audio && audio.duration) {
                    const t = (parseFloat(seek.value) / 100) * audio.duration;
                    if (currentEl) currentEl.textContent = formatTime(t);
                }
            });
        }

        if (music.autoplay && audio) {
            audio.play().catch(function () {
                document.addEventListener('click', function once() {
                    audio.play().catch(function () {});
                    document.removeEventListener('click', once);
                }, { once: true });
            });
        }
    }

    /* ── Action Buttons & Modals ─────────────────────────────────────────── */
    function openExternalLink(url) {
        if (window.invokeNative) {
            window.invokeNative('openUrl', url);
        } else {
            window.open(url, '_blank');
        }
    }

    function initLinks() {
        const links = cfg.links || {};

        function setupLink(id, data) {
            const el = document.getElementById(id);
            if (!el || !data || data.enabled === false || !data.url) {
                if (el) el.classList.add('hidden');
                return;
            }

            el.href = data.url;
            el.setAttribute('aria-label', data.label || id);

            const labelEl = el.querySelector('.dock-label');
            if (labelEl) labelEl.textContent = data.label || id;

            el.classList.remove('hidden');
            el.addEventListener('click', function (e) {
                e.preventDefault();
                openExternalLink(data.url);
            });
        }

        setupLink('link-discord', links.discord);
        setupLink('link-website', links.website);
    }

    function initPanels() {
        const panels = cfg.panels || {};

        document.querySelectorAll('.dock-btn[data-panel]').forEach(function (btn) {
            const key = btn.dataset.panel;
            const panel = panels[key];
            if (!panel) return;

            const labelEl = btn.querySelector('.dock-label');
            if (labelEl) labelEl.textContent = panel.buttonLabel || key.charAt(0).toUpperCase() + key.slice(1);

            btn.setAttribute('aria-label', panel.buttonLabel || key);
            btn.addEventListener('click', function () { openModal(key); });
        });

        document.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function openModal(key) {
        const panels = cfg.panels || {};
        const panel = panels[key];
        if (!panel) return;

        const modal = document.getElementById('modal');
        const titleEl = document.getElementById('modal-title');
        const subtitleEl = document.getElementById('modal-subtitle');
        const bodyEl = document.getElementById('modal-body');

        if (titleEl) titleEl.textContent = panel.title || '';
        if (subtitleEl) subtitleEl.textContent = panel.subtitle || '';
        if (bodyEl) bodyEl.innerHTML = buildModalContent(key, panel);

        if (modal) modal.classList.remove('hidden');
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) modal.classList.add('hidden');
    }

    function buildModalContent(key, panel) {
        if (key === 'staff' && panel.members) {
            let html = '<div class="staff-grid">';
            panel.members.forEach(function (m) {
                html += '<div class="staff-card">';
                if (m.image) {
                    html += '<div class="staff-avatar-wrap">';
                    html += '<img class="staff-avatar" src="' + esc(m.image) + '" alt="' + esc(m.name) + '">';
                    html += '</div>';
                }
                html += '<div class="staff-info">';
                html += '<span class="staff-name">' + esc(m.name) + '</span>';
                html += '<span class="staff-role">' + esc(m.role) + '</span>';
                if (m.discord) html += '<span class="staff-discord">' + esc(m.discord) + '</span>';
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            return html;
        }

        let html = '';
        (panel.sections || []).forEach(function (section) {
            html += '<div class="modal-section">';
            if (section.heading) html += '<h3>' + esc(section.heading) + '</h3>';

            if (section.paragraphs) {
                section.paragraphs.forEach(function (p) {
                    html += '<p>' + esc(p) + '</p>';
                });
            }

            if (section.items) {
                html += '<ul>';
                section.items.forEach(function (item) {
                    html += '<li>' + esc(item) + '</li>';
                });
                html += '</ul>';
            }

            html += '</div>';
        });

        return html;
    }

    function esc(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    /* ── Loading Progress ────────────────────────────────────────────────── */
    function initLoading() {
        const loading = cfg.loading || {};
        const labelEl = document.getElementById('loading-label');
        const tipEl = document.getElementById('loading-tip');
        const progressWrap = document.getElementById('progress-wrap');
        const progressBar = document.getElementById('progress-bar');
        const progressPct = document.getElementById('progress-percent');

        if (labelEl) labelEl.textContent = loading.label || 'Loading';

        if (progressWrap) {
            if (loading.showProgress === false) {
                progressWrap.classList.add('hidden');
            }
        }

        const tips = loading.tips || [];
        let tipIndex = 0;

        if (tipEl && tips.length) {
            tipEl.textContent = tips[0];
            if (loading.tipInterval > 0) {
                setInterval(function () {
                    tipIndex = (tipIndex + 1) % tips.length;
                    tipEl.classList.add('fade');
                    setTimeout(function () {
                        tipEl.textContent = tips[tipIndex];
                        tipEl.classList.remove('fade');
                    }, 400);
                }, loading.tipInterval);
            }
        } else if (tipEl) {
            tipEl.style.display = 'none';
        }

        window.addEventListener('message', function (event) {
            const data = event.data;
            if (!data || data.eventName !== 'loadProgress') return;

            const fraction = data.loadFraction || 0;
            const pct = Math.round(fraction * 100);

            if (progressBar) progressBar.style.width = pct + '%';
            if (progressPct) progressPct.textContent = pct + '%';
        });
    }

    /* ── Player of the Weekend ─────────────────────────────────────────── */
    function initPlayerWeekend() {
        const potw = cfg.playerOfTheWeekend;
        const el = document.getElementById('player-weekend');
        if (!el) return;

        if (!potw || potw.enabled === false) {
            el.classList.add('hidden');
            return;
        }

        const labelEl = document.getElementById('potw-label');
        const nameEl = document.getElementById('potw-name');
        const subtitleEl = document.getElementById('potw-subtitle');
        const avatarEl = document.getElementById('potw-avatar');

        if (labelEl) labelEl.textContent = potw.title || 'Player of the Weekend';
        if (nameEl) nameEl.textContent = potw.name || '—';
        if (subtitleEl) subtitleEl.textContent = potw.subtitle || '';

        if (avatarEl && potw.image) {
            avatarEl.src = potw.image;
            avatarEl.alt = potw.name || 'Player of the Weekend';
        }

        el.classList.remove('hidden');
    }

    /* ── Init ────────────────────────────────────────────────────────────── */
    applyTheme();
    initBranding();
    initSlideshow();
    initMusic();
    initPlayerWeekend();
    initLinks();
    initPanels();
    initLoading();
})();
