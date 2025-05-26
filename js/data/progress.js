// progress.js
(function() {
    function saveProgress(storyId, sceneId, dialogueIndex, energy, stars, registry) {
        const progress = {
            storyId: storyId,
            sceneId: sceneId,
            dialogueIndex: dialogueIndex,
            energy: energy,
            stars: stars || 0,
            timestamp: Date.now()
        };

        try {
            // Пробуем сохранить в Telegram Cloud (если доступно)
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
        // Сначала пробуем Telegram Cloud
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
                            loadFromLocalStorage(storyId, callback);
                        }
                    }
                );
            } catch (tgError) {
                console.warn('Telegram Cloud load error:', tgError);
                loadFromLocalStorage(storyId, callback);
            }
        } else {
            loadFromLocalStorage(storyId, callback);
        }
    }

    function loadFromLocalStorage(storyId, callback) {
        try {
            const data = localStorage.getItem('save_' + storyId);
            if (data) {
                console.log('Loaded from localStorage');
                callback(JSON.parse(data));
            } else {
                console.log('No saved data, using default');
                callback({
                    sceneId: 'scene1',
                    dialogueIndex: 0,
                    energy: 100,
                    stars: 0
                });
            }
        } catch (error) {
            console.error('LocalStorage load failed:', error);
            callback({
                sceneId: 'scene1',
                dialogueIndex: 0,
                energy: 100,
                stars: 0
            });
        }
    }(function() {
    function saveProgress(storyId, sceneId, dialogueIndex, energy, stars, registry) {
        const progress = {
            storyId: storyId,
            sceneId: sceneId,
            dialogueIndex: dialogueIndex,
            energy: energy,
            stars: stars || 0,
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
                            loadFromLocalStorage(storyId, callback);
                        }
                    }
                );
            } catch (tgError) {
                console.warn('Telegram Cloud load error:', tgError);
                loadFromLocalStorage(storyId, callback);
            }
        } else {
            loadFromLocalStorage(storyId, callback);
        }
    }

    function loadFromLocalStorage(storyId, callback) {
        try {
            const data = localStorage.getItem('save_' + storyId);
            if (data) {
                console.log('Loaded from localStorage');
                callback(JSON.parse(data));
            } else {
                console.log('No saved data, using default');
                callback({
                    sceneId: 'scene1',
                    dialogueIndex: 0,
                    energy: 100,
                    stars: 0
                });
            }
        } catch (error) {
            console.error('LocalStorage load failed:', error);
            callback({
                sceneId: 'scene1',
                dialogueIndex: 0,
                energy: 100,
                stars: 0
            });
        }
    }

    window.gameStorage = {
        saveProgress: saveProgress,
        loadProgress: loadProgress
    };
})();

    // Экспортируем в глобальную область видимости
    window.gameStorage = {
        saveProgress: saveProgress,
        loadProgress: loadProgress
    };
})();