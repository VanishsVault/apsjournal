/**
 * Safe window reload after settings changes
 **/

const debouncedReload = foundry.utils.debounce(
    () => window.location.reload(),
    100
);

let modulename = 'apsjournal';

let APSJ = {};

/**
 * Change to the selected theme in local storage
 **/
const setTheme = (theme) => (document.documentElement.className = theme);

Hooks.on('init', () => {
    game.settings.register(modulename, 'enable-parchment', {
        name: game.i18n.format('APSJournal.enable-parchment.name'),
        hint: game.i18n.format('APSJournal.enable-parchment.hint'),
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

    FontConfig.loadFont('Bookinsanity', {
        editor: true,
        fonts: [
            {
                urls: [
                    'modules/apsjournal/fonts/Bookinsanity/Bookinsanity.otf',
                ],
            },
            {
                urls: [
                    'modules/apsjournal/fonts/Bookinsanity/BookinsanityBold.otf',
                ],
                weight: 700,
            },
            {
                urls: [
                    'modules/apsjournal/fonts/Bookinsanity/BookinsanityBoldItalic.otf',
                ],
                weight: 700,
                style: 'italic',
            },
            {
                urls: [
                    'modules/apsjournal/fonts/Bookinsanity/BookinsanityItalic.otf',
                ],
                style: 'italic',
            },
        ],
    });

    FontConfig.loadFont('DungeonDropCase', {
        editor: true,
        fonts: [
            {
                urls: [
                    'modules/apsjournal/fonts/DungeonDropCase/DungeonDropCase.otf',
                ],
            },
        ],
    });

    FontConfig.loadFont('MrEaves', {
        editor: true,
        fonts: [{ urls: ['modules/apsjournal/fonts/MrEaves/MrEaves.otf'] }],
    });

    FontConfig.loadFont('ScalySans', {
        editor: true,
        fonts: [
            { urls: ['modules/apsjournal/fonts/ScalySans/ScalySans.otf'] },
            {
                urls: ['modules/apsjournal/fonts/ScalySans/ScalySansBold.otf'],
                weight: 700,
            },
            {
                urls: [
                    'modules/apsjournal/fonts/ScalySans/ScalySansBoldItalic.otf',
                ],
                weight: 700,
                style: 'italic',
            },
            {
                urls: [
                    'modules/apsjournal/fonts/ScalySans/ScalySansItalic.otf',
                ],
                style: 'italic',
            },
        ],
    });

    FontConfig.loadFont('ScalySansCaps', {
        editor: true,
        fonts: [
            {
                urls: ['modules/apsjournal/fonts/ScalySans/ScalySansCaps.otf'],
            },
            {
                urls: [
                    'modules/apsjournal/fonts/ScalySans/ScalySansCapsBold.otf',
                ],
                weight: 700,
            },
            {
                urls: [
                    'modules/apsjournal/fonts/ScalySans/ScalySansCapsBoldItalic.otf',
                ],
                style: 'italic',
                weight: 700,
            },
            {
                urls: [
                    'modules/apsjournal/fonts/ScalySans/ScalySansCapsItalic.otf',
                ],
                style: 'italic',
            },
        ],
    });
});

Hooks.on('ready', () => {
    let innerHTML = '';

    if (game.settings.get(modulename, 'enable-parchment')) {
        let style = document.createElement('style');
        style.id = 'apsjournal-changes';
        innerHTML += `
.sheet.journal-entry .journal-entry-content,
.journal-sheet form.editable,
.journal-sheet form.locked {
	background-image: url(modules/apsjournal/assets/parchment.webp);
}

.sheet.journal-entry .sidebar,
.monks-enhanced-journal.flexrow {
	background-image: url(modules/apsjournal/assets/parchment-medium.webp) !important;
}
`;
        style.innerHTML = innerHTML;
        if (innerHTML != '') {
            document.querySelector('head').appendChild(style);
        }
    }

    /**
     * Define HTML Elements for Blocks
     **/

    APSJ.blocks = {
        black:
            `<section class="apsj-block black-item">
				<header>
				<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-black.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-black-item">
					</aside>

					<main class="apsj-light-overlay-bb">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-black.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        blue:
            `<section class="apsj-block blue-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-blue.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-blue-item">
					</aside>

					<main class="apsj-blue-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-blue.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        cyan:
            `<section class="apsj-block cyan-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-cyan.heading') +
            `</h1>
					</header>

					<div class="apsj-block-contents">
						<aside class="apsj-cyan-item">
						</aside>

						<main class="apsj-cyan-overlay">
							<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
							<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-cyan.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        green:
            `<section class="apsj-block green-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-green.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-green-item">
					</aside>

					<main class="apsj-green-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-green.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        orange:
            `<section class="apsj-block orange-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-orange.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-orange-item">
					</aside>

					<main class="apsj-orange-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-orange.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        purple:
            `<section class="apsj-block purple-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-purple.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-purple-item">
					</aside>

					<main class="apsj-purple-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-purple.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        red:
            `<section class="apsj-block red-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-red.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-red-item">
					</aside>

					<main class="apsj-red-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-red.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        yellow:
            `<section class="apsj-block yellow-item">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-yellow.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<aside class="apsj-yellow-item">
					</aside>

					<main class="apsj-yellow-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-yellow.yellow') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        card:
            `<section class="apsj-block apsj-card">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-card.heading') +
            `</h1>
				</header>
				<div class="apsj-block-contents" style="flex-wrap:wrap">
					<aside class="apsj-card-aside">
						<img title="null" src="custom/icons/items/Animated_Shield.webp" style="">
					</aside>
					<main class="apsj-purple-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-card.body') +
            `</p>
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.stats') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        scroll:
            `<section class="apsj-block apsj-scroll">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-scroll.heading') +
            `</h1>
				</header>
				<div class="apsj-block-contents" style="flex-wrap:wrap">
					<aside class="apsj-scroll-aside">
						<img title="null" src="custom/icons/items/Animated_Shield.webp" style="">
					</aside>
					<main class="apsj-green-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p class="apsj-data">` +
            game.i18n.format('APSJournal.block-scroll.body') +
            `</p>
					</main>
				</div>
			</section>
			<p></p>`,
        encounter:
            `<section class="apsj-block apsj-encounter">
				<header>
					<h1 class="apsj-title">` +
            game.i18n.format('APSJournal.block-encounter.heading') +
            `</h1>
				</header>

				<div class="apsj-block-contents">
					<main class="apsj-light-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.description') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-encounter.body') +
            `</p>
					</main>

					<aside class="apsj-red-overlay">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block.adversaries') +
            `</p>
						<p class="apsj-data"></p>
					</aside>
					<p></p>
				</div>
			</section>
			<p></p>`,
        readAloud:
            `<section class="apsj-block apsj-read-aloud">
				<main>
					<div class="apsj-ra-icon">
						<p></p>
					</div>

					<p>` +
            game.i18n.format('APSJournal.block-read-aloud.body') +
            `</p>
					<p></p>
				</main>
			</section>
			<p></p>`,
    };

    /**
     * Define HTML Elements for Dialogues
     **/

    APSJ.dialogues = {
        blueLeft:
            `<section class="apsj-block apsj-dialogue apsj-blue">
				<main>
					<div class="apsj-icon-left apsj-blue">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        blueRight:
            `<section class="apsj-block apsj-dialogue apsj-blue">
				<main>
					<div class="apsj-icon-right apsj-blue">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        cyanLeft:
            `<section class="apsj-block apsj-dialogue apsj-cyan">
				<main>
					<div class="apsj-icon-left apsj-cyan">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        cyanRight:
            `<section class="apsj-block apsj-dialogue apsj-cyan">
				<main>
					<div class="apsj-icon-right apsj-cyan">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        greenLeft:
            `<section class="apsj-block apsj-dialogue apsj-green">
				<main>
					<div class="apsj-icon-left apsj-green">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        greenRight:
            `<section class="apsj-block apsj-dialogue apsj-green">
				<main>
					<div class="apsj-icon-right apsj-green">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        orangeLeft:
            `<section class="apsj-block apsj-dialogue apsj-orange">
				<main>
					<div class="apsj-icon-left apsj-orange">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        orangeRight:
            `<section class="apsj-block apsj-dialogue apsj-orange">
				<main>
					<div class="apsj-icon-right apsj-orange">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        purpleLeft:
            `<section class="apsj-block apsj-dialogue apsj-purple">
				<main>
					<div class="apsj-icon-left apsj-purple">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        purpleRight:
            `<section class="apsj-block apsj-dialogue apsj-purple">
				<main>
					<div class="apsj-icon-right apsj-purple">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        redLeft:
            `<section class="apsj-block apsj-dialogue apsj-red">
				<main>
					<div class="apsj-icon-left apsj-red">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        redRight:
            `<section class="apsj-block apsj-dialogue apsj-red">
				<main>
					<div class="apsj-icon-right apsj-red">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        yellowLeft:
            `<section class="apsj-block apsj-dialogue apsj-yellow">
				<main>
					<div class="apsj-icon-left apsj-yellow">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
        yellowRight:
            `<section class="apsj-block apsj-dialogue apsj-yellow">
				<main>
					<div class="apsj-icon-right apsj-yellow">
						<p class="apsj-h2">` +
            game.i18n.format('APSJournal.block-dialogue.heading') +
            `</p>
						<p>` +
            game.i18n.format('APSJournal.block-dialogue.body') +
            `</p>
					</div>
				</main>
			</section>
			<p></p>`,
    };

    /**
     * Define HTML Elements for Panels
     **/

    APSJ.panels = {
        bonus:
            `<section class="apsj-panel apsj-cyan with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-bonus.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        effect:
            `<section class="apsj-panel apsj-purple with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-effect.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        information:
            `<section class="apsj-panel apsj-blue with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-information.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        loot:
            `<section class="apsj-panel apsj-green with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-loot.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        note:
            `<section class="apsj-panel apsj-yellow with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-note.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        trap:
            `<section class="apsj-panel apsj-orange with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-trap.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        warning:
            `<section class="apsj-panel apsj-red with-icon">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-warning.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel-warning.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        blue:
            `<section class="apsj-panel apsj-blue">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-blue.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        cyan:
            `<section class="apsj-panel apsj-cyan">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-cyan.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        green:
            `<section class="apsj-panel apsj-green">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-green.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        orange:
            `<section class="apsj-panel apsj-orange">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-orange.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        purple:
            `<section class="apsj-panel apsj-purple">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-purple.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        red:
            `<section class="apsj-panel apsj-red">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-red.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
        yellow:
            `<section class="apsj-panel apsj-yellow">
				<header>
					<p>` +
            game.i18n.format('APSJournal.panel-yellow.heading') +
            `</p>
				</header>
				<main>
					<p class="apsj-data">` +
            game.i18n.format('APSJournal.panel.body') +
            `</p>
				</main>
			</section>
			<p></p>`,
    };

    CONFIG.TinyMCE.plugins =
        'advlist lists anchor searchreplace template image table code save link';

    CONFIG.TinyMCE.toolbar =
        'fontfamily fontsize styles | formatgroup paragraphgroup insertgroup code save';

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
            items: 'link anchor image table | template',
        },
    };

    CONFIG.TinyMCE.style_formats.push({
        title: 'Stylish Text',
        items: [
            {
                title: game.i18n.format('APSJournal.textHeadingTitleName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'apsj-title',
            },
            {
                title: game.i18n.format('APSJournal.textHeadingName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'apsj-heading',
            },
            {
                title: game.i18n.format('APSJournal.textDataHeadingName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'apsj-data-heading',
            },
            {
                title: game.i18n.format('APSJournal.textDataName'),
                selector: 'h1,h2,h3,h4,h5,h6,th,td,p',
                classes: 'apsj-data',
            },
            {
                title: game.i18n.format('APSJournal.textParagraphName'),
                selector: 'td,p',
                classes: 'apsj-text',
            },
        ],
    });

    CONFIG.TinyMCE.templates = CONFIG.TinyMCE.templates ?? [];

    CONFIG.TinyMCE.templates.push(
        {
            title: game.i18n.format('APSJournal.block-black.name'),
            description: game.i18n.format('APSJournal.block-black.description'),
            content: APSJ.blocks.black,
        },
        {
            title: game.i18n.format('APSJournal.block-blue.name'),
            description: game.i18n.format('APSJournal.block-blue.description'),
            content: APSJ.blocks.blue,
        },
        {
            title: game.i18n.format('APSJournal.block-cyan.name'),
            description: game.i18n.format('APSJournal.block-cyan.description'),
            content: APSJ.blocks.cyan,
        },
        {
            title: game.i18n.format('APSJournal.block-green.name'),
            description: game.i18n.format('APSJournal.block-green.description'),
            content: APSJ.blocks.green,
        },
        {
            title: game.i18n.format('APSJournal.block-orange.name'),
            description: game.i18n.format(
                'APSJournal.block-orange.description'
            ),
            content: APSJ.blocks.orange,
        },
        {
            title: game.i18n.format('APSJournal.block-purple.name'),
            description: game.i18n.format(
                'APSJournal.block-purple.description'
            ),
            content: APSJ.blocks.purple,
        },
        {
            title: game.i18n.format('APSJournal.block-red.name'),
            description: game.i18n.format('APSJournal.block-red.description'),
            content: APSJ.blocks.red,
        },
        {
            title: game.i18n.format('APSJournal.block-yellow.name'),
            description: game.i18n.format(
                'APSJournal.block-yellow.description'
            ),
            content: APSJ.blocks.yellow,
        },
        {
            title: game.i18n.format('APSJournal.block-card.name'),
            description: game.i18n.format('APSJournal.block-card.description'),
            content: APSJ.blocks.card,
        },
        {
            title: game.i18n.format('APSJournal.block-scroll.name'),
            description: game.i18n.format(
                'APSJournal.block-scroll.description'
            ),
            content: APSJ.blocks.scroll,
        },
        {
            title: game.i18n.format('APSJournal.block-encounter.name'),
            description: game.i18n.format(
                'APSJournal.block-encounter.description'
            ),
            content: APSJ.blocks.encounter,
        },
        {
            title: game.i18n.format('APSJournal.block-read-aloud.name'),
            description: game.i18n.format(
                'APSJournal.block-read-aloud.description'
            ),
            content: APSJ.blocks.readAloud,
        },
        {
            title: game.i18n.format('APSJournal.block-dialogue-blue-left.name'),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.blueLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-blue-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.blueRight,
        },
        {
            title: game.i18n.format('APSJournal.block-dialogue-cyan-left.name'),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.cyanLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-cyan-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.cyanRight,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-green-left.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.greenLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-green-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.greenRight,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-orange-left.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.orangeLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-orange-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.orangeRight,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-purple-left.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.purpleLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-purple-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.purpleRight,
        },
        {
            title: game.i18n.format('APSJournal.block-dialogue-red-left.name'),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.redLeft,
        },
        {
            title: game.i18n.format('APSJournal.block-dialogue-red-right.name'),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.redRight,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-yellow-left.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.yellowLeft,
        },
        {
            title: game.i18n.format(
                'APSJournal.block-dialogue-yellow-right.name'
            ),
            description: game.i18n.format(
                'APSJournal.block-dialogue.description'
            ),
            content: APSJ.dialogues.yellowRight,
        },
        {
            title: game.i18n.format('APSJournal.panel-bonus.name'),
            description: game.i18n.format('APSJournal.panel-bonus.description'),
            content: APSJ.panels.bonus,
        },
        {
            title: game.i18n.format('APSJournal.panel-effect.name'),
            description: game.i18n.format(
                'APSJournal.panel-effect.description'
            ),
            content: APSJ.panels.effect,
        },
        {
            title: game.i18n.format('APSJournal.panel-information.name'),
            description: game.i18n.format(
                'APSJournal.panel-information.description'
            ),
            content: APSJ.panels.information,
        },
        {
            title: game.i18n.format('APSJournal.panel-loot.name'),
            description: game.i18n.format('APSJournal.panel-loot.description'),
            content: APSJ.panels.loot,
        },
        {
            title: game.i18n.format('APSJournal.panel-note.name'),
            description: game.i18n.format('APSJournal.panel-note.description'),
            content: APSJ.panels.note,
        },
        {
            title: game.i18n.format('APSJournal.panel-trap.name'),
            description: game.i18n.format('APSJournal.panel-trap.description'),
            content: APSJ.panels.trap,
        },
        {
            title: game.i18n.format('APSJournal.panel-warning.name'),
            description: game.i18n.format(
                'APSJournal.panel-warning.description'
            ),
            content: APSJ.panels.warning,
        },
        {
            title: game.i18n.format('APSJournal.panel-blue.name'),
            description: game.i18n.format('APSJournal.panel-blue.description'),
            content: APSJ.panels.blue,
        },
        {
            title: game.i18n.format('APSJournal.panel-cyan.name'),
            description: game.i18n.format('APSJournal.panel-cyan.description'),
            content: APSJ.panels.cyan,
        },
        {
            title: game.i18n.format('APSJournal.panel-green.name'),
            description: game.i18n.format('APSJournal.panel-green.description'),
            content: APSJ.panels.green,
        },
        {
            title: game.i18n.format('APSJournal.panel-orange.name'),
            description: game.i18n.format(
                'APSJournal.panel-orange.description'
            ),
            content: APSJ.panels.orange,
        },
        {
            title: game.i18n.format('APSJournal.panel-purple.name'),
            description: game.i18n.format(
                'APSJournal.panel-purple.description'
            ),
            content: APSJ.panels.purple,
        },
        {
            title: game.i18n.format('APSJournal.panel-red.name'),
            description: game.i18n.format('APSJournal.panel-red.description'),
            content: APSJ.panels.red,
        },
        {
            title: game.i18n.format('APSJournal.panel-yellow.name'),
            description: game.i18n.format(
                'APSJournal.panel-yellow.description'
            ),
            content: APSJ.panels.yellow,
        }
    );

    CONFIG.TinyMCE.content_css.push('modules/apsjournal/styles/apsjournal.css');
});

class APSJMenu extends ProseMirror.ProseMirrorMenu {
    addElement(htmlString) {
        const parser = ProseMirror.DOMParser.fromSchema(
            ProseMirror.defaultSchema
        );

        const node = ProseMirror.dom.parseString(htmlString);
        const state = this.view.state;
        const { $cursor } = state.selection;
        const tr = state.tr.insert($cursor.pos, node.content);
        const pos = $cursor.pos + node.nodeSize;

        tr.setSelection(ProseMirror.TextSelection.create(tr.doc, pos));
        this.view.dispatch(tr);
    }

    _getDropDownMenus() {
        const menus = super._getDropDownMenus();
        // menus.format.entries.push({
        //     action: 'stylishText',
        //     title: 'Stylish Text',
        //     children: [
        //         {
        //             action: 'stylishTitle',
        //             title: game.i18n.format(
        //                 'APSJournal.text-heading-title.name'
        //             ),
        //             priority: 1,
        //             style: "font-family: 'Modesto Condensed'",
        //             node: ProseMirror.defaultSchema.nodes.paragraph,
        //             cmd: () => {},
        //         },
        //         {
        //             action: 'stylishHeading',
        //             title: game.i18n.format('APSJournal.text-heading.name'),
        //             priority: 1,
        //             style: "font-family: 'ScalySansCaps'",
        //             node: ProseMirror.defaultSchema.nodes.paragraph,
        //         },
        //         {
        //             action: 'stylishDataHeading',
        //             title: game.i18n.format(
        //                 'APSJournal.text-data-heading.name'
        //             ),
        //             priority: 1,
        //             style: "font-family: 'ScaySansCaps'",
        //             node: ProseMirror.defaultSchema.nodes.paragraph,
        //         },
        //         {
        //             action: 'stylishData',
        //             title: game.i18n.format('APSJournal.text-data.name'),
        //             priority: 1,
        //             style: "font-family: 'ScalySans'",
        //             node: ProseMirror.defaultSchema.nodes.paragraph,
        //         },
        //         {
        //             action: 'stylishParagraph',
        //             title: game.i18n.format('APSJournal.text-paragraph.name'),
        //             priority: 1,
        //             style: "font-family: 'Bookinsanity'",
        //             node: ProseMirror.defaultSchema.nodes.paragraph,
        //         },
        //     ],
        // });

        menus.stylish = {
            title: game.i18n.format('APSJournal.stylish-menu.name'),
            entries: [
                {
                    action: 'blocks',
                    title: 'Blocks',
                    children: [
                        {
                            action: 'blackBlock',
                            title: game.i18n.format(
                                'APSJournal.block-black.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.black);
                            },
                        },
                        {
                            action: 'blueBlock',
                            title: game.i18n.format(
                                'APSJournal.block-blue.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.blue);
                            },
                        },
                        {
                            action: 'cyanBlock',
                            title: game.i18n.format(
                                'APSJournal.block-cyan.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.cyan);
                            },
                        },
                        {
                            action: 'greenBlock',
                            title: game.i18n.format(
                                'APSJournal.block-green.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.green);
                            },
                        },
                        {
                            action: 'orangeBlock',
                            title: game.i18n.format(
                                'APSJournal.block-orange.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.orange);
                            },
                        },
                        {
                            action: 'purpleBlock',
                            title: game.i18n.format(
                                'APSJournal.block-purple.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.purple);
                            },
                        },
                        {
                            action: 'redBlock',
                            title: game.i18n.format(
                                'APSJournal.block-red.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.red);
                            },
                        },
                        {
                            action: 'yellowBlock',
                            title: game.i18n.format(
                                'APSJournal.block-yellow.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.yellow);
                            },
                        },
                        {
                            action: 'cardBlock',
                            title: game.i18n.format(
                                'APSJournal.block-card.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.card);
                            },
                        },
                        {
                            action: 'scrollBlock',
                            title: game.i18n.format(
                                'APSJournal.block-scroll.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.scroll);
                            },
                        },
                        {
                            action: 'encounterBlock',
                            title: game.i18n.format(
                                'APSJournal.block-encounter.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.encounter);
                            },
                        },
                        {
                            action: 'readAloudBlock',
                            title: game.i18n.format(
                                'APSJournal.block-read-aloud.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.blocks.readAloud);
                            },
                        },
                    ],
                },
                {
                    action: 'dialogues',
                    title: 'Dialogues',
                    children: [
                        {
                            action: 'blueDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-blue-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.blueLeft);
                            },
                        },
                        {
                            action: 'blueDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-blue-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.blueRight);
                            },
                        },
                        {
                            action: 'cyanDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-cyan-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.cyanLeft);
                            },
                        },
                        {
                            action: 'cyanDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-cyan-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.cyanRight);
                            },
                        },
                        {
                            action: 'greenDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-green-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.greenLeft);
                            },
                        },
                        {
                            action: 'greenDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-green-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.greenRight);
                            },
                        },
                        {
                            action: 'orangeDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-orange-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.orangeLeft);
                            },
                        },
                        {
                            action: 'orangeDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-orange-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.orangeRight);
                            },
                        },
                        {
                            action: 'purpleDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-purple-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.purpleLeft);
                            },
                        },
                        {
                            action: 'purpleDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-purple-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.purpleRight);
                            },
                        },
                        {
                            action: 'redDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-red-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.redLeft);
                            },
                        },
                        {
                            action: 'redDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-red-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.redRight);
                            },
                        },
                        {
                            action: 'yellowDialogueLeft',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-yellow-left.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.yellowLeft);
                            },
                        },
                        {
                            action: 'yellowDialogueRight',
                            title: game.i18n.format(
                                'APSJournal.block-dialogue-yellow-right.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.dialogues.yellowRight);
                            },
                        },
                    ],
                },
                {
                    action: 'panels',
                    title: 'Panels',
                    children: [
                        {
                            action: 'bonusPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-bonus.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.bonus);
                            },
                        },
                        {
                            action: 'effectPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-effect.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.effect);
                            },
                        },
                        {
                            action: 'infoPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-information.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.information);
                            },
                        },
                        {
                            action: 'lootPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-loot.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.loot);
                            },
                        },
                        {
                            action: 'notePanel',
                            title: game.i18n.format(
                                'APSJournal.panel-note.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.note);
                            },
                        },
                        {
                            action: 'trapPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-trap.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.trap);
                            },
                        },
                        {
                            action: 'warningPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-warning.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.warning);
                            },
                        },
                        {
                            action: 'bluePanel',
                            title: game.i18n.format(
                                'APSJournal.panel-blue.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.blue);
                            },
                        },
                        {
                            action: 'cyanPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-cyan.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.cyan);
                            },
                        },
                        {
                            action: 'greenPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-green.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.green);
                            },
                        },
                        {
                            action: 'orangePanel',
                            title: game.i18n.format(
                                'APSJournal.panel-orange.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.orange);
                            },
                        },
                        {
                            action: 'purplePanel',
                            title: game.i18n.format(
                                'APSJournal.panel-purple.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.purple);
                            },
                        },
                        {
                            action: 'redPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-red.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.red);
                            },
                        },
                        {
                            action: 'yellowPanel',
                            title: game.i18n.format(
                                'APSJournal.panel-yellow.name'
                            ),
                            cmd: () => {
                                this.addElement(APSJ.panels.yellow);
                            },
                        },
                    ],
                },
            ],
        };
        return menus;
    }
}

Hooks.on('createProseMirrorEditor', (uuid, plugins, options) => {
    plugins.menu = APSJMenu.build(ProseMirror.defaultSchema);
});

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

    if (!document.getElementById('apsj-color-theme-toggle')) {
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
    }

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

    document.getElementById('apsj-color-theme-toggle').onclick = function () {
        toggleThemeSwitcher();
    };
});
