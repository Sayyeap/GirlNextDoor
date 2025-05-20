class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.story = null;
        this.currentScene = null;
        this.dialogueIndexInScene = 0;
        this.currentMusic = null;
        this.energy = 100;
        this.stars = 0;
        this.choicesGroup = null;
        this.charShakeTween = null;
        this.isLoaded = false;
        this.isTyping = false;
        this.currentDialogueText = '';
        this.typewriterTimer = null;
        this.loadingText = null;
        this.loadingDots = 0;
        this.loadingTimer = null;
    }

    init(data) {
        this.storyId = data.storyId || 'story1';
        this.story = stories.find(s => s.id === this.storyId);
        if (!this.story) {
            console.error('Story not found:', this.storyId);
            this.scene.restart({ storyId: this.storyId });
            return;
        }
        this.sound.stopAll();
        console.log('All sounds stopped');
        this.loadGame(data);
    }

    preload() {
        // Backgrounds
        this.load.image('elevator', 'assets/story1/images/backgrounds/elevator.jpg');
        this.load.image('home', 'assets/story1/images/backgrounds/home.jpg');
        this.load.image('miapc', 'assets/story1/images/backgrounds/miaPC.jpg');
        this.load.image('miaroom', 'assets/story1/images/backgrounds/miaRoom.jpg');
        this.load.image('assshot', 'assets/story1/images/backgrounds/assshot.jpg');
        this.load.image('loch', 'assets/story1/images/backgrounds/loch.jpg');
        this.load.image('city_street', 'assets/story1/images/backgrounds/city_street.png');
        this.load.image('girl_with_phone', 'assets/story1/images/backgrounds/girl_with_phone.jpg');
        this.load.image('Home_enter', 'assets/story1/images/backgrounds/Home_enter.png');
        this.load.image('home_hall_box', 'assets/story1/images/backgrounds/home_hall_box.png');
        this.load.image('metro_enter', 'assets/story1/images/backgrounds/metro_enter.png');
        this.load.image('metro_people', 'assets/story1/images/backgrounds/metro_people.png');
        this.load.image('metro_people_station', 'assets/story1/images/backgrounds/metro_people_station.png');
        this.load.image('mia_appart', 'assets/story1/images/backgrounds/mia_appart.png');
        this.load.image('miaRoom_new', 'assets/story1/images/backgrounds/miaRoom_new.png');
        this.load.image('morning_scene', 'assets/story1/images/backgrounds/morning_scene.jpg');
        this.load.image('ggroom', 'assets/story1/images/backgrounds/ggroom.jpg');
        this.load.image('office', 'assets/story1/images/backgrounds/office.jpg');
        this.load.image('office_pc', 'assets/story1/images/backgrounds/office_pc.jpg');
        this.load.image('sexphoto_office', 'assets/story1/images/backgrounds/sexphoto_office.jpg');
        this.load.image('phone_hand', 'assets/story1/images/backgrounds/phone_hand.jpg');
        this.load.image('sexphoto_metro', 'assets/story1/images/backgrounds/sexphoto_metro.jpg');

        // Characters
        this.load.image('mia_tshirt_shy', 'assets/story1/images/characters/mia_tshirt_shy.png');
        this.load.image('mia_tshirt_angry', 'assets/story1/images/characters/mia_tshirt_angry.png');
        this.load.image('mia_tshirt_happy', 'assets/story1/images/characters/mia_tshirt_happy.png');
        this.load.image('mia_tshirt_back', 'assets/story1/images/characters/mia_tshirt_back.png');
        this.load.image('mia_skirtoffice_shy', 'assets/story1/images/characters/mia_skirtoffice_shy.png');
        this.load.image('mia_skirt_back', 'assets/story1/images/characters/mia_skirt_back.png');
        this.load.image('Workguy_chill', 'assets/story1/images/characters/Workguy_chill.png');
        this.load.image('workguy_angry', 'assets/story1/images/characters/workguy_angry.png');

        // UI
        this.load.image('energyIcon', 'assets/common/images/energyIcon.png');
        this.load.image('settings', 'assets/common/images/settings.png');
        this.load.image('next', 'assets/common/images/next.png');
        this.load.image('darkbg', 'assets/common/images/darkbg.png');
        this.load.image('nameline', 'assets/common/images/nameline.png');

        // Audio
        this.load.audio('stalker_terror', 'assets/story1/audio/stalker_terror.mp3');
        this.load.audio('sad_night', 'assets/story1/audio/sad_night.mp3');
        this.load.audio('map_memory', 'assets/story1/audio/map_memory.mp3');
        this.load.audio('groove_tonight', 'assets/story1/audio/groove_tonight.mp3');
        this.load.audio('moonlight', 'assets/story1/audio/moonlight.mp3');
        this.load.audio('pixel_dreaming', 'assets/story1/audio/pixel_dreaming.mp3');
        this.load.audio('click', 'assets/common/audio/click.wav');
        this.load.audio('menu_music', 'assets/common/audio/menu_music.mp3');

        this.load.on('filecomplete', (key) => console.log('File loaded:', key));
        this.load.on('fileerror', (file) => console.error('File failed to load:', file.key, file.src));
        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.isLoaded = true;
        });
    }

    async create() {
        // Handle screen visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('Pausing sound due to screen lock');
                this.sound.pauseAll();
            } else {
                console.log('Resuming sound after screen unlock');
                this.sound.resumeAll();
            }
        });

    this.game.events.on('hidden', () => {
    console.log('Game hidden, pausing');
    this.sound.pauseAll();
    });

    this.game.events.on('visible', () => {
    console.log('Game visible, resuming');
    this.sound.resumeAll();
    this.scale.refresh(); // Важно: принудительное обновление масштабирования
    });

        // Setup scaling
        this.scale.on('resize', this.resize, this);
        this.scale.refresh();

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.setBackgroundColor('#000000');

        try {
            this.game.sound.volume = await loadVolume(this.registry);
            console.log('GameScene: Volume loaded', this.game.sound.volume);
        } catch (error) {
            console.error('GameScene: Failed to load volume', error);
            this.game.sound.volume = 1.0;
        }

        // Loading screen
        const loadingRect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setDepth(100);
        this.loadingText = this.add.text(width / 2, height / 2, 'Loading ...', {
            fontSize: `${Math.min(height * 0.035, 24)}px`,
            color: '#ffffff',
            fontFamily: 'IBM Plex Sans',
            resolution: 2
        }).setOrigin(0.5).setDepth(101);

        this.loadingTimer = this.time.addEvent({
            delay: 500,
            callback: () => {
                this.loadingDots = (this.loadingDots + 1) % 4;
                const dots = '.'.repeat(this.loadingDots);
                this.loadingText.setText(`Loading ${dots}`);
            },
            callbackScope: this,
            loop: true
        });

        if (this.isLoaded) {
            this.finishLoading(loadingRect);
        } else {
            this.load.once('complete', () => this.finishLoading(loadingRect));
            this.load.start();
        }
    }

    finishLoading(loadingRect) {
        loadingRect.destroy();
        this.loadingText.destroy();
        this.loadingTimer.remove();
        
        this.setupScene();
        this.showDialogue();
        console.log('Create completed');
    }

    setupScene() {
        console.log('SetupScene started');
        const width = this.scale.width;
        const height = this.scale.height;

        // Background
        this.bg = this.add.image(width / 2, height / 2, 'home')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);

        // Character
        const charY = height - (height * 0.05); // Фиксированный отступ от низа
        this.char = this.add.image(width / 2, charY, 'mia_tshirt_shy')
            .setScale(width * 0.89 / 600)
            .setOrigin(0.5, 1)
            .setAlpha(0)
            .setDepth(5);

        this.charBreathTween = this.tweens.add({
            targets: this.char,
            y: { 
                from: height * 0.95, 
                to: height * 0.95 - 3,
            },
            duration: 650,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            paused: true
        });

        // Energy UI
        this.createEnergyUI(width, height);

        // Dialogue Box
        this.dialogueBox = this.add.image(width / 2, height, 'darkbg')
            .setDisplaySize(width, height * 0.35)
            .setOrigin(0.5, 1)
            .setDepth(10);

        // Speaker Text
        this.speakerText = this.add.text(width * 0.1, height * 0.62, '', {
            fontSize: `${Math.min(height * 0.027, 22)}px`,
            color: '#fff',
            fontFamily: 'Dela Gothic One',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.0)
            .setDepth(10);

        // Name Line
        this.nameline = this.add.image(
            width * 0.1,
            height * 0.655,
            'nameline'
        )
        .setOrigin(0, 0.5)
        .setDepth(11);

        // Dialogue Text
        this.dialogueText = this.add.text(width * 0.1, height * 0.68, '', {
            fontSize: `${Math.min(height * 0.024, 20)}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'left',
            wordWrap: { width: width * 0.8 }
        }).setOrigin(0.0)
            .setDepth(10);

        // Next Button
        this.createNextButton(width, height);

        // Settings Button
        this.createSettingsButton(width, height);

        this.choicesGroup = this.add.group();
        console.log('SetupScene completed');
    }

    createEnergyUI(width, height) {
        const bgWidth = width * 0.26;
        const bgHeight = height * 0.04;
        const bgX = width * 0.15;
        const bgY = height * 0.1;

        this.energyBg = this.add.graphics()
            .fillStyle(0x000000, 0.7)
            .fillRoundedRect(
                bgX - bgWidth/2,
                bgY - bgHeight/2,
                bgWidth,
                bgHeight,
                5
            )
            .setDepth(10);

        this.energyText = this.add.text(bgX - bgWidth/2 + 10, bgY, this.energy.toString(), {
            fontSize: `${Math.min(height * 0.0258, 20)}px`,
            color: '#fff',
            fontFamily: 'Dela Gothic One'
        }).setOrigin(0, 0.5)
          .setDepth(11);

        this.energyIcon = this.add.image(bgX - bgWidth/2 + 30, bgY, 'energyIcon')
            .setDisplaySize(height * 0.037, height * 0.037)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Energy icon clicked, show modal');
            })
            .setDepth(11);
    }

    createNextButton(width, height) {
        this.nextButtonContainer = this.add.container(width / 2, height * 0.9).setDepth(10);
        
        const bg = this.add.rectangle(0, 0, width * 0.3, height * 0.06, 0x000000, 0.7)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play('click');
                if (this.isTyping) {
                    this.isTyping = false;
                    this.dialogueText.setText(this.currentDialogueText);
                } else {
                    this.showNextDialogue();
                }
            });

        const nextText = this.add.text(0, 0, 'Далее', {
            fontSize: `${Math.min(height * 0.0258, 20)}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans'
        }).setOrigin(0.5);

        const rightArrow = this.add.image(width * 0.12, 0, 'next')
            .setDisplaySize(height * 0.023, height * 0.023)
            .setOrigin(0.5);

        this.nextButtonContainer.add([bg, nextText, rightArrow]);
    }

    createSettingsButton(width, height) {
        const btnSize = height * 0.04;
        const btnX = width * 0.85;
        const btnY = height * 0.1;

        this.settingsButtonBg = this.add.graphics()
            .fillStyle(0x000000, 0.7)
            .fillRoundedRect(
                btnX - btnSize/2,
                btnY - btnSize/2,
                btnSize,
                btnSize,
                5
            )
            .setDepth(10);

        this.settingsButton = this.add.image(btnX, btnY, 'settings')
            .setDisplaySize(height * 0.032, height * 0.032)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play('click');
                console.log('Settings clicked');
                this.scene.launch('SettingsScene');
            })
            .setDepth(11);
    }

    resize(size) {
        if (!this.scene.isActive()) return;

        const width = size.width || this.scale.width;
        const height = size.height || this.scale.height;

        // Update camera
        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Background
        if (this.bg) {
            this.bg.setDisplaySize(width, height).setPosition(width/2, height/2);
        }

        // Character
        if (this.char) {
            const charY = height * 0.95;
            this.char.setPosition(width/2, charY).setScale(width * 0.89 / 600);
            
            // Update breathing animation
            if (this.charBreathTween) {
                this.charBreathTween.updateTo('y', { 
                    from: charY,
                    to: charY - 3
                }, true);
            }
        }

        // Energy UI
        if (this.energyBg) {
            const bgWidth = width * 0.26;
            const bgHeight = height * 0.04;
            const bgX = width * 0.15;
            const bgY = height * 0.1;

            this.energyBg.clear()
                .fillStyle(0x000000, 0.7)
                .fillRoundedRect(
                    bgX - bgWidth/2,
                    bgY - bgHeight/2,
                    bgWidth,
                    bgHeight,
                    5
                );

            if (this.energyText) {
                this.energyText.setPosition(bgX - bgWidth/2 + 10, bgY)
                    .setFontSize(Math.min(height * 0.0258, 20));
            }

            if (this.energyIcon) {
                this.energyIcon.setPosition(bgX - bgWidth/2 + 30, bgY)
                    .setDisplaySize(height * 0.037, height * 0.037);
            }
        }

        // Dialogue Box
        if (this.dialogueBox) {
            this.dialogueBox.setDisplaySize(width, height * 0.35)
                .setPosition(width/2, height);
        }

        // Speaker and Dialogue Text
        if (this.speakerText) {
            this.speakerText.setPosition(width * 0.1, height * 0.62)
                .setFontSize(Math.min(height * 0.027, 22));
        }

        if (this.nameline) {
            this.nameline.setPosition(width * 0.1, height * 0.655)
                .setDisplaySize(this.speakerText.width + 20, 2);
        }

        if (this.dialogueText) {
            this.dialogueText.setPosition(width * 0.1, height * 0.68)
                .setFontSize(Math.min(height * 0.024, 20))
                .setWordWrapWidth(width * 0.8);
        }

        // Next Button
        if (this.nextButtonContainer) {
            this.nextButtonContainer.setPosition(width/2, height * 0.9);
            this.nextButtonContainer.getAll().forEach(child => {
                if (child.type === 'Text') {
                    child.setFontSize(Math.min(height * 0.0258, 20));
                } else if (child.type === 'Image') {
                    child.setDisplaySize(height * 0.023, height * 0.023);
                } else if (child.type === 'Rectangle') {
                    child.setSize(width * 0.3, height * 0.06);
                }
            });
        }

        // Settings Button
        if (this.settingsButtonBg) {
            const btnSize = height * 0.04;
            const btnX = width * 0.85;
            const btnY = height * 0.1;

            this.settingsButtonBg.clear()
                .fillStyle(0x000000, 0.7)
                .fillRoundedRect(
                    btnX - btnSize/2,
                    btnY - btnSize/2,
                    btnSize,
                    btnSize,
                    5
                );

            if (this.settingsButton) {
                this.settingsButton.setPosition(btnX, btnY)
                    .setDisplaySize(height * 0.032, height * 0.032);
            }
        }
    }
