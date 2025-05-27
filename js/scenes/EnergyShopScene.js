class EnergyShopScene extends Phaser.Scene {
    constructor() {
        super('EnergyShopScene');
        this.sliderArea = { minX: 0, maxX: 0 };
        this.elements = {};
    }

    preload() {
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('energyIcon', 'assets/common/images/energyIcon.png');
        this.load.image('manyicons', 'assets/common/images/manyicons.png');
        this.load.image('aloticons', 'assets/common/images/aloticons.png');
        this.load.image('fullofIcon', 'assets/common/images/fullofIcon.png');
        this.load.image('tgstars', 'assets/common/images/tgstars.png');
        this.load.image('Button', 'assets/common/images/Button.png');
        this.load.audio('click', 'assets/common/audio/click.wav');
        this.load.image('close', 'assets/common/images/close.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Полупрозрачный черный фон (без интерактива)
       this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
    .setOrigin(0, 0)
    .setDepth(30)
    .setInteractive()  // Делаем фон кликабельным
    .on('pointerdown', (e) => {
        e.stopPropagation(); // Останавливаем всплытие события
    });
        // Фон окна
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg = this.add.image(popupX, popupY, 'settings_box')
            .setDisplaySize(popupWidth, popupHeight)
            .setDepth(31);

        // Текст "Магазин" вверху по центру
        this.elements.shopTitle = this.add.text(popupX, popupY - popupHeight / 2 + height * 0.028, 'Магазин', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff',
            resolution: 4
        }).setOrigin(0.5).setDepth(33);

        // Создаем блоки покупки энергии
        this.createEnergyBlocks(width, height);

        // Кнопка закрытия
        this.createCloseButton(width, height);

        // Обработчик изменения размера
        this.scale.on('resize', (gameSize) => {
            this.time.delayedCall(100, () => this.resize(gameSize));
        });
    }

    createEnergyBlocks(width, height) {
        const blockData = [
            { icon: 'energyIcon', energy: 90, stars: 10 },
            { icon: 'manyicons', energy: 250, stars: 25 },
            { icon: 'aloticons', energy: 700, stars: 60 },
            { icon: 'fullofIcon', energy: 1500, stars: 120 }
        ];

        const blockWidth = width * 0.35;
        const blockHeight = blockWidth * (3 / 2.3);
        const spacingX = width * 0.02;
        const spacingY = height * 0.01;
        const startX = width * 0.14;
        const startY = height * 0.31;

        blockData.forEach((data, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const blockX = startX + col * (blockWidth + spacingX);
            const blockY = startY + row * (blockHeight + spacingY);

            // Подложка блока
            const blockBg = this.add.rectangle(blockX + blockWidth / 2, blockY + blockHeight / 2, blockWidth, blockHeight, 0x0b0e13, 0.3)
                .setDepth(32);
            blockBg.setStrokeStyle(1, 0xe3e8ea, 0.5);

            // Большая иконка
            const largeIcon = this.add.image(blockX + blockWidth / 2, blockY + blockHeight * 0.27, data.icon)
                .setDisplaySize(blockWidth * 0.6, blockWidth * 0.6)
                .setDepth(33);

            // Маленькая иконка и текст энергии
            const smallIcon = this.add.image(blockX + blockWidth * 0.31, blockY + blockHeight * 0.63, 'energyIcon')
                .setDisplaySize(blockWidth * 0.19, blockWidth * 0.19)
                .setDepth(33);

            const energyText = this.add.text(blockX + blockWidth * 0.59, blockY + blockHeight * 0.63, `${data.energy}`, {
                fontFamily: "Dela Gothic One",
                fontSize: `${blockHeight * 0.13}px`,
                color: '#ffffff',
                resolution: 4
            }).setOrigin(0.5).setDepth(33);

            // Кнопка покупки
            const button = this.add.image(blockX + blockWidth / 2, blockY + blockHeight * 0.85, 'Button')
                .setDisplaySize(blockWidth * 0.9, blockHeight * 0.2)
                .setDepth(33)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.handlePurchase(data.energy, data.stars))
                .on('pointerover', () => button.setAlpha(0.8))
                .on('pointerout', () => button.setAlpha(1));

            // Иконка звезд и цена
            const starIcon = this.add.image(blockX + blockWidth * 0.33, blockY + blockHeight * 0.85, 'tgstars')
                .setDisplaySize(blockHeight * 0.15, blockHeight * 0.15)
                .setDepth(34);

            const priceText = this.add.text(blockX + blockWidth * 0.55, blockY + blockHeight * 0.85, `${data.stars}`, {
                fontFamily: 'Dela Gothic One',
                fontSize: `${blockHeight * 0.12}px`,
                color: '#ffffff',
                resolution: 4
            }).setOrigin(0.5).setDepth(34);

            this.elements[`block${index}`] = { blockBg, largeIcon, smallIcon, energyText, button, starIcon, priceText };
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

    handlePurchase(energy, starsCost) {
        this.sound.play('click');
        window.gameStorage.loadProgress('story1', this.registry, (progress) => {
            progress.energy += energy;
            window.gameStorage.saveProgress(
                'story1',
                progress.sceneId,
                progress.dialogueIndex,
                progress.energy,
                progress.stars,
                this.registry
            );
            // Обновляем отображение энергии в MainMenu
            const mainMenuScene = this.scene.get('MainMenu');
            if (mainMenuScene && mainMenuScene.energyText) {
                mainMenuScene.energyText.setText(`${progress.energy}`);
            }
            console.log(`Добавлено ${energy} энергии. Новый баланс: ${progress.energy} энергии, ${progress.stars} звезд`);
        });
    }

    showNotEnoughStars(width, height) {
        if (this.elements.notification) {
            this.elements.notification.destroy();
            this.elements.notificationText.destroy();
        }

        this.elements.notification = this.add.rectangle(width / 2, height / 2, width * 0.5, height * 0.1, 0xff0000, 0.8)
            .setDepth(35);
        this.elements.notificationText = this.add.text(width / 2, height / 2, 'Недостаточно звезд!', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.02}px`,
            color: '#ffffff',
            resolution: 4
        }).setOrigin(0.5).setDepth(36);

        this.time.delayedCall(2000, () => {
            if (this.elements.notification) {
                this.elements.notification.destroy();
                this.elements.notificationText.destroy();
                delete this.elements.notification;
                delete this.elements.notificationText;
            }
        });
    }

    resize(gameSize) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;

        // Обновляем фон
        this.elements.bgOverlay?.setDisplaySize(width, height);

        // Обновляем фон окна
        const popupWidth = width * 0.8;
        const popupHeight = height * 0.5;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg?.setPosition(popupX, popupY)
                             .setDisplaySize(popupWidth, popupHeight);

        // Обновляем текст "Магазин"
        this.elements.shopTitle?.setPosition(popupX, popupY - popupHeight / 2 + height * 0.028)
                                .setFontSize(height * 0.03);

        // Обновляем блоки
        const blockWidth = width * 0.35;
        const blockHeight = blockWidth * (3 / 2.4);
        const spacingX = width * 0.02;
        const spacingY = height * 0.01;
        const startX = width * 0.14;
        const startY = height * 0.3;

        for (let index = 0; index < 4; index++) {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const blockX = startX + col * (blockWidth + spacingX);
            const blockY = startY + row * (blockHeight + spacingY);

            const block = this.elements[`block${index}`];
            if (block) {
                block.blockBg?.setPosition(blockX + blockWidth / 2, blockY + blockHeight / 2)
                             .setSize(blockWidth, blockHeight);
                block.largeIcon?.setPosition(blockX + blockWidth / 2, blockY + blockHeight * 0.27)
                                .setDisplaySize(blockWidth * 0.6, blockWidth * 0.6);
                block.smallIcon?.setPosition(blockX + blockWidth * 0.31, blockY + blockHeight * 0.63)
                                .setDisplaySize(blockWidth * 0.19, blockWidth * 0.19);
                block.energyText?.setPosition(blockX + blockWidth * 0.59, blockY + blockHeight * 0.63)
                                 .setFontSize(blockHeight * 0.13);
                block.button?.setPosition(blockX + blockWidth / 2, blockY + blockHeight * 0.85)
                             .setDisplaySize(blockWidth * 0.9, blockHeight * 0.2);
                block.starIcon?.setPosition(blockX + blockWidth * 0.33, blockY + blockHeight * 0.85)
                               .setDisplaySize(blockHeight * 0.15, blockHeight * 0.15);
                block.priceText?.setPosition(blockX + blockWidth * 0.55, blockY + blockHeight * 0.85)
                                .setFontSize(blockHeight * 0.12);
            }
        }

        // Обновляем кнопку закрытия
        this.elements.closeButton?.setPosition(width * 0.83, height * 0.279)
                                 .setDisplaySize(height * 0.02, height * 0.02);
    }
}