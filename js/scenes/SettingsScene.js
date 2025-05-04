class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.mode = Phaser.Scale.RESIZE;
        this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Фон
        this.bg = this.add.rectangle(width / 2, height / 2, width * 0.8, height * 0.5, 0x000000, 0.8).setDepth(10);

        // Заголовок
        this.titleText = this.add.text(width / 2, height * 0.4, 'Настройки', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(11);

        // Метка громкости
        this.volumeText = this.add.text(width * 0.25, height * 0.5, 'Громкость:', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.025}px`,
            color: '#ffffff'
        }).setOrigin(0, 0.5).setDepth(11);

        // Ползунок громкости
        const barWidth = width * 0.3;
        this.volumeBar = this.add.rectangle(width * 0.55, height * 0.5, this.game.sound.volume * barWidth, height * 0.03, 0xffffff)
            .setInteractive({ draggable: true })
            .setOrigin(0, 0.5)
            .setDepth(11);

        this.input.setDraggable(this.volumeBar);
        this.input.on('drag', (pointer, gameObject, dragX) => {
            if (gameObject === this.volumeBar) {
                const newWidth = Phaser.Math.Clamp(dragX - (width * 0.55 - barWidth * 0.5), 0, barWidth);
                gameObject.width = newWidth;
                this.game.sound.volume = newWidth / barWidth;
            }
        });

        // Кнопка "Закрыть"
        this.closeButton = this.add.rectangle(width / 2, height * 0.6, width * 0.3, height * 0.06, 0x61bdff)
            .setInteractive()
            .setDepth(11)
            .on('pointerdown', () => this.scene.stop());

        this.closeText = this.add.text(width / 2, height * 0.6, 'Закрыть', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.025}px`,
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(12);

        this.scale.on('resize', this.resize, this);
    }

    resize(size) {
        const width = size.width || this.scale.width;
        const height = size.height || this.scale.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        this.bg.setPosition(width / 2, height / 2).setSize(width * 0.8, height * 0.5);

        this.titleText.setPosition(width / 2, height * 0.4).setFontSize(height * 0.03);
        this.volumeText.setPosition(width * 0.25, height * 0.5).setFontSize(height * 0.025);

        const barWidth = width * 0.3;
        this.volumeBar.setPosition(width * 0.55, height * 0.5)
            .setSize(this.game.sound.volume * barWidth, height * 0.03)
            .setOrigin(0, 0.5);

        this.closeButton.setPosition(width / 2, height * 0.6).setSize(width * 0.3, height * 0.06);
        this.closeText.setPosition(width / 2, height * 0.6).setFontSize(height * 0.025);
    }
}
