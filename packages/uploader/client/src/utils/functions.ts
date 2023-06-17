export function getFileData(file: File) {
    const name = file.name;
    const dot = name.lastIndexOf('.');
    return {
        file,
        name: name.substring(0, dot),
        ext: name.substring(dot + 1),
    };
}
