export type FileDto = {
    fileName:       string;
    originalName:   string;
    mimeType:       string;
    buffer:         Buffer;
    size:           number;
}