class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('menu_bg', 'assets/common/images/menu_bg.jpg');
        this.load.image('tap_to_play', 'assets/common/images/tap_to_play.jpg');
        this.load.image('gradient_dot', 'assets/common/images/gradient_dot.png');
        this.load.image('calendar', 'assets/common/images/calendar.png');
        this.load.image('reset', 'assets/common/images/reset.png');
        this.load.image('gallery', 'assets/common/images/gallery.png');
        this.load.image('close', 'assets/common/images/close.png');
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('settings', 'assets/common/images/settings.png');
        this.load.image('Button', 'assets/common/images/Button.png');
        this.load.image('Button_wide', 'assets/common/images/Button_wide.png');
        this.load.image('story1', 'assets/common/images/story1.jpg');
        this.load.image('story2', 'assets/common/images/story2.jpg');
        this.load.audio('menu_music', 'assets/common/audio/menu_music.mp3');
        this.load.audio('pixel_dreaming', 'assets/story1/audio/pixel_dreaming.mp3');
        this.load.audio('click', 'assets/common/audio/click.wav');

        
        this.createFontPreload();
    }

    async create() {
        const width = this.scale.width;
        const height = this.scale.height;

         // Создаем музыку меню (но не запускаем ее сразу)
    this.menuMusic = this.sound.add('menu_music', { loop: true });
        
        this.scale.on('resize', this.resize, this);
        this.scale.refresh();

         // Сначала показываем splash-экран
    this.showSplashScreen(width, height);

        this.cameras.main.setViewport(0, 0, width, height);
        this.cameras.main.setBounds(0, 0, width, height);

        this.bg = this.add.image(width / 2, height / 2, 'menu_bg')
            .setDisplaySize(width, height)
            .setOrigin(0.5)
            .setDepth(1);

        this.createLavaEffect(width, height);

        this.game.sound.volume = 1.0;

        this.menuMusic = this.sound.add('menu_music', { loop: true });
        console.log('MainMenu: Music initialized');

        await document.fonts.ready;
        console.log('MainMenu: Fonts loaded');

        this.titleText = this.add.text(width / 2, height * 0.1, '', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height * 0.043}px`,
            color: '#fff',
            resolution: 2
        }).setOrigin(0.5).setDepth(10);

        const playMusic = () => {
            if (!this.menuMusic.isPlaying) {
                this.menuMusic.play();
                console.log('MainMenu: Music playing', this.menuMusic.isPlaying);
            }
        };

        this.currentStoryIndex = 0;
        this.stories = [
            { id: 'story1', image: 'story1', title: 'Эффект наблюдателя', active: true },
            { id: 'story2', image: 'story2', title: 'Вторая История', active: false }
        ];
        this.createStoryInterface(width, height, playMusic);

        this.input.on('pointerdown', (pointer) => this.startSwipe = { x: pointer.x, y: pointer.y });
        this.input.on('pointerup', (pointer) => this.handleSwipe(pointer));
        this.input.on('gameout', () => {    this.input.stopPropagation();
});



// Добавляем обработчики только для картинки
    this.storyImage.on('pointerdown', (pointer) => {
        this.startSwipe = { x: pointer.x, y: pointer.y };
    });
    
    this.storyImage.on('pointerup', (pointer) => {
        if (this.startSwipe) {
            this.handleSwipe(pointer);
        }
    });

      // Также добавим обработчики для боковых картинок, если они есть
    if (this.leftStoryImage) {
        this.leftStoryImage.setInteractive()
            .on('pointerdown', (pointer) => {
                this.startSwipe = { x: pointer.x, y: pointer.y };
            })
            .on('pointerup', (pointer) => {
                if (this.startSwipe) {
                    this.handleSwipe(pointer);
                }
            });
    }

    if (this.rightStoryImage) {
        this.rightStoryImage.setInteractive()
            .on('pointerdown', (pointer) => {
                this.startSwipe = { x: pointer.x, y: pointer.y };
            })
            .on('pointerup', (pointer) => {
                if (this.startSwipe) {
                    this.handleSwipe(pointer);
                }
            });
    }


        this.storyGroup = this.add.group();
    }
showSplashScreen(width, height) {
    // Создаем звук клика заранее
    this.clickSound = this.sound.add('click');
    
    // Фоновая картинка
    this.splashBg = this.add.image(width/2, height/2, 'tap_to_play')
        .setDisplaySize(width, height)
        .setDepth(1000)
        .setInteractive();
    
    // Текст "Нажми чтобы начать"
    this.splashText = this.add.text(width/2, height * 0.7, 'НАЖМИ ЧТО БЫ НАЧАТЬ', {
        fontFamily: 'IBM Plex Sans',
        fontSize: `${height * 0.02}px`,
        color: '#ffffff',
       
        padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setDepth(1001);

    // Обработчик клика
    this.splashBg.on('pointerdown', () => {
        // Проигрываем звук клика
        this.clickSound.play();
        
        // Запускаем музыку меню
        if (!this.menuMusic.isPlaying) {
            this.menuMusic.play();
        }
        
        // Удаляем splash-экран
        this.splashBg.destroy();
        this.splashText.destroy();
        
        // Инициализируем главное меню
        this.initMainMenu(width, height);
    })

    .setOrigin(0.5)
    .setDepth(1001);

    // Обработчик клика
    this.splashBg.on('pointerdown', () => {
        // Удаляем splash-экран
        this.splashBg.destroy();
        this.splashText.destroy();
        
        // Инициализируем главное меню
        this.initMainMenu(width, height);
    });
}
    createLavaEffect(width, height) {
        const spots = [];

        for (let i = 0; i < 6; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(0, height);
            const spot = this.add.image(x, y, 'gradient_dot')
                .setDepth(2)
                .setAlpha(Phaser.Math.FloatBetween(0.2, 0.4))
                .setScale(Phaser.Math.FloatBetween(0.5, 1.5));
            spots.push({
                sprite: spot,
                vx: Phaser.Math.Between(-2, 2) || 1,
                vy: Phaser.Math.Between(-2, 2) || 1
            });

            this.tweens.add({
                targets: spot,
                scale: { from: spot.scale * 0.8, to: spot.scale * 1.2 },
                alpha: { from: spot.alpha * 0.8, to: spot.alpha },
                duration: Phaser.Math.Between(2000, 4000),
                yoyo: true,
                loop: -1,
                ease: 'Sine.easeInOut'
            });
        }

        this.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {
                spots.forEach(spot => {
                    spot.sprite.x += spot.vx;
                    spot.sprite.y += spot.vy;
                    const bounds = spot.sprite.getBounds();
                    if (bounds.left < 0 || bounds.right > width) spot.vx *= -1;
                    if (bounds.top < 0 || bounds.bottom > height) spot.vy *= -1;
                });
            }
        });
    }

    createStoryInterface(width, height, playMusic) {
    const storyWidth = width * 0.7;
    const storyHeight = height * 0.5;

  this.storyImage = this.add.image(width / 2, height * 0.4, this.stories[this.currentStoryIndex].image)
        .setDisplaySize(storyWidth, storyHeight)
        .setDepth(10)
        .setInteractive();

        this.leftStoryImage = this.currentStoryIndex > 0
            ? this.add.image(width * 0.2, height * 0.4, this.stories[this.currentStoryIndex - 1].image)
                .setDisplaySize(storyWidth, storyHeight)
                .setDepth(9)
                .setAlpha(0.5)
            : null;

        this.rightStoryImage = this.currentStoryIndex < this.stories.length - 1
            ? this.add.image(width * 0.8, height * 0.4, this.stories[this.currentStoryIndex + 1].image)
                .setDisplaySize(storyWidth, storyHeight)
                .setDepth(9)
                .setAlpha(0.5)
            : null;

        this.swipeDots = this.add.group();
        for (let i = 0; i < 2; i++) {
            const dot = this.add.circle(width * (0.48 + i * 0.05), height * 0.68, 3.3, 0xffffff, i === this.currentStoryIndex ? 1 : 0.3)
                .setDepth(10);
            this.swipeDots.add(dot);
        }

    this.openButton = this.add.image(width / 2, height * 0.73, 'Button_wide')
    .setDisplaySize(width * 0.65, height * 0.06)
    .setDepth(20) // Увеличиваем глубину

    
    .setInteractive({ useHandCursor: true }) // Добавляем курсор-руку
    .on('pointerdown', () => {
        console.log('Button pressed'); // Debug
        playMusic();
        this.sound.play('click');
        this.createPopup(width, height, playMusic);
    })
    .on('pointerover', () => this.openButton.setAlpha(0.8))
    .on('pointerout', () => this.openButton.setAlpha(1));
        this.openButtonText = this.add.text(width / 2, height * 0.73, 'Открыть', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.024}px`,
            color: '#fff',
            resolution: 2
        }).setOrigin(0.5).setDepth(21);

        this.description1 = this.add.text(width / 2, height * 0.78, 'Готова глава 1', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.016}px`,
            color: '#fff',
            backgroundColor: '#00bfff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setDepth(20);

        this.description2 = this.add.text(width / 2, height * 0.85, 'Примерьте шкуру цифрового стакера и вуайриста и разгадайте тайну новой соседки', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.018}px`,
            color: '#fff',
            align: 'center',
            wordWrap: { width: width * 0.7 }
        }).setOrigin(0.5).setDepth(10);
    }

   createPopup(width, height, playMusic) {
    // Оверлей
    this.overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.9)
        .setDepth(30)
        .setInteractive();

    // Картинка истории
    this.popupImage = this.add.image(width / 2, height * 0.42, this.stories[this.currentStoryIndex].image)
        .setDisplaySize(width * 0.75, height * 0.55)
        .setDepth(31);

    // Кнопка "Начать" (центр, как было раньше)
    this.startButton = this.add.image(width / 2, height * 0.74, 'Button_wide')
        .setDisplaySize(width * 0.75, height * 0.06)
        .setDepth(32)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            playMusic();
            this.sound.play('click');
            window.gameStorage.loadProgress(this.stories[this.currentStoryIndex].id, this.registry, (progress) => {
                this.scene.start('GameScene', {
                    storyId: this.stories[this.currentStoryIndex].id,
                    sceneId: progress.sceneId,
                    dialogueIndexInScene: progress.dialogueIndex,
                    energy: progress.energy,
                    stars: progress.stars
                });
            });
        });

    this.startButtonText = this.add.text(width / 2, height * 0.74, 'Начать', {
        fontFamily: 'IBM Plex Sans',
        fontSize: `${height * 0.03}px`,
        color: '#fff',
        resolution: 2
    }).setOrigin(0.5).setDepth(33);

    // Нижний блок с 3 кнопками
    const buttonY = height * 0.9;
    const buttonSpacing = width * 0.15;

    // Рестарт
    this.resetButton = this.add.image(width / 2 - buttonSpacing, buttonY, 'reset')
        .setDisplaySize(width * 0.1, width * 0.1)
        .setDepth(32)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            playMusic();
            this.sound.play('click');
            localStorage.removeItem(`progress_${this.stories[this.currentStoryIndex].id}`);
            this.scene.start('GameScene', {
                storyId: this.stories[this.currentStoryIndex].id,
                sceneId: 'scene1',
                dialogueIndexInScene: 0,
                energy: 100,
                stars: 0
            });
        });

    this.resetText = this.add.text(width / 2 - buttonSpacing, buttonY + height * 0.04, 'Рестарт', {
        fontFamily: 'IBM Plex Sans',
        fontSize: `${height * 0.012}px`,
        color: '#fff',
        resolution: 2
    }).setOrigin(0.5).setDepth(33);

    // Галерея
    this.galleryButton = this.add.image(width / 2, buttonY, 'gallery')
        .setDisplaySize(width * 0.1, width * 0.1)
        .setDepth(32)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            playMusic();
            this.sound.play('click');
            console.log('Gallery opened');
        });

    this.galleryText = this.add.text(width / 2, buttonY + height * 0.04, 'Галерея', {
        fontFamily: 'IBM Plex Sans',
        fontSize: `${height * 0.012}px`,
        color: '#fff',
        resolution: 2
    }).setOrigin(0.5).setDepth(33);

    // Закрыть
    this.closeButton = this.add.image(width / 2 + buttonSpacing, buttonY, 'close')
        .setDisplaySize(width * 0.1, width * 0.1)
        .setDepth(32)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            playMusic();
            this.sound.play('click');
            this.closePopup();
        });

    this.closeText = this.add.text(width / 2 + buttonSpacing, buttonY + height * 0.04, 'Закрыть', {
        fontFamily: 'IBM Plex Sans',
        fontSize: `${height * 0.012}px`,
        color: '#fff',
        resolution: 2
    }).setOrigin(0.5).setDepth(33);
}

 closePopup() {
    const elements = [
        this.overlay, this.popupImage, this.startButton, this.startButtonText,
        this.resetButton, this.resetText, this.galleryButton, this.galleryText,
        this.closeButton, this.closeText
    ];
    
    elements.forEach(element => {
        if (element) element.destroy();
    });
}

    handleSwipe(pointer) {
        if (!this.startSwipe) return;
        const swipeDistance = pointer.x - this.startSwipe.x;
        if (swipeDistance > 50 && this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
            this.animateStoryTransition('right');
        } else if (swipeDistance < -50 && this.currentStoryIndex < this.stories.length - 1) {
            this.currentStoryIndex++;
            this.animateStoryTransition('left');
        }
        this.startSwipe = null;
    }

    animateStoryTransition(direction) {
        const width = this.scale.width;
        const height = this.scale.height;
        const storyWidth = width * 0.7;
        const storyHeight = height * 0.5;

        const currentImage = this.storyImage;
        const newImage = this.add.image(width / 2, height * 0.4, this.stories[this.currentStoryIndex].image)
            .setDisplaySize(storyWidth, storyHeight)
            .setDepth(10)
            .setAlpha(0);

        if (direction === 'left') {
            this.tweens.add({
                targets: currentImage,
                x: width * 1,
                alpha: 0.5,
                duration: 50,
                ease: 'Power2',
                onComplete: () => {
                    currentImage.destroy();
                    this.storyImage = newImage;
                    this.updateStoryInterface();
                }
            });
            this.tweens.add({
                targets: newImage,
                x: width / 2,
                alpha: 1,
                duration: 50,
                ease: 'Power2'
            });
        } else {
            this.tweens.add({
                targets: currentImage,
                x: width * 1,
                alpha: 0.5,
                duration: 50,
                ease: 'Power2',
                onComplete: () => {
                    currentImage.destroy();
                    this.storyImage = newImage;
                    this.updateStoryInterface();
                }
            });
            this.tweens.add({
                targets: newImage,
                x: width / 2,
                alpha: 1,
                duration: 500,
                ease: 'Power2'
            });
        }
    }

   updateStoryInterface() {
    const width = this.scale.width;
    const height = this.scale.height;
    const storyWidth = width * 0.7;
    const storyHeight = height * 0.5;

    this.swipeDots.getChildren().forEach((dot, i) => dot.setFillStyle(0xffffff, i === this.currentStoryIndex ? 1 : 0.3));

    if (this.leftStoryImage) this.leftStoryImage.destroy();
    if (this.rightStoryImage) this.rightStoryImage.destroy();

    // Обновляем боковые картинки
    this.leftStoryImage = this.currentStoryIndex > 0
        ? this.add.image(width * 0.3, height * 0.4, this.stories[this.currentStoryIndex - 1].image)
            .setDisplaySize(storyWidth, storyHeight)
            .setDepth(9)
            .setAlpha(0.5)
            .setInteractive()
            .on('pointerdown', (pointer) => {
                this.startSwipe = { x: pointer.x, y: pointer.y };
            })
            .on('pointerup', (pointer) => {
                if (this.startSwipe) {
                    this.handleSwipe(pointer);
                }
            })
        : null;

    this.rightStoryImage = this.currentStoryIndex < this.stories.length - 1
        ? this.add.image(width * 0.8, height * 0.4, this.stories[this.currentStoryIndex + 1].image)
            .setDisplaySize(storyWidth, storyHeight)
            .setDepth(9)
            .setAlpha(0.5)
            .setInteractive()
            .on('pointerdown', (pointer) => {
                this.startSwipe = { x: pointer.x, y: pointer.y };
            })
            .on('pointerup', (pointer) => {
                if (this.startSwipe) {
                    this.handleSwipe(pointer);
                }
            })
        : null;

    // Восстанавливаем интерактивность основной картинки
    this.storyImage.setTexture(this.stories[this.currentStoryIndex].image)
        .setDisplaySize(storyWidth, storyHeight)
        .setInteractive()
        .on('pointerdown', (pointer) => {
            this.startSwipe = { x: pointer.x, y: pointer.y };
        })
        .on('pointerup', (pointer) => {
            if (this.startSwipe) {
                this.handleSwipe(pointer);
            }
        });

    // Важное исправление: полностью пересоздаем кнопку
    if (this.openButton) {
        this.openButton.destroy();
    }
    if (this.openButtonText) {
        this.openButtonText.destroy();
    }

    // Создаём кнопку только для активной истории
    if (this.stories[this.currentStoryIndex].active) {
        this.openButton = this.add.image(width / 2, height * 0.73, 'Button_wide')
            .setDisplaySize(width * 0.65, height * 0.06)
            .setDepth(20)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                console.log('Button pressed after swipe');
                this.sound.play('click');
                this.createPopup(width, height, () => {
                    if (!this.menuMusic.isPlaying) {
                        this.menuMusic.play();
                    }
                });
            })
            .on('pointerover', () => this.openButton.setAlpha(0.8))
            .on('pointerout', () => this.openButton.setAlpha(1));

        this.openButtonText = this.add.text(width / 2, height * 0.73, 'Открыть', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height * 0.024}px`,
            color: '#fff',
            resolution: 2
        }).setOrigin(0.5).setDepth(21);
    }

    this.description1.setText(this.stories[this.currentStoryIndex].active ? 'Готова Глава 1' : 'В разработке');
    this.description2.setText(this.stories[this.currentStoryIndex].active 
        ? 'Примерьте шкуру цифрового стакера и вуайриста и разгадайте тайну новой соседки' 
        : 'Эта история пока в разработке.');
}


    createButtons(width, height, playMusic) {
        const buttonWidth = width * 0.45;
        const buttonHeight = height * 0.055;
        const positions = [
            height * 0.68,
            height * 0.75,
            height * 0.82,
            height * 0.89
        ];

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

        this.galleryContainer = this.add.container(width / 2, positions[3]).setDepth(20);
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

        if (this.bg) {
            this.bg.setDisplaySize(width, height)
                .setPosition(width / 2, height / 2);
        }

        if (this.titleText) {
            this.titleText.setPosition(width / 2, height * 0.1)
                .setFontSize(height * 0.043);
        }
        // Если есть splash-экран - обновляем его размеры
    if (this.splashBg) {
        this.splashBg.setDisplaySize(width, height)
            .setPosition(width/2, height/2);
        
        // Обновляем текст
        if (this.splashText) {
            this.splashText.setPosition(width/2, height * 0.7)
                .setFontSize(height * 0.04);
        }
    }

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

        if (this.storyGroup) {
            this.storyGroup.getChildren().forEach((container, i) => {
                container.setPosition(width / 2, height * 0.3 + i * (height * 0.1));
                const rect = container.list.find(obj => obj.type === 'Rectangle');
                const text = container.list.find(obj => obj.type === 'Text');
                if (rect) rect.setSize(width * 0.7, height * 0.06);
                if (text) text.setFontSize(height * 0.0258);
            });
        }

        if (this.storyImage) {
            const storyWidth = width * 0.7;
            const storyHeight = height * 0.5;

            this.storyImage.setDisplaySize(storyWidth, storyHeight)
                .setPosition(width / 2, height * 0.4);
            if (this.leftStoryImage) {
                this.leftStoryImage.setDisplaySize(storyWidth, storyHeight)
                    .setPosition(width * 0.2, height * 0.4);
            }
            if (this.rightStoryImage) {
                this.rightStoryImage.setDisplaySize(storyWidth, storyHeight)
                    .setPosition(width * 0.8, height * 0.4);
            }
            this.openButton.setDisplaySize(width * 0.4, height * 0.08)
                .setPosition(width / 2, height * 0.85);
            this.openButtonText.setPosition(width / 2, height * 0.85)
                .setFontSize(height * 0.03);
            this.description1.setPosition(width / 2, height * 0.9)
                .setFontSize(height * 0.02);
            this.description2.setPosition(width / 2, height * 0.95)
                .setFontSize(height * 0.018)
                .setWordWrapWidth(width * 0.7);
            this.swipeDots.getChildren().forEach((dot, i) => {
                dot.setPosition(width * (0.45 + i * 0.05), height * 0.55)
                    .setRadius(3.3);
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