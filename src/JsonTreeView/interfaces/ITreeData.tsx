import { ITreeMetadata } from './ITreeMetadata';

export interface ITreeData {
    id: number;
    label: string;
    metadata: ITreeMetadata[];
    children? : ITreeData;
    
}

