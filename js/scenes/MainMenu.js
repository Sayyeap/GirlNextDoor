class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('menu_bg', 'assets/common/images/menu_bg.jpg');
        this.load.audio('menu_music', 'assets/common/audio/menu_music.mp3');
        this.load.audio('pixel_dreaming', 'assets/story1/audio/pixel_dreaming.mp3');
        this.load.audio('click', 'assets/common/audio/click.wav');

        this.createFontPreload();
    }

    async create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Настройки масштабирования
        this.scale.on('resize', this.resize, this);
        this.scale.refresh();

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Фон (растягиваем на весь экран)
        this.bg = this.add.image(width / 2, height / 2, 'menu_bg')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);

        // Устанавливаем громкость
        this.game.sound.volume = 1.0;

        // Музыка
        this.menuMusic = this.sound.add('menu_music', { loop: true });
        console.log('MainMenu: Music initialized');

        await document.fonts.ready;
        console.log('MainMenu: Fonts loaded');

        // Заголовок
        this.titleText = this.add.text(width / 2, height * 0.1, '', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.043}px`,
            color: '#fff',
            resolution: 2 // Для четкости текста
        }).setOrigin(0.5).setDepth(10);

        // Функция для запуска музыки
        const playMusic = () => {
            if (!this.menuMusic.isPlaying) {
                this.menuMusic.play();
                console.log('MainMenu: Music playing', this.menuMusic.isPlaying);
            }
        };

        // Создаем кнопки с адаптивными размерами
        this.createButtons(width, height, playMusic);

        this.storyGroup = this.add.group();
    }

    createButtons(width, height, playMusic) {
        // Размеры и отступы кнопок
        const buttonWidth = width * 0.45; // Уменьшили ширину кнопок
        const buttonHeight = height * 0.055; // Уменьшили высоту кнопок
        const verticalSpacing = height * 0.07; // Уменьшили расстояние между кнопками

        // Позиции кнопок (подняли выше)
        const positions = [
            height * 0.68, // Новая игра (было 0.72)
            height * 0.75, // Продолжить (было 0.79)
            height * 0.82, // Настройки (было 0.86)
            height * 0.89  // Галерея (было 0.93)
        ];

        // Новая игра
        this.newGameContainer = this.add.container(width / 2, positions[0]).setDepth(10);
        const newGameButton = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', async () => {
                playMusic();
                this.sound.play('click');
                if (window.Telegram?.WebApp) {
                    const userId = window.gameConfig?.userId;
                    if (userId) {
                        try {
                            await Telegram.WebApp.CloudStorage.removeItem(`progress_${userId}_story1`);
                            console.log('MainMenu: Progress reset for story1 via CloudStorage');
                        } catch (error) {
                            console.error('MainMenu: Failed to reset progress', error);
                            localStorage.removeItem(`progress_story1`);
                        }
                    } else {
                        localStorage.removeItem(`progress_story1`);
                    }
                } else {
                    localStorage.removeItem(`progress_story1`);
                }
                this.scene.start('GameScene', {
                    storyId: 'story1',
                    sceneId: 'scene1',
                    dialogueIndexInScene: 0,
                    energy: 100,
                    stars: 0
                });
            });
        const newGameText = this.add.text(0, 0, 'Новая игра', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${buttonHeight * 0.45}px`,
            color: '#fff',
            textTransform: 'uppercase',
            resolution: 2
        }).setOrigin(0.5);
        this.newGameContainer.add([newGameButton, newGameText]);

        // Продолжить
        this.continueContainer = this.add.container(width / 2, positions[1]).setDepth(10);
        const continueButton = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                window.gameStorage.loadProgress('story1', this.registry, (progress) => {
                    this.scene.start('GameScene', {
                        storyId: 'story1',
                        sceneId: progress.sceneId,
                        dialogueIndexInScene: progress.dialogueIndex,
                        energy: progress.energy,
                        stars: progress.stars
                    });
                });
            });
        const continueText = this.add.text(0, 0, 'Продолжить', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${buttonHeight * 0.45}px`,
            color: '#fff',
            textTransform: 'uppercase',
            resolution: 2
        }).setOrigin(0.5);
        this.continueContainer.add([continueButton, continueText]);

        // Настройки
        this.settingsContainer = this.add.container(width / 2, positions[2]).setDepth(10);
        const settingsButton = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                this.scene.launch('SettingsScene');
                settingsButton.setInteractive();
            });
        const settingsText = this.add.text(0, 0, 'Настройки', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${buttonHeight * 0.45}px`,
            color: '#fff',
            resolution: 2
        }).setOrigin(0.5);
        this.settingsContainer.add([settingsButton, settingsText]);

        // Галерея
        this.galleryContainer = this.add.container(width / 2, positions[3]).setDepth(10);
        const galleryButton = this.add.rectangle(0, 0, buttonWidth, buttonHeight, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                console.log('Gallery TBD');
            });
        const galleryText = this.add.text(0, 0, 'Галерея', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${buttonHeight * 0.45}px`,
            color: '#fff',
            resolution: 2
        }).setOrigin(0.5);
        this.galleryContainer.add([galleryButton, galleryText]);
    }

    showStorySelection() {
        this.storyGroup.clear(true, true);
        const width = this.scale.width;
        const height = this.scale.height;
        const textColor = window.gameConfig?.colorScheme === 'dark' ? '#ffffff' : '#000000';
        
        stories.forEach((story, i) => {
            const storyContainer = this.add.container(width / 2, height * 0.3 + i * (height * 0.1)).setDepth(10);
            const btn = this.add.rectangle(0, 0, width * 0.7, height * 0.06, 0x333333, 0.8)
                .setInteractive()
                .on('pointerdown', () => {
                    this.sound.play('click');
                    const progress = { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
                    this.scene.start('GameScene', {
                        storyId: story.id,
                        sceneId: progress.sceneId,
                        dialogueIndexInScene: progress.dialogueIndexInScene,
                        energy: progress.energy,
                        stars: progress.stars
                    });
                });
            const storyText = this.add.text(0, 0, story.title, {
                fontFamily: 'IBM Plex Sans',
                fontSize: `${height * 0.0258}px`,
                color: '#fff',
                resolution: 2
            }).setOrigin(0.5);
            storyContainer.add([btn, storyText]);
            this.storyGroup.add(storyContainer);
        });
    }

    resize(gameSize) {
        if (!this.scene.isActive()) return;

        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Фон
        if (this.bg) {
            this.bg.setDisplaySize(width, height)
                .setPosition(width / 2, height / 2);
        }

        // Заголовок
        if (this.titleText) {
            this.titleText.setPosition(width / 2, height * 0.1)
                .setFontSize(height * 0.043);
        }

        // Кнопки
        const buttonWidth = width * 0.45;
        const buttonHeight = height * 0.055;
        const positions = [
            height * 0.68,
            height * 0.75,
            height * 0.82,
            height * 0.89
        ];

        const containers = [
            this.newGameContainer,
            this.continueContainer,
            this.settingsContainer,
            this.galleryContainer
        ];

        containers.forEach((container, i) => {
            if (container) {
                container.setPosition(width / 2, positions[i]);
                const rect = container.list.find(obj => obj.type === 'Rectangle');
                const text = container.list.find(obj => obj.type === 'Text');
                
                if (rect) rect.setSize(buttonWidth, buttonHeight);
                if (text) text.setFontSize(buttonHeight * 0.45);
            }
        });

        // История (если есть)
        if (this.storyGroup) {
            this.storyGroup.getChildren().forEach((container, i) => {
                container.setPosition(width / 2, height * 0.3 + i * (height * 0.1));
                const rect = container.list.find(obj => obj.type === 'Rectangle');
                const text = container.list.find(obj => obj.type === 'Text');
                
                if (rect) rect.setSize(width * 0.7, height * 0.06);
                if (text) text.setFontSize(height * 0.0258);
            });
        }
    }

    createFontPreload() {
        const div = document.createElement('div');
        div.style.fontFamily = 'IBM Plex Sans, Dela Gothic One, sans-serif';
        div.style.position = 'absolute';
        div.style.opacity = '0';
        div.style.pointerEvents = 'none';
        div.style.zIndex = '-1';
        div.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщьыъэюя';
        document.body.appendChild(div);
    }
}