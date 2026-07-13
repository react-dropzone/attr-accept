/**
 * A minimal subset of the {@link File} interface: the fields `accept` reads.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/File
 */
export interface FileWithType {
  /** The file name, e.g. `my-photo.png`. */
  name?: string;
  /** The MIME type, e.g. `image/png`. */
  type?: string;
}

/**
 * Check if the provided file should be accepted by an `<input type="file">`
 * with the given `accept` attribute value.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept
 *
 * Inspired by https://github.com/enyo/dropzone.
 *
 * @param file The file to check. When omitted or `null`, the file is accepted.
 * @param acceptedFiles One or more MIME types and/or file extensions, either as
 * a comma-delimited string or an array. When omitted or empty, any file is accepted.
 * @returns `true` if the file matches (or when there is nothing to match against).
 */
export default function accept(file?: FileWithType | null, acceptedFiles?: string | string[]): boolean {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
    if (acceptedFilesArray.length === 0) {
      return true;
    }
    const fileName = file.name || "";
    const mimeType = (file.type || "").toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, "");

    return acceptedFilesArray.some(type => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === ".") {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith("/*")) {
        // This is something like an image/* MIME type.
        return baseMimeType === validType.replace(/\/.*$/, "");
      }
      return mimeType === validType;
    });
  }
  return true;
}
