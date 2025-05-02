async function saveProgress(storyId, sceneId, dialogueIndexInScene, energy, stars) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('saveProgress: Telegram WebApp SDK not loaded');
        return;
    }

    const userId = window.gameConfig?.userId;
    if (!userId) {
        console.error('saveProgress: User ID not available');
        return;
    }

    // Валидация параметров
    if (typeof storyId !== 'string' || storyId.trim() === '') {
        console.error('saveProgress: Invalid storyId', storyId);
        return;
    }
    if (typeof sceneId !== 'string' || sceneId.trim() === '') {
        console.error('saveProgress: Invalid sceneId', sceneId);
        return;
    }
    if (!Number.isInteger(dialogueIndexInScene) || dialogueIndexInScene < 0) {
        console.error('saveProgress: Invalid dialogueIndexInScene', dialogueIndexInScene);
        return;
    }
    if (typeof energy !== 'number' || energy < 0 || energy > 100) {
        console.error('saveProgress: Invalid energy', energy);
        return;
    }
    if (typeof stars !== 'number' || stars < 0) {
        console.error('saveProgress: Invalid stars', stars);
        return;
    }

    const progress = {
        sceneId,
        dialogueIndexInScene,
        energy,
        stars
    };

    try {
        await Telegram.WebApp.CloudStorage.setItem(`progress_${userId}_${storyId}`, JSON.stringify(progress));
        console.log('Saved progress:', { userId, storyId, ...progress });
    } catch (error) {
        console.error('saveProgress: Failed to save progress', error);
    }
}

async function loadProgress(storyId) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('loadProgress: Telegram WebApp SDK not loaded');
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    const userId = window.gameConfig?.userId;
    if (!userId) {
        console.error('loadProgress: User ID not available');
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    if (typeof storyId !== 'string' || storyId.trim() === '') {
        console.error('loadProgress: Invalid storyId', storyId);
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }

    try {
        const progress = await Telegram.WebApp.CloudStorage.getItem(`progress_${userId}_${storyId}`);
        if (!progress) {
            console.log('loadProgress: No progress found for', { userId, storyId });
            return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
        }

        const parsed = JSON.parse(progress);

        // Валидация загруженных данных
        if (
            typeof parsed.sceneId !== 'string' ||
            !Number.isInteger(parsed.dialogueIndexInScene) ||
            parsed.dialogueIndexInScene < 0 ||
            typeof parsed.energy !== 'number' ||
            parsed.energy < 0 ||
            parsed.energy > 100 ||
            typeof parsed.stars !== 'number' ||
            parsed.stars < 0
        ) {
            console.error('loadProgress: Invalid progress data', parsed);
            return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
        }

        console.log('Loaded progress:', { userId, storyId, ...parsed });
        return parsed;
    } catch (error) {
        console.error('loadProgress: Failed to load progress', error);
        return { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100, stars: 0 };
    }
}

async function saveVolume(volume) {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('saveVolume: Telegram WebApp SDK not loaded');
        return;
    }

    const userId = window.gameConfig?.userId;
    if (!userId) {
        console.error('saveVolume: User ID not available');
        return;
    }

    if (typeof volume !== 'number' || volume < 0 || volume > 1) {
        console.error('saveVolume: Invalid volume', volume);
        return;
    }

    try {
        await Telegram.WebApp.CloudStorage.setItem(`volume_${userId}`, volume.toString());
        console.log('Saved volume:', { userId, volume });
    } catch (error) {
        console.error('saveVolume: Failed to save volume', error);
    }
}

async function loadVolume() {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.error('loadVolume: Telegram WebApp SDK not loaded');
        return 1.0;
    }

    const userId = window.gameConfig?.userId;
    if (!userId) {
        console.error('loadVolume: User ID not available');
        return 1.0;
    }

    try {
        const volume = await Telegram.WebApp.CloudStorage.getItem(`volume_${userId}`);
        if (!volume) {
            console.log('loadVolume: No volume found for', { userId });
            return 1.0;
        }

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