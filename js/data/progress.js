(function() {
    function saveProgress(storyId, sceneId, dialogueIndex, energy, stars, registry, additionalData) {
        const progress = {
            storyId: storyId,
            sceneId: sceneId,
            dialogueIndex: dialogueIndex,
            energy: energy,
            stars: stars || 0,
            unlockedArts: additionalData?.unlockedArts || [], // Массив открытых артов
            markers: additionalData?.markers || { Friend: 0, Stalker: 0, Lover: 0 }, // Очки маркеров
            timestamp: Date.now()
        };

        try {
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
                try {
                    const userId = (registry && registry.get('userId')) || 'default';
                    window.Telegram.WebApp.CloudStorage.setItem(
                        'save_' + userId + '_' + storyId,
                        JSON.stringify(progress),
                        function(err) {
                            if (err) {
                                console.warn('Telegram Cloud save failed, using localStorage:', err);
                                saveToLocalStorage(storyId, progress);
                            } else {
                                console.log('Progress saved to Telegram Cloud');
                            }
                        }
                    );
                } catch (tgError) {
                    console.warn('Telegram Cloud error, using localStorage:', tgError);
                    saveToLocalStorage(storyId, progress);
                }
            } else {
                saveToLocalStorage(storyId, progress);
            }
        } catch (error) {
            console.error('Save progress failed completely:', error);
        }
    }

    function saveToLocalStorage(storyId, progress) {
        try {
            localStorage.setItem('save_' + storyId, JSON.stringify(progress));
            console.log('Progress saved to localStorage');
        } catch (localError) {
            console.error('LocalStorage save failed:', localError);
        }
    }

    function loadProgress(storyId, registry, callback) {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
            try {
                const userId = (registry && registry.get('userId')) || 'default';
                window.Telegram.WebApp.CloudStorage.getItem(
                    'save_' + userId + '_' + storyId,
                    function(err, data) {
                        if (!err && data) {
                            console.log('Loaded from Telegram Cloud');
                            callback(JSON.parse(data));
                        } else {
                            console.log('Telegram Cloud load failed, trying localStorage...', err);
                            loadFromLocalStorage(storyId, registry, callback);
                        }
                    }
                );
            } catch (tgError) {
                console.warn('Telegram Cloud load error:', tgError);
                loadFromLocalStorage(storyId, registry, callback);
            }
        } else {
            loadFromLocalStorage(storyId, registry, callback);
        }
    }

    function loadFromLocalStorage(storyId, registry, callback) {
        try {
            const data = localStorage.getItem('save_' + storyId);
            if (data) {
                console.log('Loaded from localStorage');
                callback(JSON.parse(data));
            } else {
                console.log('No saved data, using default');
                const currentEnergy = registry ? (registry.get('energy') || 0) : 0;
                callback({
                    sceneId: 'scene1',
                    dialogueIndex: 0,
                    energy: currentEnergy,
                    stars: 0,
                    unlockedArts: [],
                    markers: { Friend: 0, Stalker: 0, Lover: 0 } // Дефолтные значения маркеров
                });
            }
        } catch (error) {
            console.error('LocalStorage load failed:', error);
            const currentEnergy = registry ? (registry.get('energy') || 0) : 0;
            callback({
                sceneId: 'scene1',
                dialogueIndex: 0,
                energy: currentEnergy,
                stars: 0,
                unlockedArts: [],
                markers: { Friend: 0, Stalker: 0, Lover: 0 } // Дефолтные значения маркеров
            });
        }
    }

    window.gameStorage = {
        saveProgress: saveProgress,
        loadProgress: loadProgress,
        
        // Метод для разблокировки артов
        unlockArt: function(storyId, artId, registry) {
            this.loadProgress(storyId, registry, function(progress) {
                if (!progress.unlockedArts) {
                    progress.unlockedArts = [];
                }
                
                if (!progress.unlockedArts.includes(artId)) {
                    progress.unlockedArts.push(artId);
                    gameStorage.saveProgress(
                        storyId, 
                        progress.sceneId, 
                        progress.dialogueIndex, 
                        progress.energy, 
                        progress.stars, 
                        registry,
                        {
                            unlockedArts: progress.unlockedArts,
                            markers: progress.markers || { Friend: 0, Stalker: 0, Lover: 0 } // Сохраняем маркеры
                        }
                    );
                }
            });
        }
    };
})();