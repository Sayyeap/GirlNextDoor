export class AudioManager {
    constructor(game) {
        this.game = game;
        this.context = game.sound.context;
        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);

        const savedVolume = localStorage.getItem('game_volume');
        this.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
        this.masterGain.gain.value = this.volume;

        this.patchAllSounds();

        this._bindActivityListeners();
        this._startIdleCheck();
    }

    setVolume(value) {
        this.volume = Phaser.Math.Clamp(value, 0, 1);
        this.masterGain.gain.value = this.volume;
        localStorage.setItem('game_volume', this.volume.toString());
    }

    getVolume() {
        return this.volume;
    }

    patchAllSounds() {
        this.game.sound.sounds.forEach(sound => this.patchSound(sound));
        this.game.sound.on('added', sound => this.patchSound(sound));
    }

    patchSound(sound) {
        if (sound.source && sound.source.mediaElement) {
            return; // Пропускаем HTML5 аудио
        }

        if (!sound._customGainNode) {
            const sourceNode = sound.source;
            const originalNode = sourceNode._node;

            const gainNode = this.context.createGain();
            gainNode.gain.value = 1;

            sourceNode._node.disconnect();
            sourceNode._node.connect(gainNode);
            gainNode.connect(this.masterGain);

            sound._customGainNode = gainNode;
        }
    }

    _bindActivityListeners() {
        const resumeContext = () => {
            if (this.context.state === 'suspended') {
                this.context.resume();
            }
        };
        window.addEventListener('pointerdown', resumeContext);
        window.addEventListener('keydown', resumeContext);
    }

    _startIdleCheck() {
        this.lastInteraction = Date.now();
        const check = () => {
            const now = Date.now();
            if (now - this.lastInteraction > 1000 * 60 * 2) { // 2 минуты
                if (this.context.state === 'running') {
                    this.context.suspend();
                }
            }
            requestAnimationFrame(check);
        };
        check();
    }
}
