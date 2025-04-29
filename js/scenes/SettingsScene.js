class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    create() {
        this.add.rectangle(215, 466, 1300, 2100, 0x000000, 0.8);
        this.add.text(215, 420, 'Настройки',
         { fontFamily: 'Dela Gothic One',
            fontSize: '20px',
            color: '#ffffff', }).setOrigin(0.5);

        // Volume Slider
        const volumeText = this.add.text(80, 466, 'Громкость:',
         { fontFamily: 'IBM Plex Sans',
            fontSize: '20px',
            color: '#ffffff', });

        const volumeBar = this.add.rectangle(250, 479, 100, 20, 0xffffff)
            .setInteractive({ draggable: true })
            .on('drag', (pointer, x) => {
                volumeBar.width = Phaser.Math.Clamp(x - 200, 0, 150);
                this.game.sound.volume = volumeBar.width / 150;
            });
        volumeBar.width = this.game.sound.volume * 150;

        // Close Button
        const closeButton = this.add.rectangle(215, 566, 100, 40, 0x61bdff)
            .setInteractive()
            .on('pointerdown', () => this.scene.stop());
        this.add.text(215, 566, 'Закрыть', { fontFamily: 'IBM Plex Sans',
            fontSize: '20px',
            color: '#ffffff', }).setOrigin(0.5);
    }
}