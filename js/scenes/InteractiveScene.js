class InteractiveScene extends Phaser.Scene {
    constructor() {
        super('InteractiveScene');
    }

    init(data) {
        this.nextIndex = data.nextIndex;
        this.storyId = data.storyId;
    }

    create() {
        this.add.text(215, 466, 'Интерактивная сцена (TBD)', { font: '24px Arial', fill: '#fff' }).setOrigin(0.5);
        this.add.triangle(390, 832, 0, 20, 20, 0, 20, 20, 0xffffff)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene', { storyId: this.storyId });
                this.scene.get('GameScene').showDialogue(this.nextIndex);
            });
    }
}