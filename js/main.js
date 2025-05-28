const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [MainMenu, GameScene, SettingsScene, FullscreenScene, InteractiveScene, SpyGameScene , EnergyShopScene ],
     scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resolution: window.devicePixelRatio || 1 // Критически важно
    },
    render: {
        
        pixelArt: false,  // ← Важно! Должно быть false для smooth иконок
    antialias: true,  // Включаем сглаживание для спрайтов
    roundPixels: true // Четкие позиции, но без пикселизации
    },
   

    audio: {
        disableWebAudio: false,  // Важно для точного контроля
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

// Храним позиции всех звуков
const pausedSounds = new Map();

// Останавливаем звуки с сохранением позиции
function pauseAllSounds() {
    game.sound.sounds.forEach(sound => {
        if (sound.isPlaying) {
            pausedSounds.set(sound.key, {
                currentTime: sound.seek || 0,  // Текущая позиция в секундах
                config: sound.config          // Конфиг звука (loop, volume и т.д.)
            });
            sound.stop();  // Останавливаем, но не сбрасываем позицию
        }
    });
}

// Возобновляем звуки с сохранённой позиции
function resumeAllSounds() {
    pausedSounds.forEach((data, key) => {
        const sound = game.sound.get(key) || game.sound.add(key, data.config);
        if (sound) {
            sound.play({ seek: data.currentTime });  // Продолжаем с того же места
        }
    });
    pausedSounds.clear();
}

// Обработчики событий
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        pauseAllSounds();  // Пауза при сворачивании
    } else {
        resumeAllSounds();  // Продолжение при возвращении
    }
});

// Для мобильных устройств (блокировка экрана)
window.addEventListener('pagehide', pauseAllSounds);
window.addEventListener('pageshow', resumeAllSounds);

// Обычный ресайз
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

console.log('Game initialized with smart audio pausing');