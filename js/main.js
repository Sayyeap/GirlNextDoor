const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [MainMenu, GameScene, SettingsScene, FullscreenScene, InteractiveScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: true // Используем HTMLAudioElement
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

// Простое управление звуком для Telegram Web App
const audioManager = {
    isActive: true,
    hasInteracted: false,
    isTelegramWebApp: window.Telegram && window.Telegram.WebApp,
    init: function() {
        // Ждём первого взаимодействия для звука в Telegram Web App
        if (this.isTelegramWebApp) {
            const handleFirstInteraction = () => {
                this.hasInteracted = true;
                console.log('AudioManager: First interaction, enabling audio');
                game.registry.set('audioEnabled', true); // Уведомляем сцены
                window.removeEventListener('click', handleFirstInteraction);
            };
            window.addEventListener('click', handleFirstInteraction, { once: true });
        } else {
            this.hasInteracted = true; // В браузере сразу активно
            game.registry.set('audioEnabled', true);
        }
    },
    stopAudio: function() {
        if (this.isActive) {
            console.log('AudioManager: Stopping all audio (screen possibly locked)');
            game.sound.stopAll(); // Останавливаем все звуки Phaser
            document.querySelectorAll('audio').forEach(audio => {
                audio.pause(); // Пауза без сброса src
            });
            this.isActive = false;
        }
    },
    resumeAudio: function() {
        if (!this.isActive && this.isTelegramWebApp && this.hasInteracted) {
            console.log('AudioManager: Resuming audio (screen possibly unlocked)');
            document.querySelectorAll('audio').forEach(audio => {
                audio.play().catch(err => {
                    console.error('AudioManager: Failed to resume audio', err);
                });
            });
            game.registry.set('audioEnabled', true); // Уведомляем сцены
            this.isActive = true;
        }
    },
    checkActivity: function() {
        const isFocused = document.hasFocus();
        const isExpanded = this.isTelegramWebApp ? window.Telegram.WebApp.isExpanded : true;
        if (!isFocused || !isExpanded) {
            this.stopAudio();
        } else {
            this.resumeAudio();
        }
    }
};

// Инициализация аудиоменеджера
audioManager.init();

// Обработка событий blur и focus
window.addEventListener('blur', () => {
    console.log('Window blurred, stopping audio via AudioManager');
    audioManager.stopAudio();
});

window.addEventListener('focus', () => {
    console.log('Window focused, resuming audio via AudioManager');
    audioManager.resumeAudio();
});

// Периодическая проверка активности Telegram Web App
setInterval(() => {
    audioManager.checkActivity();
}, 500);

console.log('Game initialized');