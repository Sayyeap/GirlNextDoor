class FullscreenScene extends Phaser.Scene {
    constructor() {
        super('FullscreenScene');
    }

    init(data) {
        this.image = data.image;
        this.nextIndex = data.nextIndex;
        this.storyId = data.storyId;
    }

    preload() {
        this.load.image('fs1', 'assets/story1/images/fullscreen/fs1.png');
    }

    create() {
        const img = this.add.image(215, 466, this.image).setDisplaySize(430, 932).setAlpha(0);
        this.add.triangle(390, 832, 0, 20, 20, 0, 20, 20, 0xffffff)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene', { storyId: this.storyId });
                this.scene.get('GameScene').showDialogue(this.nextIndex);
            });

        // Fade-in effect
        this.tweens.add({
            targets: img,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });
    }
}