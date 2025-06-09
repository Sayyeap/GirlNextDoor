class GalleryScene extends Phaser.Scene {
    constructor() {
        super('GalleryScene');
        this.elements = {};
        this.scrollContainer = null;
        this.scrollY = 0;
        this.minScrollY = 0;
        this.maxScrollY = 0;
    }

    preload() {
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('close', 'assets/common/images/close.png');
        this.load.image('lockphoto', 'assets/story1/images/backgrounds/lockphoto.jpg');
        this.load.audio('click', 'assets/common/audio/click.wav');
        this.load.image('gallerybg', 'assets/common/images/gallerybg.png');
        for (let i = 1; i <= 30; i++) {
            this.load.image(`art${i}`, `assets/common/images/arts/art${i}.png`);
        }
    }

    create(data) {
        const width = this.scale.width;
        const height = this.scale.height;
        const storyId = data.storyId;

        console.log('GalleryScene: width=', width, 'height=', height, 'storyId=', storyId); // Отладка

        // Проверка, что height определён
        if (!height || isNaN(height)) {
            console.error('GalleryScene: height is undefined or NaN');
            return;
        }


        // Добавляем фоновое изображение gallerybg
    this.add.image(0, 0, 'gallerybg')
        .setOrigin(0, 0)
        .setDisplaySize(width, height * 0.2) // 20% высоты экрана
        .setDepth(35);


        // Полупрозрачный фон
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8)
            .setOrigin(0, 0)
            .setDepth(30)
            .setInteractive();

        // Подложка окна
        const popupWidth = width * 0.9;
        const popupHeight = height * 0.8;
        const popupX = width / 2;
        const popupY = height / 2;

        

        // Заголовок
        this.elements.titleText = this.add.text(popupX, popupY - popupHeight / 2 + height * 0.03, 'ГАЛЕРЕЯ', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(0.5).setDepth(36);

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
        // Очищаем предыдущую сетку
        if (this.scrollContainer) {
            this.scrollContainer.destroy();
        }
        this.elements.artImages = [];
        this.elements.artTitles = [];

        // Проверяем, определён ли window.gameStorage.loadProgress
        if (!window.gameStorage || typeof window.gameStorage.loadProgress !== 'function') {
            console.error('GalleryScene: window.gameStorage.loadProgress is not defined');
            this.createGridWithMockData(width, height, []);
            return;
        }

        window.gameStorage.loadProgress(storyId, this.registry, (progress) => {
            const unlockedArts = progress.unlockedArts || [];
            this.createGridWithMockData(width, height, unlockedArts);
        });
    }

    createGridWithMockData(width, height, unlockedArts) {
        const totalArts = 30;
        const columns = 3;
        const rows = Math.ceil(totalArts / columns);
        const artWidth = width * 0.25;
        const artHeight = height * 0.25;
        const spacingX = width * 0.3;
        const spacingY = height * 0.31;
        const startY = height * 0.31; // Начальная позиция сетки

        console.log('createGridWithMockData: startY=', startY); // Отладка

        // Названия артов
        const artTitles = Array.from({ length: totalArts }, (_, i) => `Art ${i + 1}`);

        // Создаём контейнер для прокрутки
        this.scrollContainer = this.add.container(0, 0).setDepth(32);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const artIndex = row * columns + col + 1;
                if (artIndex > totalArts) break;

                const x = width / 2 - spacingX + col * spacingX;
                const y = startY + row * spacingY;

                // Текстура: заглушка или арт
                const texture = unlockedArts.includes(artIndex) ? `art${artIndex}` : 'lockphoto';
                const artImage = this.add.image(x, y, texture)
                    .setDisplaySize(artWidth, artHeight)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        if (unlockedArts.includes(artIndex)) {
                            this.sound.play('click');
                            this.showEnlargedArt(artIndex, artTitles[artIndex - 1], width, height);
                        }
                    });

                // Название арта
                const titleText = this.add.text(x, y + artHeight / 2 + height * 0.03,
                    unlockedArts.includes(artIndex) ? artTitles[artIndex - 1] : '???', {
                    fontFamily: 'IBM Plex Sans',
                    fontSize: `${height * 0.018}px`,
                    color: '#ffffff',
                    resolution: 1
                }).setOrigin(0.5).setDepth(32);

                this.elements.artImages.push(artImage);
                this.elements.artTitles.push(titleText);
                this.scrollContainer.add([artImage, titleText]);
            }
        }

        // Настраиваем границы прокрутки
        const contentHeight = rows * spacingY + artHeight;
        const visibleHeight = height * 0.6;
        this.maxScrollY = 0;
        this.minScrollY = -(contentHeight - visibleHeight);
        if (this.minScrollY > 0) this.minScrollY = 0;

        console.log('Scroll bounds: minScrollY=', this.minScrollY, 'maxScrollY=', this.maxScrollY); // Отладка

        // Обработчик прокрутки
        let isDragging = false;
        let dragStartY = 0; // Переименовано, чтобы избежать конфликта с startY
        this.input.on('pointerdown', (pointer) => {
            isDragging = true;
            dragStartY = pointer.y;
        });
        this.input.on('pointermove', (pointer) => {
            if (isDragging) {
                const deltaY = pointer.y - dragStartY;
                this.scrollY += deltaY;
                this.scrollY = Phaser.Math.Clamp(this.scrollY, this.minScrollY, this.maxScrollY);
                this.scrollContainer.y = this.scrollY;
                dragStartY = pointer.y;
            }
        });
        this.input.on('pointerup', () => {
            isDragging = false;
        });
        this.input.on('pointerupoutside', () => {
            isDragging = false;
        });
    }

    showEnlargedArt(artIndex, title, width, height) {
        // Затемнённый фон
        this.elements.enlargedOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.9)
            .setOrigin(0, 0)
            .setDepth(40)
            .setInteractive();

        // Увеличенное изображение
        const enlargedArt = this.add.image(width / 2, height / 2, `art${artIndex}`)
            .setDisplaySize(width * 0.8, height * 0.6)
            .setDepth(41);

        // Название арта
        const titleText = this.add.text(width / 2, height * 0.75, title, {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.03}px`,
            color: '#ffffff',
            resolution: 1
        }).setOrigin(0.5).setDepth(41);

        // Кнопка закрытия
        const closeButton = this.add.image(width * 0.85, height * 0.131, 'close')
            .setDisplaySize(height * 0.02, height * 0.02)
            .setDepth(42)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.play('click');
                this.elements.enlargedOverlay.destroy();
                enlargedArt.destroy();
                titleText.destroy();
                closeButton.destroy();
            });
    }

    createCloseButton(width, height) {
        this.elements.closeButton = this.add.image(width * 0.85, height * 0.131, 'close')
            .setDisplaySize(height * 0.02, height * 0.02)
            .setDepth(38)
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

         const bgImage = this.children.getChildren().find(child => child.texture && child.texture.key === 'gallerybg');
    if (bgImage) {
        bgImage.setDisplaySize(width, height * 0.2);
    }

        this.elements.popupBg?.setPosition(popupX, popupY)
                             .setDisplaySize(popupWidth, popupHeight);

        // Заголовок
        this.elements.titleText?.setPosition(popupX, popupY - popupHeight / 2 + height * 0.03)
                               .setFontSize(height * 0.03);

        // Кнопка закрытия
        this.elements.closeButton?.setPosition(width * 0.85, height * 0.25)
                                 .setDisplaySize(height * 0.02, height * 0.02);

        // Перестраиваем сетку
        this.createGalleryGrid(width, height, storyId);
    }
}

window.GalleryScene = GalleryScene;