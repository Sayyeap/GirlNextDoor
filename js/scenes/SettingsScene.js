class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
        this.elements = {};
        this.previousVolume = 1; // Default volume
        this.currentLanguage = 'ru'; // Default language: Russian
        // Language configuration
        this.texts = {
            ru: {
                title: 'НАСТРОЙКИ',
                volume: 'Громкость',
                language: 'Русский'
            },
            en: {
                title: 'SETTINGS',
                volume: 'Volume',
                language: 'English'
            }
        };
    }

    preload() {
        this.load.image('volume_icon', 'assets/common/images/volume_icon.png');
        this.load.image('volume_icon_off', 'assets/common/images/volume_icon_off.png');
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('close', 'assets/common/images/close.png');
        this.load.audio('click', 'assets/common/audio/click.wav');
        this.load.image('rus_icon', 'assets/common/images/rus_icon.png');
        this.load.image('en_icon', 'assets/common/images/en_icon.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Semi-transparent background
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0, 0)
            .setDepth(30)
            .setInteractive();

        // Popup background
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg = this.add.image(popupX, popupY, 'settings_box')
            .setDisplaySize(popupWidth, popupHeight)
            .setDepth(31);

        // Title
        this.elements.titleText = this.add.text(popupX, popupY - popupHeight / 2 + height * 0.028, 
            this.texts[this.currentLanguage].title, {
                fontFamily: 'Dela Gothic One',
                fontSize: `${height * 0.03}px`,
                color: '#ffffff',
                resolution: 1
            }).setOrigin(0.5).setDepth(33);

        // Create controls
        this.createVolumeControl(width, height);
        this.createLanguageControl(width, height);
        this.createCloseButton(width, height);

        this.scale.on('resize', (gameSize) => {
            this.time.delayedCall(100, () => this.resize(gameSize));
        });
    }

    createVolumeControl(width, height) {
        const centerY = height * 0.45;
        const textX = width * 0.45;
        const toggleX = width * 0.65;
        const toggleWidth = width * 0.15;
        const toggleHeight = height * 0.02;

        // Volume text and icon
        this.elements.volumeText = this.add.text(textX, centerY, 
            this.texts[this.currentLanguage].volume, {
                fontFamily: 'IBM Plex Sans',
                fontSize: `${height * 0.022}px`,
                color: '#ffffff',
                resolution: 1
            }).setOrigin(1, 0.5).setDepth(33);

        const isSoundOn = this.game.sound.volume > 0;
        this.elements.volumeIcon = this.add.image(textX + height * 0.025, centerY, 
            isSoundOn ? 'volume_icon' : 'volume_icon_off')
            .setDisplaySize(height * 0.045, height * 0.045)
            .setOrigin(0, 0.5)
            .setDepth(33);

        // Toggle background
        this.elements.toggleBg = this.add.graphics()
            .fillStyle(0x666666, 1)
            .fillRoundedRect(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight, toggleHeight / 2)
            .setDepth(32)
            .setInteractive(new Phaser.Geom.Rectangle(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight), 
                Phaser.Geom.Rectangle.Contains);

        // Toggle handle
        this.elements.toggleHandle = this.add.circle(
            toggleX + (isSoundOn ? toggleWidth : 0),
            centerY,
            toggleHeight * 0.6,
            0xffffff
        ).setDepth(33);

        this.previousVolume = isSoundOn ? this.game.sound.volume : 1;

        // Toggle interaction
        this.elements.toggleBg.on('pointerdown', () => {
            const isOn = this.game.sound.volume > 0;
            if (isOn) {
                this.previousVolume = this.game.sound.volume;
                this.game.sound.volume = 0;
                this.elements.toggleHandle.setPosition(toggleX, centerY);
                this.elements.volumeIcon.setTexture('volume_icon_off');
            } else {
                this.game.sound.volume = this.previousVolume;
                this.elements.toggleHandle.setPosition(toggleX + toggleWidth, centerY);
                this.elements.volumeIcon.setTexture('volume_icon');
            }
            this.sound.play('click');
        });
    }

    createLanguageControl(width, height) {
        const centerY = height * 0.55; // Below volume control
        const textX = width * 0.45;
        const iconX = width * 0.65;

        // Language text
        this.elements.languageText = this.add.text(textX, centerY, 
            this.texts[this.currentLanguage].language, {
                fontFamily: 'IBM Plex Sans',
                fontSize: `${height * 0.022}px`,
                color: '#ffffff',
                resolution: 1
            }).setOrigin(1, 0.5).setDepth(33);

        // Language icon
        this.elements.languageIcon = this.add.image(iconX, centerY, 
            this.currentLanguage === 'ru' ? 'rus_icon' : 'en_icon')
            .setDisplaySize(height * 0.045, height * 0.045)
            .setOrigin(0, 0.5)
            .setDepth(33)
            .setInteractive({ useHandCursor: true });

        // Language toggle interaction
        this.elements.languageIcon.on('pointerdown', () => {
            this.currentLanguage = this.currentLanguage === 'ru' ? 'en' : 'ru';
            this.game.registry.set('language', this.currentLanguage); // Store globally
            this.updateUIText();
            this.elements.languageIcon.setTexture(this.currentLanguage === 'ru' ? 'rus_icon' : 'en_icon');
            this.sound.play('click');
        });
    }

    createCloseButton(width, height) {
        this.elements.closeButton = this.add.image(width * 0.83, height * 0.279, 'close')
            .setDisplaySize(height * 0.02, height * 0.02)
            .setDepth(33)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('click');
                this.scene.stop();
            });
    }

    updateUIText() {
        // Update all text elements in the scene
        this.elements.titleText.setText(this.texts[this.currentLanguage].title);
        this.elements.volumeText.setText(this.texts[this.currentLanguage].volume);
        this.elements.languageText.setText(this.texts[this.currentLanguage].language);
    }

    resize(gameSize) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;
        const centerYVolume = height * 0.45;
        const centerYLanguage = height * 0.55;
        const textX = width * 0.45;
        const toggleX = width * 0.65;
        const toggleWidth = width * 0.15;
        const toggleHeight = height * 0.02;
        const iconX = width * 0.65;

        // Background
        this.elements.bgOverlay?.setDisplaySize(width, height);

        // Popup
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg?.setPosition(popupX, popupY)
                             .setDisplaySize(popupWidth, popupHeight);

        // Title
        this.elements.titleText?.setPosition(popupX, popupY - popupHeight / 2 + height * 0.028)
                               .setFontSize(height * 0.03);

        // Volume
        this.elements.volumeText?.setPosition(textX, centerYVolume)
                                .setFontSize(height * 0.022);
        
        this.elements.volumeIcon?.setPosition(textX + height * 0.025, centerYVolume)
                                .setDisplaySize(height * 0.045, height * 0.045)
                                .setTexture(this.game.sound.volume > 0 ? 'volume_icon' : 'volume_icon_off');

        // Toggle
        if (this.elements.toggleBg && this.elements.toggleHandle) {
            const isOn = this.game.sound.volume > 0;
            this.elements.toggleBg.clear()
                .fillStyle(0x666666, 1)
                .fillRoundedRect(toggleX, centerYVolume - toggleHeight / 2, toggleWidth, toggleHeight, toggleHeight / 2)
                .setInteractive(new Phaser.Geom.Rectangle(toggleX, centerYVolume - toggleHeight / 2, toggleWidth, toggleHeight), 
                    Phaser.Geom.Rectangle.Contains);
            
            this.elements.toggleHandle.setPosition(toggleX + (isOn ? toggleWidth : 0), centerYVolume)
                                     .setRadius(toggleHeight * 0.6);
        }

        // Language
        this.elements.languageText?.setPosition(textX, centerYLanguage)
                                 .setFontSize(height * 0.022);
        
        this.elements.languageIcon?.setPosition(iconX, centerYLanguage)
                                 .setDisplaySize(height * 0.045, height * 0.045);

        // Close button
        this.elements.closeButton?.setPosition(width * 0.83, height * 0.279)
                                 .setDisplaySize(height * 0.02, height * 0.02);
    }
}