const config = {
    type: Phaser.AUTO,
    width: 430,
    height: 932,
    scene: [MainMenu, GameScene, SettingsScene, FullscreenScene, InteractiveScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

