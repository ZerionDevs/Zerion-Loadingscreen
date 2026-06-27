
[Discord Link ](http://discord.gg/zerion)

[Website Link](https://zeriondevs.online)

# ZN Loadscreen

Premium FiveM loading screen by **Zerion**. Modern black/white UI with music player, background slideshow, social links, staff panel, and Player of the Weekend — all editable from a single config file.

## Features

- **Premium UI** — Glassmorphism design, smooth animations, responsive layout
- **Background slideshow** — Unlimited images with crossfade + subtle zoom
- **Music player** — Play/pause, next/previous, seek bar, volume, time display
- **Player of the Weekend** — Highlight card under the music player
- **Link dock** — Vertical Discord / Website tiles with icons (left side on desktop)
- **Staff panel** — Modal with avatars, roles, and Discord handles
- **Loading progress** — Native FiveM load bar + rotating tips
- **Fully configurable** — Edit `js/config.js` only; no code changes required

## Dependencies

None. Standalone resource.

## Installation

1. Place `zn-loadscreen` in your resources folder.
2. Add your assets:
   - Background images → `assets/images/`
   - Music files → `assets/music/`
   - Staff avatars → `assets/images/staff/`
   - Player of the Week image → `assets/images/potw/`
3. Edit `js/config.js` with your server details.
4. Add to `server.cfg`:

```cfg
ensure zn-loadscreen
```

5. Remove or disable any other loadscreen resource to avoid conflicts.

## Folder Structure

```
zn-loadscreen/
├── fxmanifest.lua
├── client.lua
├── README.md
├── html/
│   └── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js      ← edit everything here
│   └── app.js
└── assets/
    ├── images/        ← backgrounds, covers, logo, staff, potw
    └── music/         ← .mp3 / .ogg / .wav files
```

## Configuration

All settings live in **`js/config.js`**.

> **Important:** Paths are relative to `html/index.html`. Always use `../assets/...` for local files.

### Server branding

```javascript
server: {
    name: 'Zerion RP',
    tagline: 'Premium Roleplay Experience',
    logo: '../assets/images/logo.png', // set to "" to hide
},
```

### Loading bar & tips

```javascript
loading: {
    showProgress: true,
    label: 'Loading into Los Santos',
    tipInterval: 6000, // 0 = disable rotating tips
    tips: ['Tip one', 'Tip two'],
},
```

### Background slideshow

```javascript
backgrounds: {
    slideDuration: 8000,
    fadeDuration: 1800,
    overlayOpacity: 0.55,
    images: [
        '../assets/images/1.jpg',
        '../assets/images/2.jpg',
    ],
},
```

Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`

### Music player

```javascript
music: {
    autoplay: true,
    defaultVolume: 0.45,
    shuffle: false,
    songs: [
        {
            title: 'Song Name',
            artist: 'Artist Name',
            cover: '../assets/images/cover-1.png',
            audio: '../assets/music/song.mp3',
        },
    ],
},
```

Add as many songs as you want. Audio can also be an external URL.

### Player of the Weekend

```javascript
playerOfTheWeekend: {
    enabled: true,
    title: 'Player of the Weekend',
    name: 'Player Name',
    subtitle: 'Outstanding RP · LSPD',
    image: '../assets/images/potw/player.png',
},
```

Set `enabled: false` to hide the section.

### Social links (left dock)

```javascript
links: {
    discord: {
        enabled: true,
        url: 'https://discord.gg/yourinvite',
        label: 'Discord',
    },
    website: {
        enabled: true,
        url: 'https://yourwebsite.com',
        label: 'Website',
    },
},
```

Set `enabled: false` on either link to hide it. Clicks open in the system browser via FiveM `openUrl`.

### Staff panel

```javascript
panels: {
    staff: {
        buttonLabel: 'Staff',
        title: 'Staff Team',
        subtitle: 'Meet the team.',
        members: [
            {
                name: 'Alex',
                role: 'Owner',
                discord: 'alex#0001',
                image: '../assets/images/staff/alex.png',
            },
        ],
    },
},
```

### Theme (optional)

```javascript
theme: {
    accent: '#ffffff',
    accentMuted: 'rgba(255, 255, 255, 0.45)',
    glassBackground: 'rgba(12, 12, 14, 0.72)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    linkAccent: '#ffffff',
    linkBorder: 'rgba(255, 255, 255, 0.45)',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
},
```

## UI Layout

| Area | Position |
|------|----------|
| Server name & tagline | Top left |
| Link dock (Discord, Website, Staff) | Left center (vertical) |
| Music player | Top right |
| Player of the Weekend | Below music player |
| Loading bar & tips | Bottom left |

On mobile, the link dock moves to the bottom center in a horizontal row.

## Adding New Assets

After adding files to `assets/`, update the matching path in `config.js`. If you add files in a **new subfolder**, also add it to `fxmanifest.lua`:

```lua
files {
    'assets/images/your-folder/*',
}
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Music not playing | Confirm `.mp3` exists in `assets/music/` and path in config is correct |
| Images not showing | Use `../assets/images/...` paths; check file is listed in `fxmanifest.lua` |
| Links not opening | `loadscreen_cursor 'yes'` must be set (already enabled) |
| Loadscreen stuck | Ensure `client.lua` runs; check for conflicting loadscreen resources |
| Old loadscreen still shows | Disable default/other loadscreen; restart server |

## Credits

**Zerion** — Premium FiveM Resources
