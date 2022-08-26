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

// class MyMenu extends ProseMirror.ProseMirrorMenu {}

// Hooks.on('createProseMirrorEditor', () => {
//     plugins.menu = MyMenu.build(ProseMirror.defaultSchema);
// });

Hooks.on('createProseMirrorEditor', () => {
    ProseMirror.defaultPlugins.menu =
        class extends ProseMirror.ProseMirrorMenu {
            _getDropDownMenus() {
                const menus = super._getDropDownMenus();
                menus.format.entries.push({
                    action: 'apsj-text',
                    title: 'Stylish Text',
                    children: [],
                });
                menus.format.entries.push({
                    action: 'apsj-blocks',
                    title: 'Stylish Blocks',
                    children: [],
                });
                menus.format.entries.push({
                    action: 'apsj-panels',
                    title: 'Stylish Panels',
                    children: [],
                });
                return menus;
            }
        }.build(ProseMirror.defaultSchema);
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

    CONFIG.TinyMCE.templates.push(
        {
            title: game.i18n.format('apsjournal.panelBonusName'),
            description: game.i18n.format('apsjournal.panelBonusDescription'),
            content:
                `
<section class="panel bonus">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelBonusHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelEffectName'),
            description: game.i18n.format('apsjournal.panelEffectDescription'),
            content:
                `
<section class="panel effect">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelEffectHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelInformationName'),
            description: game.i18n.format(
                'apsjournal.panelInformationDescription'
            ),
            content:
                `
<section class="panel info">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelInformationHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelLootName'),
            description: game.i18n.format('apsjournal.panelLootDescription'),
            content:
                `
<section class="panel loot">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelLootHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelNoteName'),
            description: game.i18n.format('apsjournal.panelNoteDescription'),
            content:
                `
<section class="panel note">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelNoteHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelTrapName'),
            description: game.i18n.format('apsjournal.panelTrapDescription'),
            content:
                `
<section class="panel trap">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelTrapHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.panelWarningName'),
            description: game.i18n.format('apsjournal.panelWarningDescription'),
            content:
                `
<section class="panel warning">
	<header class="dnd-panel-heading">` +
                game.i18n.format('apsjournal.panelWarningHeading') +
                `</header>
	<main>
		<p class="dnd-data">` +
                game.i18n.format('apsjournal.panelBody') +
                `</p>
	</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockCardName'),
            description: game.i18n.format('apsjournal.blockCardDescription'),
            content:
                `
<section class="block deck-card">
	<div class="block-contents">
		<aside class="apsj-card">
			<p></p>
		</aside>
		<main>
			<header>
				<h1 class="dnd-title">` +
                game.i18n.format('apsjournal.blockCardHeading') +
                `</h1>
			</header>` +
                game.i18n.format('apsjournal.blockCardBody') +
                `</main>
	</div>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockEncounterName'),
            description: game.i18n.format(
                'apsjournal.blockEncounterDescription'
            ),
            content:
                `
<section class="block encounter">
	<header><h1 class="dnd-title">` +
                game.i18n.format('apsjournal.blockEncounterHeading') +
                `</h1></header>
	<div class="block-contents">
		<main class="light-overlay">
			<h2 class="dnd-heading">` +
                game.i18n.format('apsjournal.blockDescription') +
                `</h2>` +
                game.i18n.format('apsjournal.blockEncounterBody') +
                `</main>
		<aside class="red-overlay">
			<h2 class="dnd-heading black-border">` +
                game.i18n.format('apsjournal.blockAdversaries') +
                `</h2>
			<p class="dnd-data"></p>
		</aside>
	</div>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockMagicItemName'),
            description: game.i18n.format(
                'apsjournal.blockMagicItemDescription'
            ),
            content:
                `
<section class="block magic-item">
	<header>
		<h1 class="dnd-title">` +
                game.i18n.format('apsjournal.blockMagicItemHeading') +
                `</h1>
	</header>
	<div class="block-contents">
		<main>
			<h2 class="dnd-heading">` +
                game.i18n.format('apsjournal.blockDescription') +
                `</h2>` +
                game.i18n.format('apsjournal.blockMagicItemBody') +
                `</main>
		<aside class="blue-overlay">
			<h2 class="dnd-heading">` +
                game.i18n.format('apsjournal.blockStats') +
                `</h2>
			<p class="dnd-data"></p>
			<hr>
			<p class="dnd-data"></p>
		</aside>
	</div>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockReadAloudName'),
            description: game.i18n.format(
                'apsjournal.blockReadAloudDescription'
            ),
            content:
                `
<section class="block read-aloud">
	<main>
		<div class="ra-icon"></div>` +
                game.i18n.format('apsjournal.blockReadAloudBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueBlueLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-blue">
	<main>
		<div class="dialogue-icon-left blue"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueBlueRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-blue">
	<main>
		<div class="dialogue-icon-right blue"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueCyanLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-cyan">
	<main>
		<div class="dialogue-icon-left cyan"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueCyanRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-cyan">
	<main>
		<div class="dialogue-icon-right cyan"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueGreenLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-green">
	<main>
		<div class="dialogue-icon-left green"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueGreenRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-green">
	<main>
		<div class="dialogue-icon-right green"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueOrangeLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-orange">
	<main>
		<div class="dialogue-icon-left orange"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueOrangeRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-orange">
	<main>
		<div class="dialogue-icon-right orange"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialoguePurpleLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-purple">
	<main>
		<div class="dialogue-icon-left purple"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialoguePurpleRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-purple">
	<main>
		<div class="dialogue-icon-right purple"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueRedLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-red">
	<main>
		<div class="dialogue-icon-left red"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueRedRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-red">
	<main>
		<div class="dialogue-icon-right red"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueYellowLeftName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-yellow">
	<main>
		<div class="dialogue-icon-left yellow"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        },
        {
            title: game.i18n.format('apsjournal.blockDialogueYellowRightName'),
            description: game.i18n.format(
                'apsjournal.blockDialogueDescription'
            ),
            content:
                `
<section class="block dialogue-yellow">
	<main>
		<div class="dialogue-icon-right yellow"></div>` +
                game.i18n.format('apsjournal.blockDialogueBody') +
                `</main>
</section>
<p></p>`,
        }
    );

    console.log(
        `%c Arius Planeswalker's \n%cStylish\n%cJournal`,
        'font-weight: bold;text-shadow: 1px 1px 0px rgba(0,0,0,0.6);font-size:24px;background: rgb(241, 217, 181); color: #800000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block; margin-left: -30px;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;'
    );
});
