function saveProgress(storyId, dialogueIndex, energy) {
    localStorage.setItem(`progress_${storyId}`, JSON.stringify({
        dialogueIndex,
        energy
    }));
}

function loadProgress(storyId) {
    const progress = localStorage.getItem(`progress_${storyId}`);
    return progress ? JSON.parse(progress) : { dialogueIndex: 0, energy: 100 };
}