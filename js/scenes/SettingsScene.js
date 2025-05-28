class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
        this.elements = {};
        this.previousVolume = 1; // По умолчанию громкость 1 для включенного состояния
    }

    preload() {
        this.load.image('volume_icon', 'assets/common/images/volume_icon.png');
        this.load.image('volume_icon_off', 'assets/common/images/volume_icon_off.png'); // Новая иконка для выключенного звука
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('close', 'assets/common/images/close.png');
        this.load.audio('click', 'assets/common/audio/click.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Полупрозрачный черный фон с блокировкой
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(30)
            .setInteractive();

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
        const toggleX = width * 0.55;
        const toggleWidth = width * 0.15; // Тумблер короче ползунка
        const toggleHeight = height * 0.02; // Высота тумблера

        // Текст и иконка громкости
        this.elements.volumeText = this.add.text(textX, centerY, 'Громкость', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.022}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(1, 0.5).setDepth(33);

        // Выбираем иконку в зависимости от состояния звука
        const isSoundOn = this.game.sound.volume > 0;
        this.elements.volumeIcon = this.add.image(textX + height * 0.025, centerY, isSoundOn ? 'volume_icon' : 'volume_icon_off')
            .setDisplaySize(height * 0.025, height * 0.025)
            .setOrigin(0, 0.5)
            .setDepth(33);

        // Фон тумблера (капсула через Graphics)
        this.elements.toggleBg = this.add.graphics()
            .fillStyle(0x666666, 1)
            .fillRoundedRect(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight, toggleHeight / 2)
            .setDepth(32)
            .setInteractive(new Phaser.Geom.Rectangle(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight), Phaser.Geom.Rectangle.Contains);

        // Кружок тумблера
        this.elements.toggleHandle = this.add.circle(
            toggleX + (isSoundOn ? toggleWidth : 0),
            centerY,
            toggleHeight * 0.6, // Радиус кружка
            0xffffff
        ).setDepth(33);

        // Сохраняем громкость перед выключением
        this.previousVolume = isSoundOn ? this.game.sound.volume : 1;

        // Интерактивность тумблера
        this.elements.toggleBg.on('pointerdown', () => {
            const isOn = this.game.sound.volume > 0;
            if (isOn) {
                this.previousVolume = this.game.sound.volume; // Сохраняем текущую громкость
                this.game.sound.volume = 0;
                this.elements.toggleHandle.setPosition(toggleX, centerY); // Кружок слева
                this.elements.volumeIcon.setTexture('volume_icon_off'); // Меняем иконку
            } else {
                this.game.sound.volume = this.previousVolume; // Восстанавливаем громкость
                this.elements.toggleHandle.setPosition(toggleX + toggleWidth, centerY); // Кружок справа
                this.elements.volumeIcon.setTexture('volume_icon'); // Меняем иконку
            }
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

    resize(gameSize) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;
        const centerY = height * 0.45;
        const textX = width * 0.35;
        const toggleX = width * 0.55;
        const toggleWidth = width * 0.15;
        const toggleHeight = height * 0.02;

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
                                .setDisplaySize(height * 0.025, height * 0.025)
                                .setTexture(this.game.sound.volume > 0 ? 'volume_icon' : 'volume_icon_off');

        // Тумблер
        if (this.elements.toggleBg && this.elements.toggleHandle) {
            const isOn = this.game.sound.volume > 0;
            
            // Обновляем фон тумблера
            this.elements.toggleBg.clear()
                .fillStyle(0x666666, 1)
                .fillRoundedRect(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight, toggleHeight / 2)
                .setInteractive(new Phaser.Geom.Rectangle(toggleX, centerY - toggleHeight / 2, toggleWidth, toggleHeight), Phaser.Geom.Rectangle.Contains);
            
            this.elements.toggleHandle.setPosition(toggleX + (isOn ? toggleWidth : 0), centerY)
                                     .setRadius(toggleHeight * temp_1);
        }

        // Кнопка закрытия
        this.elements.closeButton?.setPosition(width * 0.83, height * 0.279)
                                 .setDisplaySize(height * 0.02, height * 0.02);
    }
}