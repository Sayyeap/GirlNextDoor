class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
        this.sliderArea = { minX: 0, maxX: 0 };
        this.elements = {};
    }

    preload() {
        this.load.image('volume_icon', 'assets/common/images/volume_icon.png');
        this.load.audio('click', 'assets/common/audio/click.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        
        // Полупрозрачный черный фон
        this.elements.bgOverlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
            .setOrigin(0, 0);

        // Заголовок "Настройки"
        this.elements.titleText = this.add.text(width/2, height*0.3, 'НАСТРОЙКИ', {
            fontFamily: 'Dela Gothic One',
            fontSize: `${height*0.035}px`,
            color: '#ffffff',
            resolution: 4
        }).setOrigin(0.5);

        // Создаем элементы управления
        this.createVolumeControl(width, height);
        this.createCloseButton(width, height);

        this.scale.on('resize', (gameSize) => {
            this.time.delayedCall(100, () => this.resize(gameSize));
        });
    }

    createVolumeControl(width, height) {
        const centerY = height*0.45;
        const textX = width*0.35;
        const sliderX = width*0.55;
        const sliderWidth = width*0.35;

        this.sliderArea = { minX: sliderX, maxX: sliderX + sliderWidth };

        // Текст и иконка громкости
        this.elements.volumeText = this.add.text(textX, centerY, 'Громкость', {
            fontFamily: 'IBM Plex Sans',
            fontSize: `${height*0.022}px`,
            color: '#ffffff',
            resolution: 4
        }).setOrigin(1, 0.5);

        this.elements.volumeIcon = this.add.image(textX + height*0.025, centerY, 'volume_icon')
            .setDisplaySize(height*0.025, height*0.025)
            .setOrigin(0, 0.5);

        // Ползунок громкости
        this.elements.sliderBg = this.add.rectangle(sliderX, centerY, sliderWidth, height*0.012, 0x666666)
            .setOrigin(0, 0.5);

        this.elements.sliderFill = this.add.rectangle(
            sliderX, centerY, 
            sliderWidth * this.game.sound.volume, 
            height*0.012, 
            0xffffff
        ).setOrigin(0, 0.5);

        this.elements.sliderHandle = this.add.circle(
            sliderX + (sliderWidth * this.game.sound.volume), 
            centerY, 
            height*0.012,
            0xffffff
        ).setInteractive({ draggable: true })
         .on('drag', (pointer, x) => {
             x = Phaser.Math.Clamp(x, this.sliderArea.minX, this.sliderArea.maxX);
             this.elements.sliderHandle.x = x;
             this.elements.sliderFill.width = x - this.sliderArea.minX;
             this.game.sound.volume = (x - this.sliderArea.minX) / sliderWidth;
         });
    }

    createCloseButton(width, height) {
        // Только текст без подложки
        this.elements.closeText = this.add.text(
            width/2, 
            height*0.6, 
            'ЗАКРЫТЬ', 
            {
                fontFamily: 'Dela Gothic One',
                fontSize: `${height*0.025}px`,
                color: '#61bdff', // Голубой цвет
                resolution: 4
            }
        ).setOrigin(0.5)
         .setInteractive()
         .on('pointerdown', () => {
             this.sound.play('click'); // Звук клика
             this.scene.stop();
         });
    }

    resize(gameSize) {
        if (!this.elements) return;

        const width = gameSize.width;
        const height = gameSize.height;
        const centerY = height*0.45;
        const textX = width*0.35;
        const sliderX = width*0.55;
        const sliderWidth = width*0.35;

        // Обновляем границы
        this.sliderArea = { minX: sliderX, maxX: sliderX + sliderWidth };

        // Фон
        this.elements.bgOverlay?.setDisplaySize(width, height);

        // Заголовок
        this.elements.titleText?.setPosition(width/2, height*0.3)
                               .setFontSize(height*0.035);

        // Громкость
        this.elements.volumeText?.setPosition(textX, centerY)
                                .setFontSize(height*0.022);
        
        this.elements.volumeIcon?.setPosition(textX + height*0.025, centerY)
                                .setDisplaySize(height*0.025, height*0.025);

        // Ползунок
        if (this.elements.sliderBg && this.elements.sliderFill && this.elements.sliderHandle) {
            const vol = this.game.sound.volume;
            
            this.elements.sliderBg.setPosition(sliderX, centerY)
                                 .setSize(sliderWidth, height*0.012);
            
            this.elements.sliderFill.setPosition(sliderX, centerY)
                                   .setSize(sliderWidth * vol, height*0.012);
            
            this.elements.sliderHandle.setPosition(sliderX + (sliderWidth * vol), centerY)
                                     .setRadius(height*0.018);
        }

        // Кнопка закрытия
        this.elements.closeText?.setPosition(width/2, height*0.6)
                               .setFontSize(height*0.025);
    }
}