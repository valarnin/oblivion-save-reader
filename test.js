
document.addEventListener('DOMContentLoaded', () => {
    const ignoreEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Handle drag+drop of files. Have to ignore dragenter/dragover for compatibility reasons.
    document.body.addEventListener('dragenter', ignoreEvent);
    document.body.addEventListener('dragover', ignoreEvent);

    /**
     * @param {DragEvent} e 
     */
    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt) {
            const files = dt.files;
            for (const file of files)
            void file.arrayBuffer().then((b) => {
                const saveFile = new window.oblivionSaveFile.SaveFile(b);
                console.log(saveFile);
                window.saveFile = saveFile;
            });
        }
    };

    document.body.addEventListener('drop', dropHandler);
});