fx_version 'cerulean'
game 'gta5'

name 'zn-loadscreen'
author 'Zerion'
description 'Premium Loading Screen with Music Player & Slideshow'
version '1.0.0'

loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

files {
    'html/index.html',
    'css/style.css',
    'js/config.js',
    'js/app.js',
    'assets/images/*',
    'assets/images/staff/*',
    'assets/images/potw/*',
    'assets/music/*',
}

client_script 'client.lua'
