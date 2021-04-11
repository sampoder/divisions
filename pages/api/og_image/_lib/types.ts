export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    house: string;
    date: string;
    status: string;
    percent: string;
    title: string;
    aye: string[];
    nay: string[];
    widths: string[];
    heights: string[];
}
