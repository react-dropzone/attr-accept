/**
 * Check if the provided file type should be accepted by the input with accept attribute.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
 *
 * Borrowed from https://github.com/enyo/dropzone
 *
 * @param file {File} https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param acceptedFiles {string}
 * @returns {boolean}
 */

export default function(file, acceptedFiles) {
    if (acceptedFiles) {
        const acceptedFilesArray = acceptedFiles.split(',');
        const mimeType = file.type;
        const baseMimeType = mimeType.replace(/\/.*$/, '');

        return acceptedFilesArray.some(type => {
            const validType = type.trim();
            if (validType.charAt(0) === '.') {
                return (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1);
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, '');
            }
            return mimeType === validType;
        });
    }
    return true;
}
