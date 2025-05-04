import { Howl, Howler } from 'howler';

export class AudioManager {
    constructor() {
        const savedVolume = localStorage.getItem('volume');
        this.volume = savedVolume !== null ? parseFloat(savedVolume) : 1.0;
        Howler.volume(this.volume);

        this.sounds = new Map(); // name → Howl
        this.music = null;
    }

    setVolume(value) {
        this.volume = Phaser.Math.Clamp(value, 0, 1);
        Howler.volume(this.volume);
        localStorage.setItem('volume', this.volume.toString());
    }

    getVolume() {
        return this.volume;
    }

    setMasterVolume(value) {
        this.setVolume(value);
    }

    getMasterVolume() {
        return this.getVolume();
    }

    loadSound(name, src) {
        const sound = new Howl({
            src: [src],
            volume: 1.0
        });
        this.sounds.set(name, sound);
    }

    playSound(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.play();
        } else {
            console.warn(`Звук "${name}" не найден`);
        }
    }

    playMusic(src, loop = true) {
        if (this.music) {
            this.music.stop();
            this.music.unload();
        }

        this.music = new Howl({
            src: [src],
            loop,
            volume: 1.0
        });

        this.music.play();
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
        }
    }
}
