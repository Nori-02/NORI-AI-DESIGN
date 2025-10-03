import React from 'react';

export interface Preset {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

export interface CameraPreset extends Preset {
    metadata: string;
}

export interface LightingPreset extends Preset {
    metadata: string;
}

export interface MockupPreset extends Preset {
    // no extra fields
}

export interface ManipulationPreset extends Preset {
    // no extra fields
}

export interface PeopleRetouchPreset extends Preset {
    // no extra fields
}

export interface RetouchPreset extends Preset {
    // no extra fields
}

export type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:4';

export interface ExportSettings {
    aspectRatio: AspectRatio;
    transparent: boolean;
}

export interface ImageFile {
    file: File;
    base64: string;
    mimeType: string;
}

export interface GenerationParams {
    cameraPresets: CameraPreset[];
    lightingPresets: LightingPreset[];
    mockupPreset: MockupPreset;
    manipulationPresets: ManipulationPreset[];
    peopleRetouchPresets: PeopleRetouchPreset[];
    retouchPresets: RetouchPreset[];
    exportSettings: ExportSettings;
    customPrompt: string;
}
