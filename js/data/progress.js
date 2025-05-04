async function saveProgress(storyId, sceneId, dialogueIndex, energy, stars = 0, registry = null) {
    const progress = {
        storyId,
        sceneId,
        dialogueIndex,
        energy,
        stars,
        timestamp: Date.now()
    };

    try {
        // 1. Сохраняем в Telegram Cloud Storage (если доступен)
        if (window.Telegram?.WebApp?.CloudStorage?.setItem) {
            const userId = registry?.get('userId') || 'default';
            await window.Telegram.WebApp.CloudStorage.setItem(
                `save_${userId}_${storyId}`,
                JSON.stringify(progress)
            );
            console.log('Progress saved to Telegram Cloud');
        }

        // 2. Всегда сохраняем в localStorage (для тестирования)
        localStorage.setItem(`save_${storyId}`, JSON.stringify(progress));
        console.log('Progress saved to localStorage');
    } catch (error) {
        console.error('Save error:', error);
        throw error;
    }
}

async function loadProgress(storyId, registry = null) {
    try {
        // 1. Пробуем загрузить из Telegram Cloud
        if (window.Telegram?.WebApp?.CloudStorage?.getItem) {
            const userId = registry?.get('userId') || 'default';
            const data = await window.Telegram.WebApp.CloudStorage.getItem(
                `save_${userId}_${storyId}`
            );
            if (data) {
                console.log('Progress loaded from Telegram Cloud');
                return JSON.parse(data);
            }
        }

        // 2. Fallback: localStorage
        const localData = localStorage.getItem(`save_${storyId}`);
        if (localData) {
            console.log('Progress loaded from localStorage');
            return JSON.parse(localData);
        }
    } catch (error) {
        console.error('Load error:', error);
    }

    // 3. Возвращаем данные по умолчанию
    return {
        sceneId: 'scene1',
        dialogueIndex: 0,
        energy: 100,
        stars: 0
    };
}

// Регистрируем функции глобально
window.saveProgress = saveProgress;
window.loadProgress = loadProgress;