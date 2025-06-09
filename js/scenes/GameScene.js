class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.story = null;
        this.currentScene = null;
        this.dialogueIndexInScene = 0;
        this.currentMusic = null;
        this.energy = 0;
        this.stars = 0;
        this.markers = { Friend: 0, Stalker: 0, Lover: 0 }; // Инициализация маркеров
        this.choicesGroup = null;
        this.charShakeTween = null;
        this.charBreathTween = null;
        this.isLoaded = false;
        this.isTyping = false;
        this.isChoicesActive = false;
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
        this.tapZone = null;
        this.settingsButtonBg = null;
        this.settingsButton = null;
        this.clickSound = null;
        this.minigameResults = {};
    }

    init(data) {
        console.log('GameScene init:', data);
        if (this.sound) {
            this.sound.stopAll();
            console.log('All sounds stopped in GameScene init');
        }
        this.storyId = data?.storyId || 'story1';
        this.story = stories.find(s => s.id === this.storyId);
        if (!this.story) {
            console.error('Story not found:', this.storyId);
            this.scene.restart({ storyId: this.storyId });
            return;
        }
        this.minigameId = data?.minigameId || null;
        this.success = data?.success ?? null;
        this.successSceneId = data?.successSceneId || null;
        this.failSceneId = data?.failSceneId || null;
        this.loadGame(data);
    }

    cleanup() {
        if (this.tweens) this.tweens.killAll();
        if (this.time) this.time.removeAllEvents();
        if (this.sound) this.sound.stopAll();
        const safeDestroy = (obj) => {
            if (obj && typeof obj.destroy === 'function') {
                try {
                    obj.destroy();
                } catch (e) {
                    console.error('Error destroying object:', e);
                }
            }
        };
        safeDestroy(this.choicesGroup);
        safeDestroy(this.charShakeTween);
        safeDestroy(this.charBreathTween);
        safeDestroy(this.typewriterTimer);
        safeDestroy(this.loadingTimer);
        safeDestroy(this.bg);
        safeDestroy(this.char);
        safeDestroy(this.dialogueBox);
        safeDestroy(this.energyBg);
        safeDestroy(this.energyText);
        safeDestroy(this.energyIcon);
        safeDestroy(this.speakerText);
        safeDestroy(this.nameline);
        safeDestroy(this.dialogueText);
        safeDestroy(this.tapZone);
        safeDestroy(this.settingsButtonBg);
        safeDestroy(this.settingsButton);
        this.currentScene = null;
        this.dialogueIndexInScene = 0;
        this.currentMusic = null;
        this.isLoaded = false;
        this.isTyping = false;
        this.isChoicesActive = false;
        this.currentDialogueText = '';
        this.choicesGroup = null;
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
        this.tapZone = null;
        this.settingsButtonBg = null;
        this.settingsButton = null;
        this.clickSound = null;
    }

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;
        const loadingRect = this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setDepth(100);
        this.loadingText = this.add.text(width / 2, height / 2, 'Загрузка ...', {
            fontSize: `${Math.min(height * 0.035, 24)}px`,
            color: '#57b9ff',
            align: 'left',
            fontFamily: 'IBM Plex Sans',
            resolution: 1
        }).setOrigin(0.5).setDepth(101);

        this.load.on('start', () => {
            this.loadingTimer = this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.loadingDots = (this.loadingDots + 1) % 4;
                    const dots = '.'.repeat(this.loadingDots);
                    this.loadingText.setText(`Загрузка${dots}`);
                },
                callbackScope: this,
                loop: true
            });
        });

        this.load.on('complete', () => {
            console.log('All assets loaded');
            this.isLoaded = true;
            if (loadingRect) loadingRect.destroy();
            if (this.loadingText) this.loadingText.destroy();
            if (this.loadingTimer) this.loadingTimer.remove();
            this.setupScene();
            this.showDialogue();
        });

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

        this.load.image('mia_tshirt_shy', 'assets/story1/images/characters/mia_tshirt_shy.png');
        this.load.image('mia_tshirt_angry', 'assets/story1/images/characters/mia_tshirt_angry.png');
        this.load.image('mia_tshirt_happy', 'assets/story1/images/characters/mia_tshirt_happy.png');
        this.load.image('mia_tshirt_back', 'assets/story1/images/characters/mia_tshirt_back.png');
        this.load.image('mia_skirtoffice_shy', 'assets/story1/images/characters/mia_skirtoffice_shy.png');
        this.load.image('mia_skirt_back', 'assets/story1/images/characters/mia_skirt_back.png');
        this.load.image('Workguy_chill', 'assets/story1/images/characters/Workguy_chill.png');
        this.load.image('workguy_angry', 'assets/story1/images/characters/workguy_angry.png');

        this.load.image('energyIcon', 'assets/common/images/energyIcon.png');
        this.load.image('settings', 'assets/common/images/settings.png');
        this.load.image('darkbg', 'assets/common/images/darkbg.png');
        this.load.image('chose_block', 'assets/story1/images/backgrounds/chose_block.png');
        this.load.image('free_chose_block', 'assets/story1/images/backgrounds/free_chose_block.png');
        this.load.image('love', 'assets/common/images/love.png');
        this.load.image('friend', 'assets/common/images/friend.png');
        this.load.image('stalker', 'assets/common/images/stalker.png');
        this.load.image('nameline', 'assets/common/images/nameline.png');

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
    }

    async create() {
        console.log('GameScene create: Starting, Initial registry energy:', this.registry.get('energy'));
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.refresh();

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.setBackgroundColor('#000000');

        this.scale.on('resize', this.resize, this);

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

        try {
            this.game.sound.volume = await loadVolume(this.registry);
            console.log('GameScene: Громкость загружена', this.game.sound.volume);
        } catch (error) {
            console.error('GameScene: Не удалось загрузить громкость', error);
            this.game.sound.volume = 1.0;
        }

        await new Promise((resolve) => {
            window.gameStorage.loadProgress(this.storyId, this.registry, (progress) => {
                this.energy = progress.energy || 0;
                this.markers = progress.markers || { Friend: 0, Stalker: 0, Lover: 0 }; // Загружаем маркеры
                this.registry.set('energy', this.energy);
                console.log('GameScene create: Loaded energy and markers from progress:', this.energy, this.markers);
                resolve();
            });
        });

        this.registry.events.on('changedata-energy', (parent, value) => {
            this.energy = value;
            if (this.energyText) {
                this.energyText.setText(`${this.energy}`);
            }
            console.log('GameScene: Energy updated via changedata-energy:', value, 'Registry energy:', this.registry.get('energy'));
            this.saveProgress();
        });

        this.scene.get('EnergyShopScene').events.on('shutdown', async () => {
            console.log('EnergyShopScene closed, resuming GameScene');
            this.scene.resume();
            if (this.energyIcon) {
                this.energyIcon.setInteractive();
            }
            await new Promise((resolve) => {
                window.gameStorage.loadProgress(this.storyId, this.registry, (progress) => {
                    this.energy = progress.energy || 0;
                    this.markers = progress.markers || { Friend: 0, Stalker: 0, Lover: 0 }; // Загружаем маркеры
                    this.registry.set('energy', this.energy);
                    if (this.energyText) {
                        this.energyText.setText(`${this.energy}`);
                    }
                    console.log('GameScene: Energy and markers after EnergyShopScene shutdown:', this.energy, this.markers);
                    resolve();
                });
            });
        });

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
            .setOrigin(0.38, 1)
            .setAlpha(0)
            .setDepth(5);

        this.charBreathTween = this.tweens.add({
            targets: this.char,
            y: { from: height, to: height - 0 },
            duration: 0,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            paused: true
        });

        const bgWidth = width * 0.26;
        const bgHeight = height * 0.04;
        const borderRadius = 5;
        const centerX = width / 6.4;
        const centerY = height * 0.15;

        this.energyBg = this.add.graphics()
            .setDepth(10);
        this.energyBg.fillStyle(0x000000, 0.3);
        this.energyBg.fillRoundedRect(
            centerX - bgWidth / 2,
            centerY - bgHeight / 2,
            bgWidth,
            bgHeight,
            borderRadius
        );

        if (this.energyText) {
            this.energyText.destroy();
        }

        this.energyText = this.add.text(centerX + bgWidth * 0.15, centerY, `${this.registry.get('energy')}`, {
            fontSize: `${height * 0.0258}px`,
            color: '#57b9ff',
            fontFamily: 'Dela Gothic One',
        }).setOrigin(0.5).setDepth(31);

        this.energyIcon = this.add.image(centerX - bgWidth * 0.35, centerY, 'energyIcon')
            .setDisplaySize(height * 0.037, height * 0.037)
            .setDepth(11)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play('click');
                console.log('Energy icon clicked, launching EnergyShopScene');
                this.scene.pause();
                this.scene.launch('EnergyShopScene');
            });

        this.dialogueBox = this.add.image(width / 2, height, 'darkbg')
            .setDisplaySize(width, height * 0.5)
            .setOrigin(0.5, 1.23)
            .setDepth(5);

        this.speakerText = this.add.text(width * 0.05, height * 0.52, '', {
            fontSize: `${height * 0.022}px`,
            color: '#57b9ff',
            fontFamily: 'Dela Gothic One',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.0)
            .setDepth(10);

        this.nameline = this.add.image(width * 0, height * 0.555, 'nameline')
            .setOrigin(0, 0.5)
            .setDepth(11)
            .setVisible(false);

        this.dialogueText = this.add.text(width * 0.05, height * 0.566, '', {
            fontSize: `${height * 0.020}px`,
            color: '#fff',
            fontFamily: 'IBM Plex Sans',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'left'
        }).setWordWrapWidth(width * 0.9)
            .setOrigin(0.0)
            .setDepth(10);

        this.tapZone = this.add.rectangle(width / 2, height * 0.9, width, height * 0.2)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.isChoicesActive) return;
                this.sound.play('click');
                if (this.isTyping) {
                    this.isTyping = false;
                    this.dialogueText.setText(this.currentDialogueText);
                    if (this.typewriterTimer) {
                        this.typewriterTimer.remove();
                        this.typewriterTimer = null;
                    }
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
        if (this.dialogueBox) this.dialogueBox.setPosition(width / 2, height).setDisplaySize(width, height * 0.5);
        if (this.speakerText) this.speakerText.setPosition(width * 0.05, height * 0.52).setFontSize(`${height * 0.022}px`);
        if (this.nameline) this.nameline.setPosition(width * 0, height * 0.555);
        if (this.dialogueText) this.dialogueText.setPosition(width * 0.05, height * 0.566).setFontSize(`${height * 0.020}px`).setWordWrapWidth(width * 0.9);
        if (this.tapZone) {
            this.tapZone.setPosition(width / 2, height * 0.9);
            this.tapZone.setSize(width, height * 0.2);
        }

        const bgWidth = width * 0.26;
        const bgHeight = height * 0.04;
        const centerX = width / 6.4;
        const centerY = height * 0.15;

        if (this.energyBg) {
            this.energyBg.clear();
            this.energyBg.fillStyle(0x000000, 0.3);
            this.energyBg.fillRoundedRect(
                centerX - bgWidth / 2,
                centerY - bgHeight / 2,
                bgWidth,
                bgHeight,
                5
            );
        }
        if (this.energyText) this.energyText.setPosition(centerX + bgWidth * 0.15, centerY).setFontSize(`${height * 0.0258}px`);
        if (this.energyIcon) this.energyIcon.setPosition(centerX - bgWidth * 0.35, centerY).setDisplaySize(height * 0.037, height * 0.037);

        if (this.settingsButtonBg) {
            this.settingsButtonBg.clear();
            this.settingsButtonBg.fillStyle(0x000000, 0.3);
            this.settingsButtonBg.fillRoundedRect(
                width / 1.073 - (height * 0.04) / 2,
                height * 0.15 - (height * 0.04) / 2,
                height * 0.04,
                height * 0.04,
                5
            );
        }
        if (this.settingsButton) this.settingsButton.setPosition(width / 1.073, height * 0.15).setDisplaySize(height * 0.032, height * 0.032);

        if (this.choicesGroup) {
            const choices = this.choicesGroup.getChildren();
            const totalHeight = choices.length * (height * 0.08);
            const startY = (height - totalHeight) / 1.17;
            choices.forEach((container, index) => {
                container.setPosition(width / 2, startY + index * (height * 0.08));
                const bg = container.getAt(0);
                const choiceText = container.getAt(1);
                const markerIcon = container.getAt(2);
                const energyIcon = container.getAt(3);
                const energyText = container.getAt(4);
                bg.setPosition(0, 0).setDisplaySize(width, height * 0.06);
                choiceText.setPosition(markerIcon ? -width * 0.40 : -width * 0.45, 0)
                    .setFontSize(`${height * 0.02}px`)
                    .setOrigin(0, 0.5);
                if (markerIcon) {
                    markerIcon.setPosition(-width * 0.45, 0)
                        .setDisplaySize(height * 0.04, height * 0.04)
                        .setOrigin(0.5);
                }
                if (energyIcon) {
                    energyIcon.setPosition(width * 0.4, 0)
                        .setDisplaySize(height * 0.04, height * 0.04)
                        .setOrigin(0.55);
                }
                if (energyText) {
                    energyText.setPosition(width * 0.35, 0)
                        .setFontSize(`${height * 0.0258}px`)
                        .setOrigin(1, 0.5);
                }
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
            this.handleNextScene();
        } else {
            const dialogue = dialogues[this.dialogueIndexInScene];
            console.log('ShowDialogue - Scene:', this.currentScene.id, 'Dialogue:', dialogue);

            this.currentDialogueText = '';
            this.dialogueText.setText('');
            this.speakerText.setText('');
            this.isTyping = false;
            this.isChoicesActive = false;
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
                this.tapZone.setVisible(true);
                this.tapZone.setInteractive();
            } else {
                this.dialogueBox.setVisible(false);
                this.speakerText.setVisible(false).setText('');
                this.nameline.setVisible(false);
                this.dialogueText.setVisible(false).setText('');
                this.tapZone.setVisible(true);
                this.tapZone.setInteractive();
            }

            if (dialogue.choices) {
                this.showChoices(dialogue.choices);
            }

            if (!dialogue.choices) {
                this.saveProgress();
            }

            if (this.energyIcon) {
                this.energyIcon.setInteractive();
            }

            if (dialogue.unlockArt) {
                window.gameStorage.unlockArt(this.storyId, dialogue.unlockArt, this.registry);
            }
        }
    }

    async showEnding() {
        if (!this.scene.isActive()) return;
        const width = this.scale.width;
        const height = this.scale.height;
        const textColor = '#ffffff';

        this.registry.set('energy', this.energy);
        await this.saveProgress();

        this.dialogueBox.setVisible(false);
        this.speakerText.setVisible(false).setText('');
        this.dialogueText.setVisible(false).setText('');
        this.tapZone.setVisible(false);
        this.choicesGroup.clear(true, true);
        this.isChoicesActive = false;
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
            this.sound.destroy();
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
        this.registry.events.off('changedata-energy');
        if (this.scene.get('EnergyShopScene')) {
            this.scene.get('EnergyShopScene').events.off('shutdown');
        }
        if (this.tweens) this.tweens.killAll();
        if (this.time) this.time.removeAllEvents();
        if (this.sound) this.sound.stop();
        this.isChoicesActive = false;
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
        this.choicesGroup.clear(true, true);
        this.isChoicesActive = true;

        // Ограничиваем до 3 выборов
        const limitedChoices = choices.slice(0, 3);
        const totalHeight = limitedChoices.length * (height * 0.08);
        const startY = (height - totalHeight) / 1.01;

        limitedChoices.forEach((choice, index) => {
            const y = startY + index * (height * 0.07);
            const container = this.add.container(width / 2, y).setDepth(5);

            // Используем free_chose_block для бесплатных выборов
            const bgKey = choice.isFree ? 'free_chose_block' : 'chose_block';
            const bg = this.add.image(0, 0, bgKey)
                .setDisplaySize(width, height * 0.06)
                .setOrigin(0.5, 0.5);

            // Иконка маркера
            let markerIcon = null;
            if (choice.marker) {
                const markerIcons = {
                    Friend: 'friend',
                    Stalker: 'stalker',
                    Lover: 'love'
                };
                markerIcon = this.add.image(-width * 0.45, 0, markerIcons[choice.marker])
                    .setDisplaySize(height * 0.04, height * 0.04)
                    .setOrigin(0.5);
            }

            // Текст выбора
            const textX = markerIcon ? -width * 0.40 : -width * 0.45;
            const choiceText = this.add.text(textX, 0, choice.text, {
                fontSize: `${height * 0.02}px`,
                color: '#fff',
                fontFamily: 'IBM Plex Sans',
                padding: { x: 0, y: 5 }
            }).setOrigin(0, 0.5)
                .setInteractive()
                .on('pointerdown', async () => {
                    if (!this.scene.isActive()) return;
                    if (choice.isFree || this.energy >= choice.energyCost) {
                        if (!choice.isFree) {
                            this.energy -= choice.energyCost;
                            this.energyText.setText(`${this.energy}`);
                            this.registry.set('energy', this.energy);
                        }

                        if (choice.marker && choice.points) {
                            this.markers[choice.marker] = (this.markers[choice.marker] || 0) + choice.points;
                            console.log(`Начислено ${choice.points} очков для ${choice.marker}: ${this.markers[choice.marker]}`);
                        }

                        this.choicesGroup.clear(true, true);
                        this.isChoicesActive = false;
                        this.sound.play('click');

                        console.log('Before choice:', {
                            currentScene: this.currentScene.id,
                            dialogueIndex: this.dialogueIndexInScene,
                            markers: this.markers
                        });

                        if (choice.nextScene) {
                            if (typeof choice.nextScene === 'object' && choice.nextScene.type === 'minigame') {
                                const params = { ...choice.nextScene.params, energy: this.energy };
                                this.scene.start(choice.nextScene.key, params);
                            } else {
                                this.currentScene = this.story.dialogues.find(scene => scene.id === choice.nextScene) || this.currentScene;
                                this.dialogueIndexInScene = choice.nextDialogue || 0;
                                await this.saveProgress();
                                this.showDialogue();
                            }
                        } else {
                            this.dialogueIndexInScene++;
                            await this.saveProgress();
                            this.showDialogue();
                        }

                        console.log('After choice:', {
                            currentScene: this.currentScene.id,
                            dialogueIndex: this.dialogueIndexInScene,
                            markers: this.markers
                        });

                        if (this.energyIcon) {
                            this.energyIcon.setInteractive();
                            this.energyIcon.setDepth(11);
                        }
                    } else {
                        window.Telegram.WebApp.showAlert('Недостаточно энергии!');
                    }
                });

            // Энергия (только для платных)
            let energyIcon = null;
            let energyText = null;
            if (!choice.isFree && choice.energyCost > 0) {
                energyIcon = this.add.image(width * 0.4, 0, 'energyIcon')
                    .setDisplaySize(height * 0.04, height * 0.04)
                    .setOrigin(0.55);
                energyText = this.add.text(width * 0.35, 0, `-${choice.energyCost}`, {
                    fontSize: `${height * 0.0258}px`,
                    color: '#57b9ff',
                    fontFamily: 'Dela Gothic One',
                    align: 'right'
                }).setOrigin(1, 0.5);
            }

            const containerItems = [bg, choiceText];
            if (markerIcon) containerItems.push(markerIcon);
            if (energyIcon) containerItems.push(energyIcon);
            if (energyText) containerItems.push(energyText);
            container.add(containerItems);
            this.choicesGroup.add(container);
        });

        if (this.tapZone) {
            this.tapZone.setVisible(false);
        }

        if (this.energyIcon) {
            this.energyIcon.setDepth(11);
            this.energyIcon.setInteractive();
        }
    }

    showNextDialogue() {
        if (!this.scene.isActive()) return;
        this.choicesGroup.clear(true, true);
        this.isChoicesActive = false;
        this.dialogueIndexInScene++;
        this.saveProgress();
        this.showDialogue();

        if (this.energyIcon) {
            this.energyIcon.setInteractive();
            this.energyIcon.setDepth(11);
        }
    }

    handleNextScene() {
        if (!this.currentScene.nextScene && !this.currentScene.conditionalNextScenes) {
            console.log('End of story, showing ending');
            this.showEnding();
            return;
        }

        if (this.currentScene.conditionalNextScenes) {
            // Проверяем условия для перехода
            let nextSceneId = null;
            for (const condition of this.currentScene.conditionalNextScenes) {
                if (this.markers[condition.marker] >= condition.points) {
                    nextSceneId = condition.nextScene;
                    break;
                }
            }
            // Если ни одно условие не выполнено, используем defaultScene или обычный nextScene
            nextSceneId = nextSceneId || this.currentScene.defaultScene || this.currentScene.nextScene || this.currentScene.id;
            this.currentScene = this.story.dialogues.find(scene => scene.id === nextSceneId) || this.currentScene;
            this.dialogueIndexInScene = 0;
            this.saveProgress();
            this.updateScene();
            this.showDialogue();
        } else if (typeof this.currentScene.nextScene === 'object' && this.currentScene.nextScene.type === 'minigame') {
            const params = { ...this.currentScene.nextScene.params };
            console.log('Starting minigame:', this.currentScene.nextScene.key);
            this.scene.start(this.currentScene.nextScene.key, params);
        } else {
            this.currentScene = this.story.dialogues.find(scene => scene.id === this.currentScene.nextScene) || this.currentScene;
            this.dialogueIndexInScene = 0;
            this.saveProgress();
            this.updateScene();
            this.showDialogue();
        }
    }

    async saveProgress() {
        if (!this.currentScene) {
            console.error('Cannot save progress: currentScene is null');
            return;
        }

        try {
            await window.gameStorage.saveProgress(
                this.storyId,
                this.currentScene.id,
                this.dialogueIndexInScene,
                this.energy,
                this.stars,
                this.registry,
                {
                    minigameResults: this.minigameResults,
                    markers: this.markers
                }
            );
            console.log('Progress saved:', {
                storyId: this.storyId,
                sceneId: this.currentScene.id,
                dialogueIndex: this.dialogueIndexInScene,
                energy: this.energy,
                markers: this.markers
            });
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    loadGame(data) {
        console.log('GameScene: Loading game with data:', data);

        this.currentScene = this.story.dialogues.find(
            scene => scene.id === (data?.sceneId || 'scene1')
        ) || this.story.dialogues[0];
        this.dialogueIndexInScene = data?.dialogueIndexInScene || 0;
        this.stars = data?.stars || 0;
        this.minigameResults = data?.minigameResults || {};
        this.markers = data?.markers || { Friend: 0, Stalker: 0, Lover: 0 }; // Загружаем маркеры

        this.energy = this.registry.get('energy') || 0;
        console.log('GameScene loadGame: Energy from registry:', this.energy, 'Markers:', this.markers);
        if (this.energyText) {
            this.energyText.setText(`${this.energy}`);
        }

        if (data?.success !== undefined && data.minigameId) {
            const nextSceneId = data.success ? data.successSceneId : data.failSceneId;
            this.currentScene = this.story.dialogues.find(scene => scene.id === nextSceneId) || this.currentScene;
            this.dialogueIndexInScene = 0;
            this.minigameResults[data.minigameId] = data.success;
            this.saveProgress();
        }
    }

    generateInviteLink() {
        if (!this.scene.isActive()) return;
        const userId = window.gameStorage.get('userId');
        const inviteLink = `https://t.me/YourBot?start=invite_${userId}`;
        window.TelegramGameBotWebApp.showModal({
            title: 'Пригласить друга',
            message: `Поделиться ссылкой: ${inviteLink}`,
            buttons: [{ type: 'share', text: 'Поделиться', url: inviteLink }]
        });
    }
}