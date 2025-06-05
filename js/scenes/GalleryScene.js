class GalleryScene extends Phaser.Scene {
    constructor() {
        super('GalleryScene');
        this.elements = {};
    }

    preload() {
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('close', 'assets/common/images/close.png');
        this.load.audio('click', 'assets/common/audio/click.wav');
    }

    create(data) {
        const width = this.scale.width;
        const height = this.scale.height;
        const storyId = data.storyId;

        // Полупрозрачный фон
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0, 0)
            .setDepth(30)
            .setInteractive();

        // Подложка окна
        const popupWidth = width * 0.9;
        const popupHeight = height * 0.8;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg = this.add.image(popupX, popupY, 'settings_box')
            .setDisplaySize(popupWidth, popupHeight)
            .setDepth(31);

        // Заголовок
        this.elements.titleText = this.add.text(popupX, popupY - popupHeight / 2 + height * 0.03, 'ГАЛЕРЕЯ', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(0.5).setDepth(33);

        // Кнопка закрытия
        this.createCloseButton(width, height);

        // Создание сетки артов
        this.createGalleryGrid(width, height, storyId);

        // Обработчик изменения размера
        this.scale.on('resize', (gameSize) => {
            this.time.delayedCall(100, () => this.resize(gameSize, storyId));
        });
    }

    createGalleryGrid(width, height, storyId) {
        // Загружаем прогресс открытых артов
        window.gameStorage.loadProgress(storyId, this.registry, (progress) => {
            const unlockedArts = progress.unlockedArts || []; // Массив ID открытых артов
            const totalArts = 30; // Предполагаем 30 артов
            const columns = 10; // 10 артов в ряду
            const rows = 3; // 3 ряда
            const artWidth = width * 0.08;
            const artHeight = height * 0.15;
            const spacingX = width * 0.09;
            const spacingY = height * 0.18;
            const startX = width / 2 - (columns - 1) * spacingX / 2;
            const startY = height * 0.35;

            this.elements.artImages = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < columns; col++) {
                    const artIndex = row * columns + col + 1;
                    if (artIndex > totalArts) break;

                    const x = startX + col * spacingX;
                    const y = startY + row * spacingY;

                    // Определяем текстуру: заглушка или открытый арт
                    const texture = unlockedArts.includes(artIndex) ? `art${artIndex}` : 'placeholder';
                    const artImage = this.add.image(x, y, texture)
                        .setDisplaySize(artWidth, artHeight)
                        .setDepth(32)
                        .setInteractive({ useHandCursor: true })
                        .on('pointerdown', () => {
                            this.sound.play('click');
                            if (unlockedArts.includes(artIndex)) {
                                console.log(`Art ${artIndex} clicked`);
                                // Можно добавить увеличение арта при клике
                            }
                        });

                    this.elements.artImages.push(artImage);
                }
            }
        });
    }

    createCloseButton(width, height) {
        this.elements.closeButton = this.add.image(width * 0.85, height * 0.25, 'close')
            .setDisplaySize(height * 0.02, height * 0.02)
            .setDepth(33)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('click');
                this.scene.stop();
            });
    }

    resize(gameSize, storyId) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;

        // Фон
        this.elements.bgOverlay?.setDisplaySize(width, height);

        // Подложка
        const popupWidth = width * 0.9;
        const popupHeight = height * 0.8;
        const popupX = width / 2;
        const popupY = height / 2;

        this.elements.popupBg?.setPosition(popupX, popupY)
                             .setDisplaySize(popupWidth, popupHeight);

        // Заголовок
        this.elements.titleText?.setPosition(popupX, popupY - popupHeight / 2 + height * 0.03)
                               .setFontSize(height * 0.03);

        // Кнопка закрытия
        this.elements.closeButton?.setPosition(width * 0.85, height * 0.25)
                                 .setDisplaySize(height * 0.02, height * 0.02);

        // Перестраиваем сетку
        this.elements.artImages?.forEach((image) => image.destroy());
        this.createGalleryGrid(width, height, storyId);
    }
}