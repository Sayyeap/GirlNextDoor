async function saveProgress(storyId, sceneId, dialogueIndexInScene, energy, stars, registry) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('saveProgress: Telegram WebApp SDK not loaded');
        throw new Error('Telegram WebApp SDK not loaded');
    }

    const userId = registry.get('userId');
    if (!userId) {
        console.error('saveProgress: User ID not available');
        throw new Error('User ID not available');
    }

    // Валидация параметров
    if (typeof storyId !== 'string' || storyId.trim() === '') {
        console.error('saveProgress: Invalid storyId', storyId);
        throw new Error('Invalid storyId');
    }
    if (typeof sceneId !== 'string' || sceneId.trim() === '') {
        console.error('saveProgress: Invalid sceneId', sceneId);
        throw new Error('Invalid sceneId');
    }
    if (!Number.isInteger(dialogueIndexInScene) || dialogueIndexInScene < 0) {
        console.error('saveProgress: Invalid dialogueIndexInScene', dialogueIndexInScene);
        throw new Error('Invalid dialogueIndexInScene');
    }
    if (typeof energy !== 'number' || energy < 0 || energy > 1000) { // Увеличил лимит до 1000
        console.error('saveProgress: Invalid energy', energy);
        throw new Error('Invalid energy');
    }
    if (typeof stars !== 'number' || stars < 0) {
        console.error('saveProgress: Invalid stars', stars);
        throw new Error('Invalid stars');
    }

    const progress = {
        sceneId,
        dialogueIndexInScene,
        energy,
        stars
    };

    try {
        await new Promise((resolve, reject) => {
            window.Telegram.WebApp.CloudStorage.setItem(
                `progress_${userId}_${storyId}`,
                JSON.stringify(progress),
                (error, success) => {
                    if (error) reject(error);
                    else resolve(success);
                }
            );
        });
        console.log('Saved progress:', { userId, storyId, ...progress });
    } catch (error) {
        console.error('saveProgress: Failed to save progress', error);
        throw error;
    }
}

async function loadProgress(storyId, registry) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('loadProgress: Telegram WebApp SDK not loaded');
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    const userId = registry.get('userId');
    if (!userId) {
        console.error('loadProgress: User ID not available');
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    if (typeof storyId !== 'string' || storyId.trim() === '') {
        console.error('loadProgress: Invalid storyId', storyId);
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    try {
        const progress = await new Promise((resolve, reject) => {
            window.Telegram.WebApp.CloudStorage.getItem(
                `progress_${userId}_${storyId}`,
                (error, value) => {
                    if (error || !value) reject(error || new Error('No progress found'));
                    else resolve(JSON.parse(value));
                }
            );
        });

        // Валидация загруженных данных
        if (
            typeof progress.sceneId !== 'string' ||
            !Number.isInteger(progress.dialogueIndexInScene) ||
            progress.dialogueIndexInScene < 0 ||
            typeof progress.energy !== 'number' ||
            progress.energy < 0 ||
            progress.energy > 1000 ||
            typeof progress.stars !== 'number' ||
            progress.stars < 0
        ) {
            console.error('loadProgress: Invalid progress data', progress);
            return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
        }

        console.log('Loaded progress:', { userId, storyId, ...progress });
        return progress;
    } catch (error) {
        console.error('loadProgress: Failed to load progress', error);
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }
}

async function saveVolume(volume, registry) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('saveVolume: Telegram WebApp SDK not loaded');
        throw new Error('Telegram WebApp SDK not loaded');
    }

    const userId = registry.get('userId');
    if (!userId) {
        console.error('saveVolume: User ID not available');
        throw new Error('User ID not available');
    }

    if (typeof volume !== 'number' || volume < 0 || volume > 1) {
        console.error('saveVolume: Invalid volume', volume);
        throw new Error('Invalid volume');
    }

    try {
        await new Promise((resolve, reject) => {
            window.Telegram.WebApp.CloudStorage.setItem(
                `volume_${userId}`,
                volume.toString(),
                (error, success) => {
                    if (error) reject(error);
                    else resolve(success);
                }
            );
        });
        console.log('Saved volume:', { userId, volume });
    } catch (error) {
        console.error('saveVolume: Failed to save volume', error);
        throw error;
    }
}

async function loadVolume(registry) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('loadVolume: Telegram WebApp SDK not loaded');
        return 1.0;
    }

    const userId = registry.get('userId');
    if (!userId) {
        console.error('loadVolume: User ID not available');
        return 1.0;
    }

    try {
        const volume = await new Promise((resolve, reject) => {
            window.Telegram.WebApp.CloudStorage.getItem(
                `volume_${userId}`,
                (error, value) => {
                    if (error || !value) reject(error || new Error('No volume found'));
                    else resolve(value);
                }
            );
        });

        const parsedVolume = parseFloat(volume);
        if (isNaN(parsedVolume) || parsedVolume < 0 || parsedVolume > 1) {
            console.error('loadVolume: Invalid volume data', volume);
            return 1.0;
        }

        console.log('Loaded volume:', { userId, volume: parsedVolume });
        return parsedVolume;
    } catch (error) {
        console.error('loadVolume: Failed to load volume', error);
        return 1.0;
    }
}