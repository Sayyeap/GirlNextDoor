class SpyGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpyGameScene' });
    }

    init(data) {
        this.energy = data.energy || 10;
        this.imageKey = data.imageKey || 'image1';
        this.minigameId = data.minigameId || 'spygame1';
        this.successSceneId = data.successSceneId || 'scene3';
        this.failSceneId = data.failSceneId || 'scene4';
        this.storyId = data.storyId || 'story1'; // Добавляем storyId
        this.zoneConfig = data.zoneConfig || {
            zoneY: 0.5,
            zoneHeight: 100,
            zoneWidth: 1.0
        };
        console.log('SpyGameScene init:', data);
       
    }

    preload() {
        const width = this.scale.width;
        const height = this.scale.height;
        const loadingText = this.add.text(width / 2, height / 2, 'Загрузка...', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.load.image('image1', 'assets/images/spy_image1.jpg');
        this.load.image('image2', 'assets/images/spy_image2.jpg');
        this.load.image('office_pc_photo_game', 'assets/story1/images/backgrounds/office_pc_photo_game.jpg');
        this.load.image('cameraButton', 'assets/common/images/cameraButton.png');
        this.load.image('photophokus', 'assets/common/images/photophokus.png');
        this.load.image('trophy', 'assets/images/trophy.png');

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
        this.gravity = 600;
        this.progress = 0;
        this.timer = 60;
        this.isGameOver = false;

        this.updateScene();

        this.focusZone = this.add.rectangle(
            this.cameras.main.centerX,
            this.focusZoneY,
            this.focusZoneWidth,
            this.focusZoneHeight,
            0x00ff00,
            0.3
        ).setDepth(0);

        this.focusIcon = this.add.image(this.cameras.main.centerX, this.focusIconY, 'photophokus')
            .setScale(1)
            .setDepth(1);

        this.cameraButton = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 50, 'cameraButton')
            .setInteractive({ useHandCursor: true })
            .setDepth(2)
            .on('pointerdown', () => {
                if (!this.isGameOver) {
                    console.log('Camera button clicked');
                    this.focusVelocity = -500;
                    this.tweens.add({
                        targets: this.cameraButton,
                        scale: 0.8,
                        duration: 100,
                        yoyo: true
                    });
                }
            })
            .on('pointerover', () => console.log('Pointer over cameraButton'))
            .on('pointerout', () => console.log('Pointer out cameraButton'));

        this.progressBar = this.add.rectangle(
            10,
            50,
            0,
            20,
            0x00ff00,
            1
        ).setOrigin(0).setDepth(1);

        this.trophyIcon = this.add.image(this.cameras.main.width - 30, 50, 'trophy')
            .setOrigin(0.5)
            .setDepth(1);

        this.timerText = this.add.text(10, 10, `Время: ${this.timer}`, {
            fontSize: '20px',
            color: '#ffffff'
        }).setDepth(1);

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (!this.isGameOver) {
                    this.timer--;
                    this.timerText.setText(`Время: ${this.timer}`);
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

    update(time, delta) {
        if (!this.isGameOver) {
            this.focusVelocity += this.gravity * (delta / 1000);
            this.focusIconY += this.focusVelocity * (delta / 1000);
            this.focusIconY = Phaser.Math.Clamp(
                this.focusIconY,
                50,
                this.cameras.main.height - 50
            );
            this.focusIcon.y = this.focusIconY;

            console.log('Update:', {
                velocity: this.focusVelocity,
                y: this.focusIconY,
                delta: delta,
                visible: this.focusIcon.visible
            });

            if (
                this.focusIcon.y >= this.focusZoneY - this.focusZoneHeight / 2 &&
                this.focusIcon.y <= this.focusZoneY + this.focusZoneHeight / 2
            ) {
                this.progress += 0.2;
                if (this.progress >= 100) {
                    this.gameOver(true);
                }
            }

            this.progressBar.width = (this.progress / 100) * (this.cameras.main.width - 60);
        }
    }

    updateScene() {
        const validBackgrounds = ['image1', 'image2', 'office_pc_photo_game'];
        const bgKey = validBackgrounds.includes(this.imageKey) ? this.imageKey : 'image1';
        console.log('SpyGameScene: Setting background to:', bgKey);

        if (!this.background) {
            this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, bgKey)
                .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
                .setAlpha(0.5)
                .setDepth(0);
        } else {
            this.background.setTexture(bgKey);
        }
    }

    gameOver(success) {
        this.isGameOver = true;
        this.time.paused = true;

        this.registry.set(`minigame_${this.minigameId}_result`, success);

        // Фон окна
        const resultWindow = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            300,
            200,
            0x000000,
            0.8
        ).setDepth(3);

        // Текст результата (только "Провал!" при проигрыше)
        if (!success) {
            this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 50,
                'Провал!',
                { fontSize: '24px', color: '#ffffff' }
            ).setOrigin(0.5).setDepth(3);
        }

        // Кнопка "Продолжить" (слева)
        const continueButton = this.add.text(
            this.cameras.main.centerX - 100,
            this.cameras.main.centerY + 50,
            'Продолжить',
            { fontSize: '20px', color: '#ffffff' }
        ).setInteractive({ useHandCursor: true }).setOrigin(0.5).setDepth(3);

        continueButton.on('pointerdown', () => {
            const params = {
                storyId: this.storyId,
                energy: this.energy,
                minigameId: this.minigameId,
                success,
                successSceneId: this.successSceneId,
                failSceneId: this.failSceneId
            };
            console.log('Continue button clicked, params:', params);
            this.scene.start('GameScene', params);
        });

        // Кнопка "Переиграть" (справа, только при проигрыше и если есть энергия)
        if (!success && this.energy > 0) {
            const retryButton = this.add.text(
                this.cameras.main.centerX + 100,
                this.cameras.main.centerY + 50,
                `Переиграть (-1 энергия)`,
                { fontSize: '20px', color: '#ffffff' }
            ).setInteractive({ useHandCursor: true }).setOrigin(0.5).setDepth(3);

            retryButton.on('pointerdown', () => {
                const params = {
                    storyId: this.storyId,
                    energy: this.energy - 1,
                    imageKey: this.imageKey,
                    minigameId: this.minigameId,
                    successSceneId: this.successSceneId,
                    failSceneId: this.failSceneId,
                    zoneConfig: this.zoneConfig
                };
                console.log('Retry button clicked, params:', params);
                this.scene.start('SpyGameScene', params);
            });
        }
    }
}