class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.mode = Phaser.Scale.RESIZE;
        this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Фон
        this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.5, 0x000000, 0.8)
            .setDepth(10);

        // Текст "Настройки"
        this.add.text(width / 2, height * 0.4, 'Настройки', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff'
        }).setOrigin(0.5)
          .setDepth(11);

        // Текст и ползунок громкости
        const volumeText = this.add.text(width * 0.25, height * 0.5, 'Громкость:', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.025}px`,
            color: '#ffffff'
        }).setOrigin(0, 0.5)
          .setDepth(11);

        const volumeBar = this.add.rectangle(width * 0.55, height * 0.5, width * 0.3, height * 0.03, 0xffffff)
            .setInteractive({ draggable: true })
            .setOrigin(0, 0.5)
            .setDepth(11)
            .on('drag', (pointer, x) => {
                volumeBar.width = Phaser.Math.Clamp(x - (width * 0.55 - width * 0.15), 0, width * 0.3);
                this.game.sound.volume = volumeBar.width / (width * 0.3);
            });
        volumeBar.width = this.game.sound.volume * (width * 0.3);

        // Кнопка "Закрыть"
        const closeButton = this.add.rectangle(width / 2, height * 0.6, width * 0.3, height * 0.06, 0x61bdff)
            .setInteractive()
            .setDepth(11)
            .on('pointerdown', () => this.scene.stop());
        this.add.text(width / 2, height * 0.6, 'Закрыть', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.025}px`,
            color: '#ffffff'
        }).setOrigin(0.5)
          .setDepth(12);

        this.scale.on('resize', this.resize, this);
    }

    resize(size) {
        if (!this.scene.isActive()) return;

        const width = size.width || this.game.config.width;
        const height = size.height || this.game.config.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Фон
        this.children.list.find(child => child.type === 'Rectangle' && child.fillColor === 0x000000)
            ?.setPosition(width / 2, height / 2)
            .setSize(width * 0.8, height * 0.5);

        // Текст "Настройки"
        this.children.list.find(child => child.type === 'Text' && child.text === 'Настройки')
            ?.setPosition(width / 2, height * 0.4)
            .setFontSize(height * 0.03);

        // Текст "Громкость"
        this.children.list.find(child => child.type === 'Text' && child.text === 'Громкость:')
            ?.setPosition(width * 0.25, height * 0.5)
            .setFontSize(height * 0.025);

        // Ползунок громкости
        const volumeBar = this.children.list.find(child => child.type === 'Rectangle' && child.fillColor === 0xffffff);
        if (volumeBar) {
            const currentVolume = this.game.sound.volume;
            volumeBar.setPosition(width * 0.55, height * 0.5)
                .setSize(width * 0.3, height * 0.03)
                .setOrigin(0, 0.5);
            volumeBar.width = currentVolume * (width * 0.3);
        }

        // Кнопка "Закрыть"
        this.children.list.find(child => child.type === 'Rectangle' && child.fillColor === 0x61bdff)
            ?.setPosition(width / 2, height * 0.6)
            .setSize(width * 0.3, height * 0.06);

        this.children.list.find(child => child.type === 'Text' && child.text === 'Закрыть')
            ?.setPosition(width / 2, height * 0.6)
            .setFontSize(height * 0.025);
    }
}