// Нормальаня сетап сцена)
    setupScene() {
        console.log('SetupScene started');
        const width = this.game.config.width;
        const height = this.game.config.height;
       

        this.bg = this.add.image(width / 2, height / 2, 'home')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);

           // 1. Настройка персонажа с "запасом" по Y
           this.char = this.add.image(width / 2, height, 'mia_tshirt_shy')
           .setScale(width * 0.89 / 600)
           .setOrigin(0.5, 0.97)
           .setAlpha(0)
           .setDepth(5);

           this.charBreathTween = this.tweens.add({
            targets: this.char,
            y: { 
                from: height, 
                to: height - 3, // Сила "вдоха" (регулируйте)
            },
            duration: 650,      // Очень плавно
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            paused: true
        });



      // Создаем графику для подложки с закругленными углами
this.energyBg = this.add.graphics()

.setDepth(10);

// Настраиваем параметры подложки (аналогично кнопке настроек)
const bgX = width * 0.15;
const bgY = height * 0.15;
const bgWidth = width * 0.26;  // Сохраняем оригинальную ширину
const bgHeight = height * 0.04; // Высота как у кнопки настроек
const bgRadius = 5;             // Закругление как у кнопки настроек (было 10)
const bgColor = 0x000000;       // Цвет как у кнопки настроек
const bgAlpha = 0.7;            // Прозрачность как у кнопки настроек

