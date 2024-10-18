/**
 * Check if the provided file type should be accepted by the input with accept attribute.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-accept
 *
 * Inspired by https://github.com/enyo/dropzone
 *
 * @param file {File} https://developer.mozilla.org/en-US/docs/Web/API/File
 * @param acceptedFiles {string|string[]}
 * @returns {boolean}
 */
export function accept(file: {
    name?: string;
    type?: string;
} | null, acceptedFiles?: string | string[]): boolean;

//# sourceMappingURL=index.d.ts.map
