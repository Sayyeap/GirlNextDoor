function saveProgress(storyId, sceneId, dialogueIndexInScene, energy) {
    localStorage.setItem(`progress_${storyId}`, JSON.stringify({
        sceneId,
        dialogueIndexInScene,
        energy
    }));
}

function loadProgress(storyId) {
    const progress = localStorage.getItem(`progress_${storyId}`);
    return progress ? JSON.parse(progress) : { sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100 };
}