// Создаем графический объект для подложки (аналогично кнопке настроек)
this.energyBg = this.add.graphics()
    .setDepth(10);

// Рисуем прямоугольник с закругленными углами в стиле кнопки настроек
this.energyBg.fillStyle(bgColor, bgAlpha);
this.energyBg.fillRoundedRect(
    bgX - bgWidth/2,  // x позиция (центрирование)
    bgY - bgHeight/2, // y позиция (центрирование)
    bgWidth, 
    bgHeight, 
    bgRadius
);



this.energyText = this.add.text(width * 0.11, height * 0.135, this.energy, {
fontSize: `${height * 0.0258}px`,
color: '#fff',
fontFamily: 'Dela Gothic One'
}).setDepth(11); // Увеличиваем depth, чтобы текст был поверх подложки

this.energyIcon = this.add.image(width * 0.064, height * 0.15, 'energyIcon')
.setDisplaySize(height * 0.037, height * 0.037)
.setDepth(11) // Увеличиваем depth, чтобы иконка была поверх подложки
.setInteractive()
.on('pointerdown', () => {
    console.log('Energy icon clicked, show modal');
});

        this.dialogueBox = this.add.image(width / 2, height, 'darkbg')
            .setDisplaySize(width, height * 0.7)
            .setOrigin(0.5, 1)
            .setDepth(10);

        this.speakerText = this.add.text(width * 0.1, height * 0.62, '', {
            fontSize: `${height * 0.027}px`,
            color: '#fff',
            fontFamily: 'Dela Gothic One',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.0)
            .setDepth(10);

          // Инициализируем nameline как прямоугольник (или используйте вашу текстуру)
          this.nameline = this.add.image(
            width * 0,  // начальная X позиция (совпадает с speakerText)
            height * 0.655, // начальная Y позиция (ниже speakerText)
            'nameline'    // ключ текстуры
        )
        .setOrigin(0, 0.5) // выравнивание по левому краю
        .setDepth(11);

        this.dialogueText = this.add.text(width * 0.1, height * 0.666, '', {
            fontSize: `${height * 0.024}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'left'
        }).setWordWrapWidth(width * 0.8)
            .setOrigin(0.0)
            .setDepth(10);

        this.nextButtonContainer = this.add.container(width / 2, height * 0.91).setDepth(10);
        const nextText = this.add.text(0, 0, 'Далее', {
            fontSize: `${height * 0.0258}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans'
        }).setOrigin(0.5);
        const rightArrow = this.add.image(width * 0.12, 0, 'next')
            .setDisplaySize(height * 0.023, height * 0.023)
            .setOrigin(0.5);
        this.nextButtonContainer.add([nextText, rightArrow]);
        this.nextButtonContainer.setInteractive(new Phaser.Geom.Rectangle(-width * 0.15, -height * 0.03, width * 0.3, height * 0.06), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => {
                this.sound.play('click');
                if (this.isTyping) {
                    this.isTyping = false;
                    this.dialogueText.setText(this.currentDialogueText);
                } else {
                    this.showNextDialogue();
                }
            });

            
            const settingsBgSize = height * 0.04; // Размер квадратной подложки
            const settingsBgRadius = 5; // Небольшое закругление (можно поставить 0 для идеального квадрата)
            
            this.settingsButtonBg = this.add.graphics()
                .setDepth(10);
            
            // Рисуем квадратную подложку с закругленными углами
            this.settingsButtonBg.fillStyle(0x000000, 0.7); // Цвет и прозрачность как в energyRect
            this.settingsButtonBg.fillRoundedRect(
                width / 1.073 - settingsBgSize/2, // X позиция (центрирование)
                height * 0.15 - settingsBgSize/2, // Y позиция (центрирование)
                settingsBgSize, 
                settingsBgSize, 
                settingsBgRadius
            );
            this.clickSound = this.sound.add('click');
            
            // Иконка настроек (остается без изменений)
            this.settingsButton = this.add.image(width / 1.073, height * 0.15, 'settings')
                .setDisplaySize(height * 0.032, height * 0.032)
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    this.clickSound.play();
                    console.log('Settings clicked');
                    this.scene.launch('SettingsScene');
                })
                .setDepth(11); // Увеличиваем depth, чтобы иконка была поверх подложки
            
            this.choicesGroup = this.add.group();
            console.log('SetupScene completed');
    }







    updateScene() {
        const validBackgrounds = ['elevator', 'home', 'miapc', 'miaroom', 'assshot', 'loch', 'girl_with_phone', 'Home_enter', 'city_street','sexphoto_office','phone_hand','sexphoto_metro',
            'home_hall_box','metro_enter','metro_people','metro_people_station','mia_appart','miaRoom_new','morning_scene','ggroom' ,'office','office_pc'];
        const bgKey = validBackgrounds.includes(this.currentScene.bg) ? this.currentScene.bg : 'home';
        console.log('Setting background to:', bgKey);
        this.bg.setTexture(bgKey);

        if (this.currentScene.music !== this.currentMusic) {
            if (this.currentMusic) {
                this.sound.stopByKey(this.currentMusic);
                console.log('Stopped music:', this.currentMusic);
            }
            if (this.currentScene.music) {
                const music = this.sound.add(this.currentScene.music, { loop: true, volume: this.game.sound.volume });
                try {
                    music.play();
                    console.log('Playing music:', this.currentScene.music);
                } catch (error) {
                    console.error('Failed to play music:', this.currentScene.music, error);
                }
            }
            this.currentMusic = this.currentScene.music;
            console.log('Music updated to:', this.currentMusic);
        }
    }

    showDialogue() {
    console.log('ShowDialogue started');
    if (!this.currentScene || !this.currentScene.dialogues) {
        console.log('No current scene or dialogues');
        this.scene.start('MainMenu');
        return;
    }

    const dialogues = this.currentScene.dialogues;

    if (this.dialogueIndexInScene >= dialogues.length) {
        if (this.currentScene.nextScene) {
            console.log(`Transition to nextScene: ${this.currentScene.nextScene}`);
            // Очистка текстовых полей и состояния перед переходом
            this.dialogueText.setText('');
            this.speakerText.setText('');
            this.currentDialogueText = '';
            this.isTyping = false;
            if (this.typewriterTimer) {
                this.typewriterTimer.remove();
                this.typewriterTimer = null;
            }
            // Переход на новую сцену
            this.currentScene = this.story.dialogues.find(scene => scene.id === this.currentScene.nextScene) || this.currentScene;
            this.dialogueIndexInScene = 0;
            this.saveProgress();
            this.updateScene();
            this.showDialogue(); // Рекурсивный вызов
        } else {
            console.log('End of story, showing ending');
            this.showEnding();
            return;
        }
    } else {
        const dialogue = dialogues[this.dialogueIndexInScene];
        console.log('ShowDialogue - Scene:', this.currentScene.id, 'Dialogue:', dialogue);

        // Очистка предыдущего состояния
        this.currentDialogueText = '';
        this.dialogueText.setText('');
        this.speakerText.setText('');
        this.isTyping = false;
        if (this.typewriterTimer) {
            this.typewriterTimer.remove();
            this.typewriterTimer = null;
        }

        if (this.choicesGroup) {
            this.choicesGroup.clear(true, true);
        }

        this.updateScene();

        if (dialogue.sfx) {
            try {
                const sfx = this.sound.add(dialogue.sfx, { volume: this.game.sound.volume });
                sfx.play();
                console.log('Playing SFX:', dialogue.sfx);
            } catch (error) {
                console.error('Failed to play SFX:', dialogue.sfx, error);
            }
        }

        const validCharacters = ['mia_tshirt_shy', 'mia_tshirt_angry', 'mia_tshirt_happy', 'mia_tshirt_back', 'mia_skirtoffice_shy', 'mia_skirt_back','workguy_angry'];
        if (dialogue.charSprite && validCharacters.includes(dialogue.charSprite)) {
            this.char.setTexture(dialogue.charSprite).setAlpha(1);
            this.charBreathTween.play();
        } else {
            this.char.setAlpha(0);
            this.charBreathTween.pause();
        }

        if (this.charShakeTween) {
            this.charShakeTween.stop();
        }
        if (dialogue.shake === 'shake') {
            this.charShakeTween = this.tweens.add({
                targets: this.char,
                x: { value: '+=10', yoyo: true, repeat: -1, duration: 100 },
                y: { value: '+=10', yoyo: true, repeat: -1, duration: 100 }
            });
        }

        const width = this.game.config.width;
        const height = this.game.config.height;

        if (dialogue.text && dialogue.speaker) {
            this.dialogueBox.setVisible(true);
            const hasSpeaker = !!dialogue.speaker?.trim();
            this.speakerText.setVisible(hasSpeaker)
                .setText(dialogue.speaker || '');
            this.nameline.setVisible(hasSpeaker);

            this.currentDialogueText = dialogue.text || '';
            this.dialogueText.setVisible(true);
            this.speakerText.setDepth(12);
            this.dialogueText.setDepth(12);

            this.isTyping = true;
            this.typewriterEffect(this.currentDialogueText);
            this.nextButtonContainer.setVisible(true);
        } else {
            this.dialogueBox.setVisible(false);
            this.speakerText.setVisible(false).setText('');
            this.nameline.setVisible(false);
            this.dialogueText.setVisible(false).setText('');
            this.nextButtonContainer.setVisible(true);
        }

        if (dialogue.choices) {
            this.showChoices(dialogue.choices);
            this.nextButtonContainer.setVisible(false);
        }

        if (!dialogue.choices) {
            this.saveProgress();
        }
    }
}

    async showEnding() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        const textColor = '#ffffff';

        this.energy += 100;
        this.energyText.setText(this.energy);
        await this.saveProgress();

        this.dialogueBox.setVisible(false);
        this.speakerText.setVisible(false).setText('');
        this.dialogueText.setVisible(false).setText('');
        this.nextButtonContainer.setVisible(false);
        this.choicesGroup.clear(true, true);
        this.char.setAlpha(0);
        this.charBreathTween.pause();
        if (this.bg) {
            this.bg.setVisible(false);
        }
        if (this.energyRect) {
            this.energyRect.setVisible(false);
        }
        if (this.energyText) {
            this.energyText.setVisible(false);
        }
        if (this.energyIcon) {
            this.energyIcon.setVisible(false);
        }
        if (this.settingsButtonBg) {
            this.settingsButtonBg.setVisible(false);
        }
        if (this.settingsButton) {
            this.settingsButton.setVisible(false);
        }
        if (this.nameline) {
            this.nameline.setVisible(false); 
        }
        

        const endingText = this.add.text(width / 2, height / 2, 'Конец истории', {
            fontSize: `${height * 0.043}px`,
            color: textColor,
            fontFamily: 'Dela Gothic One',
            align: 'center'
        }).setOrigin(0.5)
            .setDepth(10);

        if (this.currentMusic) {
            const music = this.sound.get(this.currentMusic);
            if (music) {
                this.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 2000,
                    onComplete: () => {
                        this.sound.stopByKey(this.currentMusic);
                        this.currentMusic = null;
                    }
                });
            }
        }

        if (this.charShakeTween) {
            this.charShakeTween.stop();
        }
        if (this.typewriterTimer) {
            this.typewriterTimer.remove();
            this.typewriterTimer = null;
        }

        this.time.delayedCall(3000, () => {
            this.sound.stopAll();
            this.scene.stop('GameScene');
            this.scene.start('MainMenu');
            console.log('GameScene: Transition to MainMenu');
        });
    }

    shutdown() {
        this.scale.off('resize', this.resize, this);
        if (this.time) {
            this.time.removeAllEvents();
        }
        if (this.tweens) {
            this.tweens.killAll();
        }
        console.log('GameScene: Shutdown completed, all handlers and timers removed');
    }

    typewriterEffect(text) {
        if (!this.scene.isActive()) {
            console.log('Scene not active, skipping typewriterEffect');
            return;
        }

        let index = 0;
        this.dialogueText.setText('');
        this.isTyping = true;
        this.typewriterTimer = this.time.addEvent({
            delay: 50,
            callback: () => {
                if (!this.isTyping || index >= text.length || !this.scene.isActive()) {
                    this.isTyping = false;
                    this.dialogueText.setText(text);
                    if (this.typewriterTimer) {
                        this.typewriterTimer.remove();
                        this.typewriterTimer = null;
                    }
                    return;
                }
                this.dialogueText.setText(text.substring(0, ++index));
            },
            callbackScope: this,
            loop: true
        });
    }

    showChoices(choices) {
        const width = this.game.config.width;
        const height = this.game.config.height;
        const accentColor = '#61bdff';
        this.choicesGroup.clear(true, true);

        const totalHeight = choices.length * (height * 0.08);
        const startY = (height - totalHeight) / 2;

        choices.forEach((choice, index) => {
            const y = startY + index * (height * 0.08);
            const container = this.add.container(width / 2, y).setDepth(10);

            const bg = this.add.rectangle(0, 0, width, height * 0.06, 0x000000, 0.7);

            const choiceText = this.add.text(-width * 0.45, 0, choice.text, {
                fontSize: `${height * 0.0258}px`,
                color: '#fff',
                fontFamily: 'IBM Plex Sans',
                padding: { x: 10, y: 5 }
            }).setOrigin(0, 0.5)
                .setInteractive()
                .on('pointerdown', async () => {
                    if (this.energy >= choice.energyCost) {
                        this.energy -= choice.energyCost;
                        this.energyText.setText(this.energy);
                        this.choicesGroup.clear(true, true);
                        this.sound.play('click');

                        console.log('Before choice:', {
                            currentScene: this.currentScene.id,
                            dialogueIndex: this.dialogueIndexInScene
                        });

                        if (choice.nextScene) {
                            this.currentScene = this.story.dialogues.find(scene => scene.id === choice.nextScene) || this.currentScene;
                            this.dialogueIndexInScene = choice.nextDialogue !== null ? choice.nextDialogue : 0;
                        } else {
                            this.dialogueIndexInScene++;
                        }

                        console.log('After choice:', {
                            currentScene: this.currentScene.id,
                            dialogueIndex: this.dialogueIndexInScene
                        });

                        await this.saveProgress();
                        this.showDialogue();
                    } else {
                        window.Telegram.WebApp.showAlert('Недостаточно энергии!');
                    }
                });

            const energyIcon = this.add.image(width * 0.27, 0, 'energyIcon')
                .setDisplaySize(height * 0.04, height * 0.04)
                .setOrigin(0.5);

            const energyText = this.add.text(width * 0.35, 0, `-${choice.energyCost}`, {
                fontSize: `${height * 0.0258}px`,
                color: accentColor,
                fontFamily: 'Dela Gothic One'
            }).setOrigin(0.3, 0.5);

            container.add([bg, choiceText, energyIcon, energyText]);
            this.choicesGroup.add(container);
        });
    }

    showNextDialogue() {
        this.choicesGroup.clear(true, true);
        this.dialogueIndexInScene++;
        this.saveProgress();
        this.showDialogue();
    }

    saveProgress() {
        if (!this.currentScene) {
            console.error('Cannot save progress: currentScene is null');
            return;
        }
        
        window.gameStorage.saveProgress(
            this.storyId,
            this.currentScene.id,
            this.dialogueIndexInScene,
            this.energy,
            this.stars,
            this.registry
        );
    }
    
    loadGame(data) {
        let saveData = data;
        if (!saveData || !saveData.sceneId) {
            // Если данные не переданы, загружаем из хранилища
            window.gameStorage.loadProgress(this.storyId, this.registry, (loadedData) => {
                this.currentScene = this.story.dialogues.find(
                    scene => scene.id === loadedData.sceneId
                ) || this.story.dialogues[0];
                
                this.dialogueIndexInScene = loadedData.dialogueIndex || 0;
                this.energy = loadedData.energy || 100;
                this.stars = loadedData.stars || 0;
                
                console.log('Game loaded:', loadedData);
            });
        } else {
            // Используем переданные данные
            this.currentScene = this.story.dialogues.find(
                scene => scene.id === saveData.sceneId
            ) || this.story.dialogues[0];
            
            this.dialogueIndexInScene = saveData.dialogueIndexInScene || 0;
            this.energy = saveData.energy || 100;
            this.stars = saveData.stars || 0;
        }
    }
    

    async buyEnergy(energyAmount, starCost) {
        let stars = this.stars;
        if (stars >= starCost) {
            stars -= starCost;
            this.energy += energyAmount;
            this.stars = stars;
            this.energyText.setText(this.energy);
            await this.saveProgress();
            console.log('Energy bought:', energyAmount, 'Stars spent:', starCost);
            window.Telegram.WebApp.showAlert(`Куплено ${energyAmount} энергии!`);
        } else {
            console.log('Not enough stars');
            window.Telegram.WebApp.showAlert('Недостаточно старсов!');
        }
    }

    generateInviteLink() {
        const userId = this.registry.get('userId');
        const inviteLink = `https://t.me/YourBot?start=invite_${userId}`;
        window.Telegram.WebApp.showPopup({
            title: 'Пригласить друга',
            message: `Поделитесь ссылкой: ${inviteLink}`,
            buttons: [{ type: 'share', text: 'Поделиться', url: inviteLink }]
        });
    }
}