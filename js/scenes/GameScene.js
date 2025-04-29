class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.story = null;
        this.currentScene = null;
        this.dialogueIndexInScene = 0;
        this.currentMusic = null;
        this.energy = 100;
        this.choicesGroup = null;
        this.charShakeTween = null;
        this.isLoaded = false;
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
    
        // Загружаем прогресс
        this.loadGame();
    }

    preload() {
        this.load.image('elevator', 'assets/story1/images/backgrounds/elevator.jpg');
        this.load.image('home', 'assets/story1/images/backgrounds/home.jpg');
        this.load.image('miapc', 'assets/story1/images/backgrounds/miaPC.jpg');
        this.load.image('miaroom', 'assets/story1/images/backgrounds/miaRoom.jpg');
        this.load.image('assshot', 'assets/story1/images/backgrounds/assshot.jpg');
        this.load.image('loch', 'assets/story1/images/backgrounds/loch.jpg');

        this.load.image('mia_tshirt_shy', 'assets/story1/images/characters/mia_tshirt_shy.png');
        this.load.image('mia_tshirt_angry', 'assets/story1/images/characters/mia_tshirt_angry.png');
        this.load.image('mia_tshirt_happy', 'assets/story1/images/characters/mia_tshirt_happy.png');
        this.load.image('mia_tshirt_back', 'assets/story1/images/characters/mia_tshirt_back.png');
        this.load.image('mia_skirtoffice_shy', 'assets/story1/images/characters/mia_skirtoffice_shy.png');
        this.load.image('mia_skirt_back', 'assets/story1/images/characters/mia_skirt_back.png');

        this.load.image('energyIcon', 'assets/common/images/energyIcon.png');
        this.load.image('settings', 'assets/common/images/settings.png');
        this.load.image('next', 'assets/common/images/next.png');

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

    create() {
        // Устанавливаем размер игры
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.scale.mode = Phaser.Scale.RESIZE;
        this.scale.autoCenter = Phaser.Scale.CENTER_BOTH;

        // Настраиваем камеру
        this.cameras.main.setViewport(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height);

        // Логируем размер
        console.log('Scene size:', this.cameras.main.width, this.cameras.main.height);
        console.log('Camera:', this.cameras.main);

        // Фон по умолчанию
        this.cameras.main.setBackgroundColor('#000000');

        // Экран загрузки
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setDepth(100);
        this.add.text(width / 2, height / 2, 'Loading...', {
            fontSize: `${height * 0.035}px`,
            color: '#ffffff',
            fontFamily: 'IBM Plex Sans'
        }).setOrigin(0.5).setDepth(101);

        // Обработка загрузки
        console.log('Load started');
        if (this.isLoaded) {
            this.children.removeAll();
            this.setupScene();
            console.log('Create completed');
        } else {
            this.load.once('complete', () => {
                this.children.removeAll();
                this.setupScene();
                console.log('Create completed');
            });
            this.load.start();
        }

        // Регистрируем обработчик resize
        this.scale.on('resize', this.resize, this);
    }

    resize(size) {
        const width = size.width || this.game.config.width;
        const height = size.height || this.game.config.height;
        console.log('Resize - Scene size:', width, height);

        // Обновляем камеру
        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        // Обновляем фон
        if (this.bg) {
            this.bg.setPosition(width / 2, height / 2)
                .setDisplaySize(width, height)
                .setOrigin(0.5);
            console.log('Background size:', this.bg.displayWidth, this.bg.displayHeight);
        }

        // Обновляем персонажа
        if (this.char) {
            this.char.setPosition(width / 2, height)
                .setScale(width * 0.79 / 600); // Уменьшен масштаб для синхронизации с MainMenu
        }

        // Обновляем UI энергии
        if (this.energyRect) {
            this.energyRect.setPosition(width * 0.1, height * 0.1)
                .setSize(width * 0.25, height * 0.04);
        }
        if (this.energyText) {
            this.energyText.setPosition(width * 0.11, height * 0.083)
                .setFontSize(height * 0.0258);
        }
        if (this.energyIcon) {
            this.energyIcon.setPosition(width * 0.05, height * 0.1)
                .setDisplaySize(height * 0.04, height * 0.04);
        }

        // Обновляем UI диалогов
        if (this.dialogueBox) {
            this.dialogueBox.setPosition(width / 2, height * 0.83)
                .setSize(width, height * 0.35);
        }
        if (this.speakerText) {
            this.speakerText.setPosition(width * 0.07, height * 0.72)
                .setFontSize(height * 0.027);
        }
        if (this.dialogueText) {
            this.dialogueText.setPosition(width * 0.07, height * 0.76)
                .setFontSize(height * 0.024)
                .setWordWrapWidth(width * 0.8);
        }

        // Обновляем кнопку "Далее"
        if (this.nextButton) {
            this.nextButton.setPosition(width * 0.92, height * 0.91)
                .setDisplaySize(height * 0.06, height * 0.06);
        }

        // Обновляем кнопку настроек
        if (this.settingsButtonBg) {
            this.settingsButtonBg.setPosition(width / 1.1, height * 0.1)
                .setSize(width * 0.15, height * 0.04);
        }
        if (this.settingsButton) {
            this.settingsButton.setPosition(width / 1.1, height * 0.1)
                .setDisplaySize(height * 0.032, height * 0.032);
        }

        // Обновляем выборы
        this.choicesGroup.getChildren().forEach((container, index) => {
            const y = (height - (this.choicesGroup.getChildren().length * (height * 0.08))) / 2 + index * (height * 0.08);
            container.setPosition(width / 2, y);
            container.getAll().forEach(child => {
                if (child.type === 'Text') {
                    child.setFontSize(height * 0.0258);
                    if (child.text.startsWith('-')) {
                        child.setPosition(width * 0.35, 0);
                    } else {
                        child.setPosition(-width * 0.45, 0);
                    }
                } else if (child.type === 'Image' && child.texture.key === 'energyIcon') {
                    child.setPosition(width * 0.27, 0)
                        .setDisplaySize(height * 0.03, height * 0.03);
                } else if (child.type === 'Rectangle') {
                    child.setSize(width, height * 0.06);
                }
            });
        });
    }

    setupScene() {
        console.log('SetupScene started');
        const width = this.game.config.width;
        const height = this.game.config.height;

        this.bg = this.add.image(width / 2, height / 2, 'home')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);
        console.log('Background size:', this.bg.displayWidth, this.bg.displayHeight);

        this.char = this.add.image(width / 2, height, 'mia_tshirt_shy')
            .setScale(width * 0.79 / 600)
            .setOrigin(0.5, 1)
            .setAlpha(0)
            .setDepth(5);

        this.energyRect = this.add.rectangle(width * 0.1, height * 0.1, width * 0.25, height * 0.04, 0x000000, 0.5)
            .setDepth(10);
        this.energyText = this.add.text(width * 0.11, height * 0.083, this.energy, {
            fontSize: `${height * 0.0258}px`,
            color: '#61bdff',
            fontFamily: 'Dela Gothic One'
        }).setDepth(10);
        this.energyIcon = this.add.image(width * 0.05, height * 0.1, 'energyIcon')
            .setDisplaySize(height * 0.04, height * 0.04)
            .setDepth(10);

        this.dialogueBox = this.add.rectangle(width / 2, height * 0.83, width, height * 0.35, 0x000000, 0.7)
            .setOrigin(0.5)
            .setDepth(10);
        this.speakerText = this.add.text(width * 0.07, height * 0.72, '', {
            fontSize: `${height * 0.027}px`,
            color: '#61bdff',
            fontFamily: 'Dela Gothic One'
        }).setDepth(10);
        this.dialogueText = this.add.text(width * 0.07, height * 0.76, '', {
            fontSize: `${height * 0.024}px`,
            color: '#ffffff',
            fontFamily: 'IBM Plex Sans'
        }).setWordWrapWidth(width * 0.8)
            .setDepth(10);

        this.nextButton = this.add.image(width * 0.92, height * 0.91, 'next')
            .setDisplaySize(height * 0.06, height * 0.06)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.showNextDialogue())
            .setDepth(10);

        this.settingsButtonBg = this.add.rectangle(width / 1.1, height * 0.1, width * 0.15, height * 0.04, 0x000000, 0)
            .setOrigin(0.5)
            .setDepth(10);
        this.settingsButton = this.add.image(width / 1.1, height * 0.1, 'settings')
            .setDisplaySize(height * 0.032, height * 0.032)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Settings clicked');
                this.scene.launch('SettingsScene');
            })
            .setDepth(10);

        this.choicesGroup = this.add.group();

        console.log('ShowDialogue called');
        this.showDialogue();
        console.log('SetupScene completed');
    }

    updateScene() {
        const validBackgrounds = ['elevator', 'home', 'miapc', 'miaroom', 'assshot', 'loch'];
        const bgKey = validBackgrounds.includes(this.currentScene.bg) ? this.currentScene.bg : 'home';
        console.log('Setting background to:', bgKey);
        this.bg.setTexture(bgKey);

        if (this.currentScene.music !== this.currentMusic) {
            if (this.currentMusic) {
                this.sound.stopByKey(this.currentMusic);
                console.log('Stopped music:', this.currentMusic);
            }
            if (this.currentScene.music) {
                const music = this.sound.add(this.currentScene.music, { loop: true });
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
            return;
        }

        const dialogues = this.currentScene.dialogues;

        if (this.dialogueIndexInScene >= dialogues.length) {
            if (this.currentScene.nextScene) {
                console.log(`Transition to nextScene: ${this.currentScene.nextScene}`);
                this.currentScene = this.story.dialogues.find(scene => scene.id === this.currentScene.nextScene) || this.currentScene;
                this.dialogueIndexInScene = 0;
                this.saveProgress(); // Сохраняем при переходе на новую сцену
                this.updateScene();
            } else {
                console.log('End of story, returning to MainMenu');
                this.sound.stopAll();
                this.scene.start('MainMenu');
                return;
            }
        }

        const dialogue = dialogues[this.dialogueIndexInScene];
        console.log('ShowDialogue - Scene:', this.currentScene.id, 'Dialogue:', dialogue);

        this.choicesGroup.clear(true, true);
        console.log('Choices cleared');

        this.updateScene();

        if (dialogue.sfx) {
            try {
                const sfx = this.sound.add(dialogue.sfx);
                sfx.play();
                console.log('Playing SFX:', dialogue.sfx);
            } catch (error) {
                console.error('Failed to play SFX:', dialogue.sfx, error);
            }
        }

        const validCharacters = ['mia_tshirt_shy', 'mia_tshirt_angry', 'mia_tshirt_happy', 'mia_tshirt_back', 'mia_skirtoffice_shy', 'mia_skirt_back'];
        if (dialogue.charSprite && validCharacters.includes(dialogue.charSprite)) {
            this.char.setTexture(dialogue.charSprite).setAlpha(1);
        } else {
            this.char.setAlpha(0);
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
            this.speakerText.setVisible(true).setText(dialogue.speaker || '');
            this.dialogueText.setVisible(true).setText(dialogue.text || '');
            this.nextButton.setVisible(true);
            console.log('Dialogue UI visible:', this.dialogueBox.visible, 'Text set:', dialogue.text);
            console.log('UI positions:', this.dialogueText.x, this.dialogueText.y, this.dialogueText.text);
        } else {
            this.dialogueBox.setVisible(false);
            this.speakerText.setVisible(false).setText('');
            this.dialogueText.setVisible(false).setText('');
            this.nextButton.setVisible(true);
            console.log('Dialogue UI hidden');
        }

        if (dialogue.choices) {
            this.showChoices(dialogue.choices);
            this.nextButton.setVisible(false);
        }

        // Автосохранение прогресса
        this.saveProgress();
    }

    showChoices(choices) {
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.choicesGroup.clear(true, true);
        console.log('Choices cleared');

        const totalHeight = choices.length * (height * 0.08);
        const startY = (height - totalHeight) / 2;

        choices.forEach((choice, index) => {
            const y = startY + index * (height * 0.08);
            const container = this.add.container(width / 2, y).setDepth(10);

            const bg = this.add.rectangle(0, 0, width, height * 0.06, 0x000000, 0.7)
                .setOrigin(0.5);

            const choiceText = this.add.text(-width * 0.45, 0, choice.text, {
                fontSize: `${height * 0.0258}px`,
                color: '#ffffff',
                fontFamily: 'IBM Plex Sans',
                padding: { x: 10, y: 5 }
            }).setOrigin(0, 0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    if (this.energy >= choice.energyCost) {
                        this.energy -= choice.energyCost;
                        this.energyText.setText(this.energy);
                        this.choicesGroup.clear(true, true);
                        console.log('Choices cleared');

                        if (choice.nextScene) {
                            this.currentScene = this.story.dialogues.find(scene => scene.id === choice.nextScene) || this.currentScene;
                            this.dialogueIndexInScene = choice.nextDialogue || 0;
                        } else {
                            this.dialogueIndexInScene++;
                        }

                        this.saveProgress();
                        this.showDialogue();
                    } else {
                        console.log('Not enough energy');
                    }
                });

            const energyIcon = this.add.image(width * 0.27, 0, 'energyIcon')
                .setDisplaySize(height * 0.03, height * 0.03)
                .setOrigin(0.5);

            const energyText = this.add.text(width * 0.35, 0, `-${choice.energyCost}`, {
                fontSize: `${height * 0.0258}px`,
                color: '#61bdff',
                fontFamily: 'Dela Gothic One'
            }).setOrigin(0.3, 0.5);

            container.add([bg, choiceText, energyIcon, energyText]);
            this.choicesGroup.add(container);
        });
        console.log('ShowChoices:', choices, 'Choices visible:', this.choicesGroup.getChildren().length);
    }

    showNextDialogue() {
        this.choicesGroup.clear(true, true);
        console.log('Choices cleared');
        this.dialogueIndexInScene++;
        this.saveProgress();
        this.showDialogue();
    }

    saveProgress() {
        const saveData = {
            storyId: this.storyId,
            sceneId: this.currentScene.id,
            dialogueIndexInScene: this.dialogueIndexInScene,
            energy: this.energy,
            timestamp: Date.now()
        };
        localStorage.setItem(`save_${this.storyId}`, JSON.stringify(saveData));
        if (window.Telegram?.WebApp?.CloudStorage) {
            window.Telegram.WebApp.CloudStorage.setItem(`save_${this.storyId}`, JSON.stringify(saveData));
        }
        console.log('Progress saved:', saveData);
    }

    loadGame() {
        const saveData = loadProgress(this.storyId);
        this.currentScene = this.story.dialogues.find(scene => scene.id === saveData.sceneId) || this.story.dialogues[0];
        this.dialogueIndexInScene = saveData.dialogueIndexInScene || 0;
        this.energy = saveData.energy || 100;
        console.log('Game loaded:', saveData);
    }
}