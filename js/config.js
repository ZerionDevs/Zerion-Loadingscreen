/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ZERION LOADING SCREEN — CONFIGURATION
 *  Edit everything below. No other files need to be touched.
 * ═══════════════════════════════════════════════════════════════════════════
 */

const Config = {

    /* ── Server Branding ─────────────────────────────────────────────────── */
    server: {
        name: 'Zerion RP',
        tagline: 'Premium Roleplay Experience',
        logo: '../assets/images/logo.png', // Set to "" to hide logo
    },

    /* ── Loading Bar ─────────────────────────────────────────────────────── */
    loading: {
        showProgress: true,
        label: 'Loading into Los Santos',
        tipInterval: 6000, // ms between rotating tips (0 = disabled)
        tips: [
            'Press T to open chat once you spawn in.',
            'Respect all players — quality RP starts with you.',
            'Join our Discord for updates and support.',
            'Read the server rules before starting your journey.',
        ],
    },

    /* ── Background Slideshow ────────────────────────────────────────────── */
    backgrounds: {
        slideDuration: 8000,   // ms each image stays visible
        fadeDuration: 1800,      // ms crossfade transition
        overlayOpacity: 0.55,    // 0–1 dark overlay on backgrounds
        images: [
            '../assets/images/1.jpg',
            '../assets/images/2.jpg',
            '../assets/images/3.jpg',
            '../assets/images/4.jpg',
        ],
    },

    /* ── Music Player ────────────────────────────────────────────────────── */
    music: {
        autoplay: true,
        defaultVolume: 0.45, // 0–1
        shuffle: false,
        songs: [
            {
                title: 'Arabic Sound',
                artist: 'Zerion Beats',
                cover: '../assets/images/cover-1.png',
                audio: '../assets/music/GTAV1.mp3',
            },
            {
                title: 'SAR',
                artist: 'SAR',
                cover: '../assets/images/cover-2.png',
                audio: '../assets/music/SAR.mp3',
            },
        ],
    },

    /* ── Player of the Weekend ───────────────────────────────────────────── */
    playerOfTheWeekend: {
        enabled: true,
        title: 'Player of the Weekend',
        name: 'Zerion Development',
        subtitle: 'Developers of Zerion RP',
        image: '../assets/images/logo.png',
    },

    /* ── Social Links (Discord / Website icons) ──────────────────────────── */
    links: {
        discord: {
            enabled: true,
            url: 'https://discord.gg/zerion',
            label: 'Discord',
        },
        website: {
            enabled: true,
            url: 'https://zeriondevs.online',
            label: 'Website',
        },
    },

    /* ── Modal Panels (STAFF button) ─────────────────────────────────────── */
    panels: {
        staff: {
            buttonLabel: 'Staff',
            title: 'Staff Team',
            subtitle: 'Meet the team keeping Los Santos running.',
            members: [
                { name: 'Zerion Development', role: 'Owner', discord: 'Zerion Development#6624', image: '../assets/images/logo.png' },
                { name: 'itayz', role: 'developer', discord: 'foxwez231', image: '../assets/images/staff/itayz.png' },
                { name: 'roy', role: 'developer', discord: 'roy12s.', image: '../assets/images/staff/roy.png' },
            ],
        },
    },

    /* ── UI Theme (advanced — optional tweaks) ───────────────────────────── */
    theme: {
        accent: '#ffffff',
        accentMuted: 'rgba(255, 255, 255, 0.45)',
        glassBackground: 'rgba(12, 12, 14, 0.72)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        linkAccent: '#FFFFFF',
        linkBorder: 'rgba(255, 255, 255, 0.45)',
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    },
};
