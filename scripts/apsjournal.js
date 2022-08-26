/**
 * Safe window reload after settings changes
 **/

const debouncedReload = foundry.utils.debounce(
    () => window.location.reload(),
    100
);

Hooks.on('init', () => {
    game.settings.register('apsjournal', 'apsjournalEnableParchment', {
        name: game.i18n.format('apsjournal.menuEnableParchmentName'),
        hint: game.i18n.format('apsjournal.menuEnableParchmentHint'),
        scope: 'client',
        config: true,
        default: true,
        type: Boolean,
        onChange: debouncedReload,
    });

    FontConfig.loadFont('Bookinsanity', {
        editor: true,
        fonts: [
            { urls: 'fonts/Bookinsanity/Bookinsanity.otf' },
            { urls: 'fonts/Bookinsanity/BookinsanityBold.otf', weight: 700 },
            {
                urls: 'fonts/Bookinsanity/BookinsanityBoldItalic.otf',
                weight: 700,
                style: 'italic',
            },
            {
                urls: 'fonts/Bookinsanity/BookinsanityItalic.otf',
                style: 'italic',
            },
        ],
    });

    FontConfig.loadFont('DungeonDropCase', {
        editor: true,
        fonts: [{ urls: 'fonts/DungeonDropCase/DungeonDropCase.otf' }],
    });

    FontConfig.loadFont('MrEaves', {
        editor: true,
        fonts: [{ urls: 'fonts/MrEaves/MrEaves.otf' }],
    });

    FontConfig.loadFont('ScalySans', {
        editor: true,
        fonts: [
            { urls: 'fonts/ScalySans/ScalySans.otf' },
            { urls: 'fonts/ScalySans/ScalySansBold.otf', weight: 700 },
            {
                urls: 'fonts/ScalySans/ScalySansBoldItalic.otf',
                weight: 700,
                style: 'italic',
            },
            { urls: 'fonts/ScalySans/ScalySansCaps.otf', style: 'caps' },
            {
                urls: 'fonts/ScalySans/ScalySansCapsBold.otf',
                style: 'caps',
                weight: 700,
            },
            {
                urls: 'fonts/ScalySans/ScalySansCapsBoldItalic.otf',
                style: 'caps italic',
                weight: 700,
            },
            {
                urls: 'fonts/ScalySans/ScalySansCapsItalic.otf',
                style: 'caps italic',
            },
            { urls: 'fonts/ScalySans/ScalySansItalic.otf', style: 'italic' },
        ],
    });
});

Hooks.on('ready', () => {
    if (game.settings.get('apsjournal', 'apsjournalEnableParchment')) {
        let innerHTML = '';
        let style = document.createElement('style');
        style.id = 'apsjournal-changes';
        innerHTML += `
.sheet.journal-entry .journal-entry-content, .journal-sheet form.editable, .journal-sheet form.locked {
    background-image: url(modules/apsjournal/assets/parchment.webp);
}

.sheet.journal-entry .sidebar {
    background-image: url(modules/apsjournal/assets/parchment-medium.webp) !important;
}
`;
        style.innerHTML = innerHTML;
        if (innerHTML != '') {
            document.querySelector('head').appendChild(style);
        }
    }

    // Insert HTML segments for Panels, Blocks, and Dialogues here

    console.log(
        `%c Arius Planeswalker's \n%cStylish\n%cJournal`,
        'font-weight: bold;text-shadow: 1px 1px 0px rgba(0,0,0,0.6);font-size:24px;background: rgb(241, 217, 181); color: #800000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block; margin-left: -30px;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;'
    );
});
