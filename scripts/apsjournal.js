/**
 * Safe window reload after settings changes
 **/

const debouncedReload = foundry.utils.debounce(
    () => window.location.reload(),
    100
);

/**
 * Change to the selected theme in local storage
 **/
const setTheme = (theme) => (document.documentElement.className = theme);

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

    let theme = localStorage.getItem('apsj-theme');

    if (theme) {
        setTheme(theme);
    } else {
        setTheme('red');
    }

    CONFIG.TinyMCE.plugins =
        ' advlist lists anchor searchreplace textpattern template image table hr code save link';

    CONFIG.TinyMCE.toolbar =
        'styleselect fontselect fontsizeselect formatgroup paragraphgroup insertgroup code save';

    CONFIG.TinyMCE.toolbar_groups = {
        formatgroup: {
            icon: 'format',
            tooltip: 'Formatting',
            items: 'bold italic underline strikethrough | forecolor backcolor | superscript subscript | removeformat',
        },
        paragraphgroup: {
            icon: 'paragraph',
            tooltip: 'Paragraph format',
            items: 'h1 h2 h3 | bullist numlist | alignleft aligncenter alignright | indent outdent',
        },
        insertgroup: {
            icon: 'plus',
            tooltip: 'Insert',
            items: 'link anchor image table hr | template',
        },
    };

    CONFIG.TinyMCE.content_css.push('modules/apsjournal/styles/apsjournal.css');
});

Hooks.on('ready', () => {
    if (game.settings.get('apsjournal', 'apsjournalEnableParchment')) {
        let innerHTML = '';
        let style = document.createElement('style');
        style.id = 'apsjournal-changes';
        innerHTML += `
.journal-sheet form.editable, .journal-sheet form.locked {
    background-image: url(modules/apsjournal/assets/parchment.webp);
}

.monks-enhanced-journal .mainbar {
    background-image: url(modules/apsjournal/assets/parchment-medium.webp);
}

.monks-enhanced-journal .directory-sidebar {
    background-image: url(modules/apsjournal/assets/parchment-medium.webp) !important;
}

.dnd5e .monks-enhanced-journal .tab-bar .journal-tab.active {
    background-image: url(modules/apsjournal/assets/parchment.webp);
}

.monks-journal-sheet .encounter-body {
    background-image: url(modules/apsjournal/assets/parchment-bloody.webp);
}

.monks-journal-sheet,
.monks-journal-sheet.sheet .person-container,
.monks-journal-sheet.sheet .place-container,
.monks-journal-sheet.sheet .quest-container,
.monks-journal-sheet.sheet .organization-container,
.monks-journal-sheet.sheet .shop-container,
.monks-journal-sheet.sheet .loot-container,
.monks-journal-sheet.sheet .poi-container {
    background-image: url(modules/apsjournal/assets/parchment.webp);
}
`;
        style.innerHTML = innerHTML;
        if (innerHTML != '') {
            document.querySelector('head').appendChild(style);
        }
    }

    CONFIG.TinyMCE.style_formats.push({
        title: 'Stylish Text',
        items: [
            {
                title: game.i18n.format('apsjournal.textHeadingTitleName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'dnd-title',
            },
            {
                title: game.i18n.format('apsjournal.textHeadingName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'dnd-heading',
            },
            {
                title: game.i18n.format('apsjournal.textDataHeadingName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'dnd-data-heading',
            },
            {
                title: game.i18n.format('apsjournal.textDataName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'dnd-data',
            },
            {
                title: game.i18n.format('apsjournal.textParagraphName'),
                selector: 'td,p',
                classes: 'dnd-text',
            },
        ],
    });

    CONFIG.TinyMCE.templates = CONFIG.TinyMCE.templates ?? [];
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

    Hooks.on('renderJournalSheet', () => {
        function changeColorTheme(theme, e) {
            setTheme(theme);
            localStorage.setItem('apsj-theme', theme);

            if (!e) var e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
        }

        function toggleThemeSwitcher() {
            var tooltip = document.getElementById('theme-switcher');
            if (tooltip.style.display === 'none') {
                tooltip.style.display = 'block';
            } else {
                tooltip.style.display = 'none';
            }
        }

        let buttons = document.getElementById('journal-buttons');
        let nba = document.createElement('div');
        nba.innerHTML = `<i class='fas fa-palette'></i>
		<div id='theme-switcher' style='display:none;'>
			<div class="ct-none" id="ct-none"></div>
			<div class="ct-blue" id="ct-blue"></div>
			<div class="ct-cyan" id="ct-cyan"></div>
			<div class="ct-green" id="ct-green"></div>
			<div class="ct-orange" id="ct-orange"></div>
			<div class="ct-purple" id="ct-purple"></div>
			<div class="ct-red" id="ct-red"></div>
			<div class="ct-yellow" id="ct-yellow"></div>
		</div>`;
        nba.title = 'Color Theme';
        nba.classList.add('nav-button');
        nba.classList.add('apsj-ct');
        nba.setAttribute('id', 'apsj-color-theme-toggle');
        buttons.parentNode.insertBefore(nba, buttons.nextSibling);

        document.getElementById('ct-none').addEventListener(
            'click',
            function (event) {
                changeColorTheme('none', event);
            },
            false
        );

        document.getElementById('ct-blue').addEventListener(
            'click',
            function (event) {
                changeColorTheme('blue', event);
            },
            false
        );

        document.getElementById('ct-cyan').addEventListener(
            'click',
            function (event) {
                changeColorTheme('cyan', event);
            },
            false
        );

        document.getElementById('ct-green').addEventListener(
            'click',
            function (event) {
                changeColorTheme('green', event);
            },
            false
        );

        document.getElementById('ct-orange').addEventListener(
            'click',
            function (event) {
                changeColorTheme('orange', event);
            },
            false
        );

        document.getElementById('ct-purple').addEventListener(
            'click',
            function (event) {
                changeColorTheme('purple', event);
            },
            false
        );

        document.getElementById('ct-red').addEventListener(
            'click',
            function (event) {
                changeColorTheme('red', event);
            },
            false
        );

        document.getElementById('ct-yellow').addEventListener(
            'click',
            function (event) {
                changeColorTheme('yellow', event);
            },
            false
        );

        document.getElementById('apsj-color-theme-toggle').onclick =
            function () {
                toggleThemeSwitcher();
            };
    });

    console.log(
        `%c Arius Planeswalker's \n%cStylish\n%cJournal`,
        'font-weight: bold;text-shadow: 1px 1px 0px rgba(0,0,0,0.6);font-size:24px;background: rgb(241, 217, 181); color: #800000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block; margin-left: -30px;',
        'font-weight: bold;text-shadow: -2px -2px 0px rgB(255,255,255), 2px 2px 0px rgba(0,0,0,0.6);font-size:75px;background: rgb(241, 217, 181); color: #000000; padding: 2px 28px 0 2px; width: 100%; display: inline-block;'
    );
});
