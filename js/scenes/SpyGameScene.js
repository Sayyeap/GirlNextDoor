class SpyGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpyGameScene' });
    }

  init(data) {
    this.energy = data.energy || 10;
    this.imageKey = data.imageKey || 'office_pc_photo_game';
    this.minigameId = data.minigameId || 'spygame1';
    this.successSceneId = data.successSceneId || 'scene3';
    this.failSceneId = data.failSceneId || 'scene4';
    this.storyId = data.storyId || 'story1';
    this.zoneConfig = data.zoneConfig || {
        zoneY: 0.42,
        zoneHeight: 230,
        zoneWidth: 1.0
    };
    this.background = null; // Сбрасываем this.background
    console.log('SpyGameScene init:', data);
}

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;
        const loadingText = this.add.text(width / 2, height / 2, 'Загрузка...', {
            fontSize: '24px',
            color: '#ffffff',
             fontFamily: "Dela Gothic One",
        }).setOrigin(0.5);

        // Загрузка изображений
   
        this.load.image('office_pc_photo_game', 'assets/story1/images/backgrounds/office_pc_photo_game.jpg');
        this.load.image('sexphoto_office', 'assets/story1/images/backgrounds/sexphoto_office.jpg');
        this.load.image('voyeurism', 'assets/story1/images/backgrounds/voyeurism.png');
        this.load.image('Button', 'assets/common/images/Button.png');
        this.load.image('settings_box', 'assets/common/images/settings_box.png');
        this.load.image('energyIcon', 'assets/common/images/energyIcon.png');

        // Загрузка спрайт-листов
        this.load.spritesheet('cameraButton', 'assets/common/images/cameraButton.png', {
            frameWidth: 200, // 800 / 4 кадра = 200 пикселей на кадр
            frameHeight: 200
        });
        this.load.spritesheet('photophokus', 'assets/common/images/photophokus.png', {
            frameWidth: 200, // 1000 / 5 кадров = 200 пикселей на кадр
            frameHeight: 200
        });

        this.load.on('filecomplete', (key) => console.log(`SpyGameScene: File loaded: ${key}`));
        this.load.on('fileerror', (file) => console.error(`SpyGameScene: File failed to load: ${file.key} (${file.src})`));
        this.load.on('complete', () => {
            console.log('SpyGameScene: All assets loaded');
            loadingText.destroy();
        });
    }

    create() {
        this.focusZoneY = this.cameras.main.height * this.zoneConfig.zoneY;
        this.focusZoneHeight = this.zoneConfig.zoneHeight;
        this.focusZoneWidth = this.cameras.main.width * this.zoneConfig.zoneWidth;
        this.focusIconY = this.cameras.main.height / 2;
        this.focusVelocity = 0;
        this.gravity = 700;
        this.progress = 0;
        this.timer = 30;
        this.isGameOver = false;

        this.updateScene();

        // Создание анимации для cameraButton (кадры 1–3, т.е. 2–4-й кадры)
        this.anims.create({
            key: 'cameraButtonClick',
            frames: this.anims.generateFrameNumbers('cameraButton', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: 0 // Анимация проигрывается один раз
        });

        // Создание анимации для photophokus (кадры 0–3, т.е. 1–4-й кадры)
        this.anims.create({
            key: 'photophokusOutOfFocus',
            frames: this.anims.generateFrameNumbers('photophokus', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1 // Зацикленная анимация
        });

        this.focusZone = this.add.rectangle(
            this.cameras.main.centerX,
            this.focusZoneY,
            this.focusZoneWidth,
            this.focusZoneHeight,
            0x00ff00,
            0.0
        ).setDepth(0);

        // Используем кадр 4 (нумерация с 0, поэтому 4 = 5-й кадр) для photophokus
        this.focusIcon = this.add.sprite(this.cameras.main.centerX, this.focusIconY, 'photophokus', 4)
            .setScale(0.5)
            .setDepth(1);

        // cameraButton с первым кадром по умолчанию (frame 0)
        this.cameraButton = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 70, 'cameraButton', 0)
            .setInteractive({ useHandCursor: true })
            .setDepth(3)
            .setScale(0.5)
            .on('pointerdown', () => {
                if (!this.isGameOver) {
                    console.log('Camera button clicked');
                    this.focusVelocity = -450;
                    this.cameraButton.play('cameraButtonClick'); // Проигрываем анимацию при нажатии
                    // Возвращаем первый кадр после завершения анимации
                    this.cameraButton.on('animationcomplete', () => {
                        this.cameraButton.setFrame(0);
                    }, this);
                }
            })
            .on('pointerover', () => console.log('Pointer over cameraButton'))
            .on('pointerout', () => console.log('Pointer out cameraButton'));

        // UI элементы в горизонтальной полосе, смещенные на 15% от верха
        const uiY = this.cameras.main.height * 0.15; // 15% от верхнего края

        // Темная подложка под всеми элементами, размером с voyeurism
        const voyeurismWidth = this.cameras.main.width * 0.9; // 90% ширины экрана (5% отступы с каждой стороны)
        const margin = this.cameras.main.width * 0.05; // Отступы 5%
        const voyeurismHeight = 75 * 0.45; // Высота 33.75 пикселей
        this.backgroundOverlay = this.add.rectangle(
            this.cameras.main.centerX, // Центр экрана
            uiY,
            voyeurismWidth,
            voyeurismHeight,
            0x051726, // Цвет #051726
            1
        ).setOrigin(0.5, 0.5).setDepth(1); // Самый нижний слой

        // Полоска прогресса (110–367.4 пикселей, ширина 257.4 пикселей, уменьшена на 10% справа)
        this.progressBar = this.add.rectangle(
            110, // Начало полоски
            uiY,
            0, // Начальная ширина
            30, // Высота полоски
            0x57b9ff, // Цвет голубой
            1
        ).setOrigin(0, 0.5).setDepth(1);

        // Таймер в формате mm:ss
        this.timerText = this.add.text(10, uiY, this.formatTimer(this.timer), {
            fontSize: '20px',
            color: '#00ff78',
             fontFamily: "Dela Gothic One",
        }).setDepth(2).setOrigin(-0.4, 0.5);

        // Статичный текст "00:00" под таймером
        this.timerStaticText = this.add.text(10, uiY , '00:00', {
            fontSize: '20px',
            color: '#073c0c',
             fontFamily: "Dela Gothic One",
        }).setDepth(1).setOrigin(-0.4, 0.5);

        // Оверлей voyeurism.png на самом верхнем слое
        this.progressOverlay = this.add.image(
            this.cameras.main.centerX, // Центр экрана
            uiY,
            'voyeurism'
        )
            .setDisplaySize(voyeurismWidth, voyeurismHeight) // Ширина с отступами, высота 33.75 пикселей
            .setOrigin(0.5, 0.5)
            .setDepth(2); // Самый верхний слой

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.isGameOver) {
                    this.timer--;
                    this.timerText.setText(this.formatTimer(this.timer));
                    if (this.timer <= 0) {
                        this.gameOver(false);
                    }
                }
            },
            callbackScope: this,
            loop: true
        });

        this.input.on('pointerdown', (pointer) => {
            console.log('Screen clicked at:', pointer.x, pointer.y);
        });
    }

    // Форматирование таймера в mm:ss
    formatTimer(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    update(time, delta) {
        if (!this.isGameOver) {
            this.focusVelocity += this.gravity * (delta / 1000);
            this.focusIconY += this.focusVelocity * (delta / 1000);

            // Добавляем отступы (20% сверху, 10% снизу)
            const topMargin = this.cameras.main.height * 0.2;
            const bottomMargin = this.cameras.main.height * 0.17;
            this.focusIconY = Phaser.Math.Clamp(
                this.focusIconY,
                topMargin,
                this.cameras.main.height - bottomMargin
            );

            this.focusIcon.y = this.focusIconY;

            // Проверка нахождения в зоне и смена кадра/анимации
            const isInZone = (
                this.focusIcon.y >= this.focusZoneY - this.focusZoneHeight / 2 &&
                this.focusIcon.y <= this.focusZoneY + this.focusZoneHeight / 2
            );

            if (isInZone) {
                if (this.focusIcon.anims.isPlaying) {
                    this.focusIcon.stop(); // Останавливаем анимацию
                    this.focusIcon.setFrame(4); // 5-й кадр (фокус)
                } else if (this.focusIcon.frame.name !== 4) {
                    this.focusIcon.setFrame(4); // 5-й кадр (фокус)
                }
                this.progress += 0.2;
                if (this.progress >= 100) {
                    this.gameOver(true);
                }
            } else {
                if (!this.focusIcon.anims.isPlaying) {
                    this.focusIcon.play('photophokusOutOfFocus'); // Проигрываем анимацию (кадры 0–3)
                }
            }

            // Обновление ширины полоски прогресса (257.4 пикселей максимум)
            this.progressBar.width = (this.progress / 100) * (385 - 110);
        }
    }

    updateScene() {
    const validBackgrounds = ['office_pc_photo_game', 'sexphoto_office'];
    const bgKey = validBackgrounds.includes(this.imageKey) ? this.imageKey : 'office_pc_photo_game';
    console.log('SpyGameScene: Setting background to:', bgKey);

    // Проверяем, существует ли this.background и активен ли он
   if (!this.background || !this.background.active) {
    this.background = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        bgKey
    )
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        .setAlpha(1)
        .setDepth(0);
} else {
    this.background.setTexture(bgKey);
}
}

   gameOver(success) {
        this.isGameOver = true;

        this.registry.set(`minigame_${this.minigameId}_result`, success);
        if (success) {
            // Уничтожаем все объекты, кроме прямоугольников и текста
            this.children.each(child => {
                if (!(child instanceof Phaser.GameObjects.Rectangle) &&
                    !(child instanceof Phaser.GameObjects.Text)) {
                    child.destroy();
                }
            });

            let victoryImage;
            switch (this.minigameId) {
                case 'spygame1':
                    victoryImage = 'sexphoto_office';
                    break;
                case 'spygame2':
                    victoryImage = 'image2';
                    break;
                default:
                    victoryImage = 'office_pc_photo_game';
            }

            // Создаем изображение с начальным масштабом 0.5 и прозрачностью 0
            const finalImage = this.add.image(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                victoryImage
            )
                .setScale(0.5)
                .setAlpha(0)
                .setDepth(40);

            // Анимация для изображения
            this.tweens.chain({
                targets: finalImage,
                tweens: [
                    {
                        scale: 1.2,
                        alpha: 1,
                        duration: 500,
                        ease: 'Power2'
                    },
                    {
                        scale: 1,
                        duration: 1000,
                        ease: 'Sine.easeOut'
                    },
                    {
                        scaleX: this.cameras.main.width / finalImage.width,
                        scaleY: this.cameras.main.height / finalImage.height,
                        duration: 500,
                        ease: 'Power1'
                    }
                ]
            });

            // Создаем кнопку "Далее" с начальной прозрачностью 0
            const nextButton = this.add.sprite(
                this.cameras.main.centerX,
                this.cameras.main.height * 0.9,
                'Button'
            )
                .setInteractive({ useHandCursor: true })
                .setScale(0.5)
                .setAlpha(0)
                .setDepth(43);

            const buttonText = this.add.text(
                nextButton.x,
                nextButton.y,
                'Далее',
                {
                    fontSize: '32px',
                    color: '#ffffff',
                    fontFamily: "Dela Gothic One",
                    padding: { x: 20, y: 10 }
                }
            )
                .setOrigin(0.5)
                .setAlpha(0)
                .setDepth(44);

            // Анимация появления кнопки через 2 секунды
            this.tweens.add({
                targets: [nextButton, buttonText],
                alpha: 1,
                duration: 500,
                delay: 2000, // Задержка 2 секунды
                ease: 'Linear',
                onStart: () => {
                    console.log('Button animation started');
                },
                onComplete: () => {
                    console.log('Button animation completed');
                }
            });

            // Обработчик нажатия кнопки
            nextButton.on('pointerdown', () => {
                console.log('Next button clicked');
                const params = {
                    storyId: this.storyId,
                    energy: this.energy,
                    minigameId: this.minigameId,
                    success: true,
                    successSceneId: this.successSceneId,
                    failSceneId: this.failSceneId
                };
                this.scene.start('GameScene', params);
            });
        } else {
            // Добавляем блок отображения энергии
            this.createEnergyDisplay(this.cameras.main.width, this.cameras.main.height);

            // Код для случая провала
            const resultWindow = this.add.image(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                'settings_box'
            )
                .setDisplaySize(300, 300)
                .setDepth(3);

            const failText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 80,
                'Провал!',
                { fontSize: '24px', color: '#ffffff', fontFamily: "Dela Gothic One" }
            )
                .setOrigin(0.5)
                .setDepth(4);

            const continueButton = this.add.sprite(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 20,
                'Button'
            )
                .setInteractive({ useHandCursor: true })
                .setScale(0.5)
                .setDepth(4);

            const continueText = this.add.text(
                continueButton.x,
                continueButton.y,
                'Продолжить',
                { fontSize: '20px', color: '#ffffff', fontFamily: "Dela Gothic One" }
            )
                .setOrigin(0.5)
                .setDepth(5);

            continueButton.on('pointerdown', () => {
                const params = {
                    storyId: this.storyId,
                    energy: this.energy,
                    minigameId: this.minigameId,
                    success: false,
                    successSceneId: this.successSceneId,
                    failSceneId: this.failSceneId
                };
                this.scene.start('GameScene', params);
            });

            if (this.energy > 0) {
                const retryButton = this.add.sprite(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY + 60,
                    'Button'
                    
                )
                
                    .setInteractive({ useHandCursor: true })
                    .setScale(0.5)
                    .setDepth(4);

                    

                const retryText = this.add.text(
                    retryButton.x - 30,
                    retryButton.y,
                    'Переиграть',
                    { fontSize: '20px', color: '#ffffff', fontFamily: "Dela Gothic One" }
                )
                    .setOrigin(0.5)
                    .setDepth(5);

                const energyIcon = this.add.image(
                    retryButton.x + 80,
                    retryButton.y,
                    'energyIcon'
                )
                    .setScale(0.16)
                    .setDepth(5);

                const energyText = this.add.text(
                    energyIcon.x - 30,
                    retryButton.y,
                    '-1',
                    { fontSize: '20px', color: '#57b9ff', fontFamily: "Dela Gothic One" }
                )
                    .setOrigin(0.5)
                    .setDepth(5);

               retryButton.on('pointerdown', () => {
    if (this.energy <= 0) {
        window.Telegram.WebApp.showAlert('Недостаточно энергии!');
        return;
    }

    this.energy -= 1;

    // Обновляем отображение энергии
    if (this.energyText) {
        this.energyText.setText(`${this.energy}`);
    }

    // Параметры для перезапуска
    const params = {
        storyId: this.storyId,
        energy: this.energy,
        minigameId: this.minigameId,
        successSceneId: this.successSceneId,
        failSceneId: this.failSceneId
    };

    // Проверяем, поддерживает ли saveProgress Promise
    const saveResult = window.gameStorage.saveProgress(
        this.storyId,
        null,
        0,
        this.energy,
        0,
        this.registry,
        { minigameResults: {} }
    );

    if (saveResult && typeof saveResult.then === 'function') {
        // Если saveProgress возвращает Promise, ждём завершения
        saveResult
            .then(() => this.scene.restart(params))
            .catch(error => {
                console.error('Ошибка сохранения:', error);
                this.energy += 1; // Откатываем энергию
                if (this.energyText) this.energyText.setText(`${this.energy}`);
                window.Telegram.WebApp.showAlert('Ошибка сохранения. Попробуйте ещё раз.');
            });
    } else {
        // Если saveProgress синхронный, просто перезапускаем
        console.warn('saveProgress не вернул Promise, сохраняем без ожидания');
        this.scene.restart(params);
    }
});

            }
        }
    }

    createEnergyDisplay(width, height) {
        // Размеры элементов
        const bgWidth = width * 0.26;
        const bgHeight = height * 0.04;
        const borderRadius = 5;
        
        // Центральные координаты
        const centerX = width / 2;
        const centerY = height * 0.375;

        // Фон для энергии
        this.energyBg = this.add.graphics()
            .setDepth(10);
        this.energyBg.fillStyle(0x000000, 0.5);
        this.energyBg.fillRoundedRect(
            centerX - bgWidth / 2,
            centerY - bgHeight / 2,
            bgWidth,
            bgHeight,
            borderRadius
        );

        // Загружаем текущую энергию
        window.gameStorage.loadProgress('story1', this.registry, (progress) => {
            this.energyText = this.add.text(centerX + bgWidth * 0.15, centerY, `${progress.energy || 0}`, {
                fontSize: `${height * 0.0258}px`,
                color: '#57b9ff',
                fontFamily: 'Dela Gothic One',
                resolution: 1
            }).setOrigin(0.5).setDepth(31);
        });

        // Иконка энергии
        this.energyIcon = this.add.image(centerX - bgWidth * 0.35, centerY, 'energyIcon')
            .setDisplaySize(height * 0.037, height * 0.037)
            .setDepth(11)
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.play('click');
                console.log('EnergyShop button clicked');
                this.scene.launch('EnergyShopScene');
  });
    }
}