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
        this.charBreathTween = null;
        this.isLoaded = false;
        this.isTyping = false;
        this.currentDialogueText = '';
        this.typewriterTimer = null;
        this.loadingText = null;
        this.loadingDots = 0;
        this.loadingTimer = null;
        this.bg = null;
        this.char = null;
        this.dialogueBox = null;
        this.energyBg = null;
        this.energyText = null;
        this.energyIcon = null;
        this.speakerText = null;
        this.nameline = null;
        this.dialogueText = null;
        this.nextButtonContainer = null;
        this.settingsButtonBg = null;
        this.settingsButton = null;
        this.clickSound = null;
    }

    init(data) {
        // Очистка всех ресурсов перед началом
        this.cleanup();

        this.storyId = data.storyId || 'story1';
        this.story = stories.find(s => s.id === this.storyId);

        if (!this.story) {
            console.error('Story not found:', this.storyId);
            this.scene.restart({ storyId: this.storyId });
            return;
        }

        this.loadGame(data);
    }

    cleanup() {
        // Полная очистка сцены
        this.children.each(child => child.destroy());
        if (this.tweens) this.tweens.killAll();
        if (this.time) this.time.removeAllEvents();
        if (this.sound) this.sound.stopAll();
        if (this.choicesGroup) this.choicesGroup.clear(true, true);
        if (this.load) this.load.reset(); // Используем reset вместо removeAll

        // Сбрасываем состояние переменных
        this.currentScene = null;
        this.dialogueIndexInScene = 0;
        this.currentMusic = null;
        this.energy = 100;
        this.stars = 0;
        this.isLoaded = false;
        this.isTyping = false;
        this.currentDialogueText = '';
        this.charShakeTween = null;
        this.charBreathTween = null;
        this.typewriterTimer = null;
        this.loadingTimer = null;
        this.bg = null;
        this.char = null;
        this.dialogueBox = null;
        this.energyBg = null;
        this.energyText = null;
        this.energyIcon = null;
        this.speakerText = null;
        this.nameline = null;
        this.dialogueText = null;
        this.nextButtonContainer = null;
        this.settingsButtonBg = null;
        this.settingsButton = null;
        this.clickSound = null;
    }

    preload() {
    // Создаем экран загрузки до начала загрузки ресурсов
    const width = this.scale.width;
    const height = this.scale.height;

    // Создаем прямоугольник фона для экрана загрузки
    const loadingRect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setDepth(100);
    this.loadingText = this.add.text(width / 2, height / 2, 'Загрузка ...', {
        fontSize: `${Math.min(height * 0.035, 24)}px`,
        color: '#bcff64',
        align: 'left',
        fontFamily: 'IBM Plex Sans',
        resolution: 2
        
    }).setOrigin(0.5).setDepth(101);

    // Запускаем анимацию точек при старте загрузки
    this.load.on('start', () => {
        this.loadingTimer = this.time.addEvent({
            delay: 500,
            callback: () => {
                this.loadingDots = (this.loadingDots + 1) % 4;
                const dots = '.'.repeat(this.loadingDots);
                 this.loadingText.setText(`Загрузка${dots}`); // Точки добавляются справа
            },
            callbackScope: this,
            loop: true
        });
    });

    // Обработчик завершения загрузки
    this.load.on('complete', () => {
        console.log('All assets loaded');
        this.isLoaded = true;

        // Уничтожаем элементы экрана загрузки
        if (loadingRect) loadingRect.destroy();
        if (this.loadingText) this.loadingText.destroy();
        
        if (this.loadingTimer) this.loadingTimer.remove();

        // Запускаем настройку сцены и отображение диалога
        this.setupScene();
        this.showDialogue();
    });
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
        // Устанавливаем размер игры сразу
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.refresh();

        const width = this.scale.width;
        const height = this.scale.height;

        // Устанавливаем камеру
        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.setBackgroundColor('#000000');

        // Добавляем обработчик изменения размера
        this.scale.on('resize', this.resize, this);

        // Обработка изменений видимости
        document.addEventListener('visibilitychange', () => {
            if (!this.scene.isActive()) return;
            if (document.hidden) {
                console.log('Пауза звука из-за блокировки экрана');
                this.sound.pauseAll();
            } else {
                console.log('Возобновление звука после разблокировки');
                this.sound.resumeAll();
                this.scale.refresh();
                this.resize({ width: this.scale.width, height: this.scale.height });
            }
        });

        this.game.events.on('hidden', () => {
            if (!this.scene.isActive()) return;
            console.log('Игра скрыта, пауза');
            this.sound.pauseAll();
        });

        this.game.events.on('visible', () => {
            if (!this.scene.isActive()) return;
            console.log('Игра видима, возобновление');
            this.sound.resumeAll();
            this.scale.refresh();
            this.resize({ width: this.scale.width, height: this.scale.height });
        });

        // Загрузка громкости
        try {
            this.game.sound.volume = await loadVolume(this.registry);
            console.log('GameScene: Громкость загружена', this.game.sound.volume);
        } catch (error) {
            console.error('GameScene: Не удалось загрузить громкость', error);
            this.game.sound.volume = 1.0;
        }

        // Экран загрузки
       if (this.isLoaded) {
        this.setupScene();
        this.showDialogue();
        }
    }

   

    setupScene() {
        console.log('SetupScene started');
        const width = this.scale.width;
        const height = this.scale.height;

        this.bg = this.add.image(width / 2, height / 2, 'home')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);

        this.char = this.add.image(width / 2, height, 'mia_tshirt_shy')
            .setScale(width * 0.97 / 600)
            .setOrigin(0.5, 0.97)
            .setAlpha(0)
            .setDepth(5);

        this.charBreathTween = this.tweens.add({
            targets: this.char,
            y: { from: height, to: height - 0},
            duration: 0,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            paused: true
        });

        this.energyBg = this.add.graphics()
            .setDepth(10);
        this.energyBg.fillStyle(0x000000, 0.3);
        this.energyBg.fillRoundedRect(
            width * 0.15 - (width * 0.26) / 2,
            height * 0.15 - (height * 0.04) / 2,
            width * 0.26,
            height * 0.04,
            5
        );

        this.energyText = this.add.text(width * 0.11, height * 0.135, this.energy, {
            fontSize: `${height * 0.0258}px`,
            color: '#bcff64',
            fontFamily: 'Dela Gothic One'
        }).setDepth(11);

        this.energyIcon = this.add.image(width * 0.064, height * 0.15, 'energyIcon')
            .setDisplaySize(height * 0.037, height * 0.037)
            .setDepth(11)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Energy icon clicked, show modal');
            });

        this.dialogueBox = this.add.image(width / 2, height, 'darkbg')
            .setDisplaySize(width, height * 0.7)
            .setOrigin(0.5, 1)
            .setDepth(10);

        this.speakerText = this.add.text(width * 0.05, height * 0.72, '', {
            fontSize: `${height * 0.022}px`,
            color: '#bcff64',
            fontFamily: 'Dela Gothic One',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.0)
            .setDepth(10);

        this.nameline = this.add.image(width * 0, height * 0.755, 'nameline')
            .setOrigin(0, 0.5)
            .setDepth(11)
            .setVisible(false);

        this.dialogueText = this.add.text(width * 0.05, height * 0.766, '', {
            fontSize: `${height * 0.020}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'left'
        }).setWordWrapWidth(width * 0.9)
            .setOrigin(0.0)
            .setDepth(10);

       this.nextButtonContainer = this.add.container(width / 1.1, height * 0.92).setDepth(10);
const rightArrow = this.add.image(0, 0, 'next')  // Position set to (0,0) since it's in a container
    .setDisplaySize(height * 0.032, height * 0.032)
    .setOrigin(0.5);
this.nextButtonContainer.add(rightArrow);

// Make only the arrow interactive
rightArrow.setInteractive()
    .on('pointerdown', () => {
        this.sound.play('click');
        if (this.isTyping) {
            this.isTyping = false;
            this.dialogueText.setText(this.currentDialogueText);
        } else {
            this.showNextDialogue();
        }
    });

        this.settingsButtonBg = this.add.graphics()
            .setDepth(10);
        this.settingsButtonBg.fillStyle(0x000000, 0.3);
        this.settingsButtonBg.fillRoundedRect(
            width / 1.073 - (height * 0.04) / 2,
            height * 0.15 - (height * 0.04) / 2,
            height * 0.04,
            height * 0.04,
            5
        );

        this.clickSound = this.sound.add('click');

        this.settingsButton = this.add.image(width / 1.073, height * 0.15, 'settings')
            .setDisplaySize(height * 0.032, height * 0.032)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.clickSound.play();
                console.log('Settings clicked');
                this.scene.launch('SettingsScene');
            })
            .setDepth(11);

        this.choicesGroup = this.add.group();
        console.log('SetupScene completed');
    }

    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        if (this.bg) this.bg.setPosition(width / 2, height / 2).setDisplaySize(width, height);
        if (this.char) this.char.setPosition(width / 2, height).setScale(width * 0.97 / 600);
        if (this.dialogueBox) this.dialogueBox.setPosition(width / 2, height).setDisplaySize(width, height * 0.7);
        if (this.speakerText) this.speakerText.setPosition(width * 0.05, height * 0.72).setFontSize(`${height * 0.022}px`);
        if (this.nameline) this.nameline.setPosition(width * 0, height * 0.755);
        if (this.dialogueText) this.dialogueText.setPosition(width * 0.05, height * 0.766).setFontSize(`${height * 0.020}px`).setWordWrapWidth(width * 0.8);
        if (this.nextButtonContainer) this.nextButtonContainer.setPosition(width / 1.1, height * 0.92);
        if (this.energyBg) {
            this.energyBg.clear();
            this.energyBg.fillStyle(0x000000, 0.7);
            this.energyBg.fillRoundedRect(width * 0.15 - (width * 0.26) / 2, height * 0.15 - (height * 0.04) / 2, width * 0.26, height * 0.04, 5);
        }
        if (this.energyText) this.energyText.setPosition(width * 0.11, height * 0.135).setFontSize(`${height * 0.0258}px`);
        if (this.energyIcon) this.energyIcon.setPosition(width * 0.064, height * 0.15).setDisplaySize(height * 0.037, height * 0.037);
        if (this.settingsButtonBg) {
            this.settingsButtonBg.clear();
            this.settingsButtonBg.fillStyle(0x000000, 0.7);
            this.settingsButtonBg.fillRoundedRect(width / 1.073 - (height * 0.04) / 2, height * 0.15 - (height * 0.04) / 2, height * 0.04, height * 0.04, 5);
        }
        if (this.settingsButton) this.settingsButton.setPosition(width / 1.073, height * 0.15).setDisplaySize(height * 0.032, height * 0.032);

        if (this.choicesGroup) {
            const choices = this.choicesGroup.getChildren();
            const totalHeight = choices.length * (height * 0.08);
            const startY = (height - totalHeight) / 2;
            choices.forEach((container, index) => {
                container.setPosition(width / 2, startY + index * (height * 0.08));
                const bg = container.getAt(0);
                const choiceText = container.getAt(1);
                const energyIcon = container.getAt(2);
                const energyText = container.getAt(3);
                bg.setPosition(0, 0).setSize(width, height * 0.06);
                choiceText.setPosition(-width * 0.45, 0).setFontSize(`${height * 0.0258}px`);
                energyIcon.setPosition(width * 0.27, 0).setDisplaySize(height * 0.04, height * 0.04);
                energyText.setPosition(width * 0.35, 0).setFontSize(`${height * 0.0258}px`);
            });
        }
    }

    updateScene() {
        if (!this.currentScene) return;
        const validBackgrounds = ['elevator', 'home', 'miapc', 'miaroom', 'assshot', 'loch', 'girl_with_phone', 'Home_enter', 'city_street', 'sexphoto_office', 'phone_hand', 'sexphoto_metro',
            'home_hall_box', 'metro_enter', 'metro_people', 'metro_people_station', 'mia_appart', 'miaRoom_new', 'morning_scene', 'ggroom', 'office', 'office_pc'];
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
        if (!this.scene.isActive()) return;
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
                this.dialogueText.setText('');
                this.speakerText.setText('');
                this.currentDialogueText = '';
                this.isTyping = false;
                if (this.typewriterTimer) {
                    this.typewriterTimer.remove();
                    this.typewriterTimer = null;
                }
                this.currentScene = this.story.dialogues.find(scene => scene.id === this.currentScene.nextScene) || this.currentScene;
                this.dialogueIndexInScene = 0;
                this.saveProgress();
                this.updateScene();
                this.showDialogue();
            } else {
                console.log('End of story, showing ending');
                this.showEnding();
                return;
            }
        } else {
            const dialogue = dialogues[this.dialogueIndexInScene];
            console.log('ShowDialogue - Scene:', this.currentScene.id, 'Dialogue:', dialogue);

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

            const validCharacters = ['mia_tshirt_shy', 'mia_tshirt_angry', 'mia_tshirt_happy', 'mia_tshirt_back', 'mia_skirtoffice_shy', 'mia_skirt_back', 'workguy_angry'];
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

            const width = this.scale.width;
            const height = this.scale.height;

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
        if (!this.scene.isActive()) return;
        const width = this.scale.width;
        const height = this.scale.height;
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
        if (this.bg) this.bg.setVisible(false);
        if (this.energyBg) this.energyBg.setVisible(false);
        if (this.energyText) this.energyText.setVisible(false);
        if (this.energyIcon) this.energyIcon.setVisible(false);
        if (this.settingsButtonBg) this.settingsButtonBg.setVisible(false);
        if (this.settingsButton) this.settingsButton.setVisible(false);
        if (this.nameline) this.nameline.setVisible(false);

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
            if (!this.scene.isActive()) return;
            this.sound.stopAll();
            this.scene.stop('GameScene');
            this.scene.start('MainMenu');
            console.log('GameScene: Transition to MainMenu');
        });
    }

    shutdown() {
        this.scale.off('resize', this.resize, this);
        this.game.events.off('hidden');
        this.game.events.off('visible');
        document.removeEventListener('visibilitychange');
        this.cleanup();
        console.log('GameScene: Shutdown completed');
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
        if (!this.scene.isActive()) return;
        const width = this.scale.width;
        const height = this.scale.height;
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
                    if (!this.scene.isActive()) return;
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
        if (!this.scene.isActive()) return;
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
            this.currentScene = this.story.dialogues.find(
                scene => scene.id === saveData.sceneId
            ) || this.story.dialogues[0];
            this.dialogueIndexInScene = saveData.dialogueIndexInScene || 0;
            this.energy = saveData.energy || 100;
            this.stars = saveData.stars || 0;
        }
    }

    async buyEnergy(energyAmount, starCost) {
        if (!this.scene.isActive()) return;
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
        if (!this.scene.isActive()) return;
        const userId = this.registry.get('userId');
        const inviteLink = `https://t.me/YourBot?start=invite_${userId}`;
        window.Telegram.WebApp.showPopup({
            title: 'Пригласить друга',
            message: `Поделитесь ссылкой: ${inviteLink}`,
            buttons: [{ type: 'share', text: 'Поделиться', url: inviteLink }]
        });
    }
}