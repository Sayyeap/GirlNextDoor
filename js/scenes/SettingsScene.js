class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
        this.sliderArea = { minX: 0, maxX: 0 };
        this.elements = {};
    }

    preload() {
        this.load.image('volume_icon', 'assets/common/images/volume_icon.png');
        this.load.image('settings_box', 'assets/common/images/settings_box.png'); // Добавляем подложку
        this.load.image('close', 'assets/common/images/close.png'); // Добавляем иконку закрытия
        this.load.audio('click', 'assets/common/audio/click.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Полупрозрачный черный фон с блокировкой
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(30)
            .setInteractive()
            .on('pointerdown', (e) => {
                e.stopPropagation(); // Блокируем события под окном
            });

        // Подложка окна
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg = this.add.image(popupX, popupY, 'settings_box')
            .setDisplaySize(popupWidth, popupHeight)
            .setDepth(31);

        // Заголовок "Настройки"
        this.elements.titleText = this.add.text(popupX, popupY - popupHeight / 2 + height * 0.028, 'НАСТРОЙКИ', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(0.5).setDepth(33);

        // Создаем элементы управления
        this.createVolumeControl(width, height);
        this.createCloseButton(width, height);

        this.scale.on('resize', (gameSize) => {
            this.time.delayedCall(100, () => this.resize(gameSize));
        });
    }

    createVolumeControl(width, height) {
        const centerY = height * 0.45;
        const textX = width * 0.35;
        const sliderX = width * 0.55;
        const sliderWidth = width * 0.35;

        this.sliderArea = { minX: sliderX, maxX: sliderX + sliderWidth };

        // Текст и иконка громкости
        this.elements.volumeText = this.add.text(textX, centerY, 'Громкость', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.022}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(1, 0.5).setDepth(33);

        this.elements.volumeIcon = this.add.image(textX + height * 0.025, centerY, 'volume_icon')
            .setDisplaySize(height * 0.025, height * 0.025)
            .setOrigin(0, 0.5)
            .setDepth(33);

        // Ползунок громкости
        this.elements.sliderBg = this.add.rectangle(sliderX, centerY, sliderWidth, height * 0.012, 0x666666)
            .setOrigin(0, 0.5)
            .setDepth(32);

        this.elements.sliderFill = this.add.rectangle(
            sliderX, centerY, 
            sliderWidth * this.game.sound.volume, 
            height * 0.012, 
            0xffffff
        ).setOrigin(0, 0.5).setDepth(32);

        this.elements.sliderHandle = this.add.circle(
            sliderX + (sliderWidth * this.game.sound.volume), 
            centerY, 
            height * 0.012,
            0xffffff
        ).setInteractive({ draggable: true })
         .setDepth(33)
         .on('drag', (pointer, x) => {
             x = Phaser.Math.Clamp(x, this.sliderArea.minX, this.sliderArea.maxX);
             this.elements.sliderHandle.x = x;
             this.elements.sliderFill.width = x - this.sliderArea.minX;
             this.game.sound.volume = (x - this.sliderArea.minX) / sliderWidth;
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

    resize(gameSize) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;
        const centerY = height * 0.45;
        const textX = width * 0.35;
        const sliderX = width * 0.55;
        const sliderWidth = width * 0.35;

        // Обновляем границы
        this.sliderArea = { minX: sliderX, maxX: sliderX + sliderWidth };

        // Фон
        this.elements.bgOverlay?.setDisplaySize(width, height);

        // Подложка окна
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg?.setPosition(popupX, popupY)
                             .setDisplaySize(popupWidth, popupHeight);

        // Заголовок
        this.elements.titleText?.setPosition(popupX, popupY - popupHeight / 2 + height * 0.028)
                               .setFontSize(height * 0.03);

        // Громкость
        this.elements.volumeText?.setPosition(textX, centerY)
                                .setFontSize(height * 0.022);
        
        this.elements.volumeIcon?.setPosition(textX + height * 0.025, centerY)
                                .setDisplaySize(height * 0.025, height * 0.025);

        // Ползунок
        if (this.elements.sliderBg && this.elements.sliderFill && this.elements.sliderHandle) {
            const vol = this.game.sound.volume;
            
            this.elements.sliderBg.setPosition(sliderX, centerY)
                                 .setSize(sliderWidth, height * 0.012);
            
            this.elements.sliderFill.setPosition(sliderX, centerY)
                                   .setSize(sliderWidth * vol, height * 0.012);
            
            this.elements.sliderHandle.setPosition(sliderX + (sliderWidth * vol), centerY)
                                     .setRadius(height * 0.012);
        }

        // Кнопка закрытия
        this.elements.closeButton?.setPosition(width * 0.83, height * 0.279)
                                 .setDisplaySize(height * 0.02, height * 0.02);
    }
}