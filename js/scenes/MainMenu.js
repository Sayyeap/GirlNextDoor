class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('menu_bg', 'assets/common/images/menu_bg.jpg');
        this.load.audio('menu_music', 'assets/common/audio/menu_music.mp3');
        this.load.audio('pixel_dreaming', 'assets/story1/audio/pixel_dreaming.mp3');

        // Форсированная подгрузка шрифтов
        this.createFontPreload();
    }

    async create() {
        this.add.image(215, 466, 'menu_bg').setDisplaySize(430, 932);

        const music = this.sound.add('menu_music', { loop: true });
        music.play();
 
        await document.fonts.ready; // Ждём загрузки шрифтов!

        this.add.text(215, 100, '', {
            fontFamily: 'Dela Gothic One',
            fontSize: '40px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Story Selection Button
      const storyButton = this.add.rectangle(215, 670, 200, 60, 0x000000, 0.8)
    .setInteractive()
    .on('pointerdown', () => {
        this.scene.start('GameScene', { storyId: 'story1' });  // Передаем storyId в GameScene
    });
        this.add.text(215, 670, 'Начать', {
            fontFamily: 'IBM Plex Sans',
            fontSize: '24px',
            color: '#ffffff',
            textTransform:'uppercase',
        }).setOrigin(0.5);

        // Gallery Button
        const galleryButton = this.add.rectangle(215, 735, 200, 60, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => console.log('Gallery TBD'));
        this.add.text(215, 735, 'Галерея', {
            fontFamily: 'IBM Plex Sans',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Settings Button
        const settingsButton = this.add.rectangle(215, 800, 200, 60, 0x000000, 0.8)
            .setInteractive()
            .on('pointerdown', () => this.scene.launch('SettingsScene'));
        this.add.text(215, 800, 'Хуй', {
            fontFamily: 'IBM Plex Sans',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.storyGroup = this.add.group();
    }

    showStorySelection() {
        this.storyGroup.clear(true, true);
        stories.forEach((story, i) => {
            const btn = this.add.rectangle(215, 266 + i * 80, 300, 60, 0x333333, 0.8)
                .setInteractive()
                .on('pointerdown', () => {
                    this.scene.start('GameScene', { storyId: story.id });
                });
            this.add.text(215, 266 + i * 80, story.title, {
                fontFamily: 'IBM Plex Sans',
                fontSize: '24px',
                color: '#ffffff'
            }).setOrigin(0.5);
            this.storyGroup.add(btn);
        });
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
