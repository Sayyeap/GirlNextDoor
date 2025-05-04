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
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.mode = Phaser.Scale.RESIZE;
        this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        this.bg = this.add.image(width / 2, height / 2, 'menu_bg')
            .setScale(Math.max(width / 430, height / 932) * 0.5)
            .setOrigin(0.5)
            .setDepth(1);

        // Устанавливаем громкость
        this.game.sound.volume = 1.0;

        // Создаём музыку, но не запускаем сразу
        this.menuMusic = this.sound.add('menu_music', { loop: true });
        console.log('MainMenu: Music initialized');

        await document.fonts.ready;
        console.log('MainMenu: Fonts loaded');

        this.titleText = this.add.text(width / 2, height * 0.1, '', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.043}px`,
            color: '#fff',
        }).setOrigin(0.5)
          .setDepth(10);

        // Функция для запуска или возобновления музыки
        const playMusic = () => {
            if (!this.menuMusic.isPlaying) {
                this.menuMusic.play();
                console.log('MainMenu: Music playing', this.menuMusic.isPlaying);
            }
        };

        // Новая игра
        this.newGameContainer = this.add.container(width / 2, height * 0.72).setDepth(10);
        const newGameButton = this.add.rectangle(0, 0, width * 0.5, height * 0.06, 0x000000, 0.8)
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
            fontSize: `${height * 0.0258}px`,
            color: '#fff',
            textTransform: 'uppercase'
        }).setOrigin(0.5);
        this.newGameContainer.add([newGameButton, newGameText]);

        // Продолжить
        this.continueContainer = this.add.container(width / 2, height * 0.79).setDepth(10);
        const continueButton = this.add.rectangle(0, 0, width * 0.5, height * 0.06, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                const progress = { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
                this.scene.start('GameScene', {
                    storyId: 'story1',
                    sceneId: progress.sceneId,
                    dialogueIndexInScene: progress.dialogueIndexInScene,
                    energy: progress.energy,
                    stars: progress.stars
                });
            });
        const continueText = this.add.text(0, 0, 'Продолжить', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.0258}px`,
            color: '#fff',
            textTransform: 'uppercase'
        }).setOrigin(0.5);
        this.continueContainer.add([continueButton, continueText]);

        // Настройки
        this.settingsContainer = this.add.container(width / 2, height * 0.86).setDepth(10);
        const settingsButton = this.add.rectangle(0, 0, width * 0.5, height * 0.06, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                this.scene.launch('SettingsScene');
                // Убеждаемся, что кнопка остаётся интерактивной
                settingsButton.setInteractive();
            });
        const settingsText = this.add.text(0, 0, 'Настройки', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.0258}px`,
            color: '#fff',
        }).setOrigin(0.5);
        this.settingsContainer.add([settingsButton, settingsText]);

        // Галерея
        this.galleryContainer = this.add.container(width / 2, height * 0.93).setDepth(10);
        const galleryButton = this.add.rectangle(0, 0, width * 0.5, height * 0.06, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => {
                playMusic();
                this.sound.play('click');
                console.log('Gallery TBD');
            });
        const galleryText = this.add.text(0, 0, 'Галерея', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.0258}px`,
            color: '#fff',
        }).setOrigin(0.5);
        this.galleryContainer.add([galleryButton, galleryText]);

        this.storyGroup = this.add.group();

        this.scale.on('resize', this.resize, this);
    }

    showStorySelection() {
        this.storyGroup.clear(true, true);
        const width = this.game.config.width;
        const height = this.game.config.height;
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
            }).setOrigin(0.5);
            storyContainer.add([btn, storyText]);
            this.storyGroup.add(storyContainer);
        });
    }

    resize(size) {
        if (!this.scene.isActive()) return;

        const width = size.width || this.game.config.width;
        const height = size.height || this.game.config.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        if (this.bg) {
            this.bg.setPosition(width / 2, height / 2)
                .setScale(Math.max(width / 430, height / 932) * 0.5)
                .setOrigin(0.5);
        }

        if (this.titleText) {
            this.titleText.setPosition(width / 2, height * 0.1)
                .setFontSize(height * 0.043);
        }

        if (this.newGameContainer) {
            this.newGameContainer.setPosition(width / 2, height * 0.72);
            this.newGameContainer.getAll('type', 'Rectangle')[0]?.setSize(width * 0.5, height * 0.06);
            this.newGameContainer.getAll('type', 'Text')[0]?.setFontSize(height * 0.0258);
        }

        if (this.continueContainer) {
            this.continueContainer.setPosition(width / 2, height * 0.79);
            this.continueContainer.getAll('type', 'Rectangle')[0]?.setSize(width * 0.5, height * 0.06);
            this.continueContainer.getAll('type', 'Text')[0]?.setFontSize(height * 0.0258);
        }

        if (this.settingsContainer) {
            this.settingsContainer.setPosition(width / 2, height * 0.86);
            this.settingsContainer.getAll('type', 'Rectangle')[0]?.setSize(width * 0.5, height * 0.06);
            this.settingsContainer.getAll('type', 'Text')[0]?.setFontSize(height * 0.0258);
        }

        if (this.galleryContainer) {
            this.galleryContainer.setPosition(width / 2, height * 0.93);
            this.galleryContainer.getAll('type', 'Rectangle')[0]?.setSize(width * 0.5, height * 0.06);
            this.galleryContainer.getAll('type', 'Text')[0]?.setFontSize(height * 0.0258);
        }

        if (this.storiesGroup && this.storiesGroup.getChildren().length > 0) {
            this.storiesGroup.getChildren().forEach((container, i) => {
                container.setPosition(width / 2, height * 0.3 + i * (height * 0.1));
                container.getAll('type', 'Rectangle')[0]?.setSize(width * 0.7, height * 0.06);
                container.getAll('type', 'Text')[0]?.setFontSize(height * 0.0258);
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