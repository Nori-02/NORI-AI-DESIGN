import React from 'react';
import { CameraPreset, LightingPreset, MockupPreset, ManipulationPreset, RetouchPreset, PeopleRetouchPreset, ExportSettings, ImageFile } from '../types';
import { CAMERA_PRESETS, LIGHTING_PRESETS, MOCKUP_PRESETS, MANIPULATION_PRESETS, RETOUCH_PRESETS, PEOPLE_RETOUCH_PRESETS } from '../constants';
import { CameraIcon, SunIcon, CubeTransparentIcon, WandIcon, LayersIcon, UserIcon, CogIcon } from './Icons';
import AccordionItem from './AccordionItem';
import PresetSelector from './PresetSelector';
import ExportControls from './ExportControls';

interface ControlPanelProps {
  selectedCameras: CameraPreset[];
  onCameraSelect: (preset: CameraPreset) => void;
  selectedLightings: LightingPreset[];
  onLightingSelect: (preset: LightingPreset) => void;
  selectedMockups: MockupPreset[];
  onMockupSelect: (preset: MockupPreset) => void;
  selectedManipulations: ManipulationPreset[];
  onManipulationSelect: (preset: ManipulationPreset) => void;
  selectedPeopleRetouches: PeopleRetouchPreset[];
  onPeopleRetouchSelect: (preset: PeopleRetouchPreset) => void;
  selectedRetouches: RetouchPreset[];
  onRetouchSelect: (preset: RetouchPreset) => void;
  exportSettings: ExportSettings;
  setExportSettings: (settings: ExportSettings) => void;
  referenceImage: ImageFile | null;
  isAnalyzing: boolean;
  suggestedPresetIds: Record<string, string[]>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    selectedCameras,
    onCameraSelect,
    selectedLightings,
    onLightingSelect,
    selectedMockups,
    onMockupSelect,
    selectedManipulations,
    onManipulationSelect,
    selectedPeopleRetouches,
    onPeopleRetouchSelect,
    selectedRetouches,
    onRetouchSelect,
    exportSettings,
    setExportSettings,
    referenceImage,
    isAnalyzing,
    suggestedPresetIds,
}) => {
    const isCompositeMode = !!referenceImage;

    return (
        <>
            <AccordionItem title="Camera" icon={<CameraIcon className="w-6 h-6 text-purple-400" />} isOpenDefault={false} isAnalyzing={isAnalyzing}>
                <PresetSelector presets={CAMERA_PRESETS} selectedPresets={selectedCameras} onSelect={onCameraSelect} suggestedIds={suggestedPresetIds.camera} />
            </AccordionItem>
            <AccordionItem title="Lighting" icon={<SunIcon className="w-6 h-6 text-purple-400" />} isAnalyzing={isAnalyzing}>
                <PresetSelector presets={LIGHTING_PRESETS} selectedPresets={selectedLightings} onSelect={onLightingSelect} suggestedIds={suggestedPresetIds.lighting} />
            </AccordionItem>
            <AccordionItem
                title="Mockup (If no reference)"
                icon={<CubeTransparentIcon className="w-6 h-6 text-purple-400" />}
                isDisabled={isCompositeMode}
                disabledReason="Mockups are not used when a reference image is provided."
            >
                <PresetSelector presets={MOCKUP_PRESETS} selectedPresets={selectedMockups} onSelect={onMockupSelect} />
            </AccordionItem>
            <AccordionItem title="Manipulation" icon={<LayersIcon className="w-6 h-6 text-purple-400" />} isAnalyzing={isAnalyzing}>
                <PresetSelector presets={MANIPULATION_PRESETS} selectedPresets={selectedManipulations} onSelect={onManipulationSelect} suggestedIds={suggestedPresetIds.manipulation} />
            </AccordionItem>
            <AccordionItem title="Product Retouch" icon={<WandIcon className="w-6 h-6 text-purple-400" />} isAnalyzing={isAnalyzing}>
                <PresetSelector presets={RETOUCH_PRESETS} selectedPresets={selectedRetouches} onSelect={onRetouchSelect} suggestedIds={suggestedPresetIds.retouch} />
            </AccordionItem>
            <AccordionItem title="People Retouch" icon={<UserIcon className="w-6 h-6 text-purple-400" />} isAnalyzing={isAnalyzing}>
                <PresetSelector presets={PEOPLE_RETOUCH_PRESETS} selectedPresets={selectedPeopleRetouches} onSelect={onPeopleRetouchSelect} suggestedIds={suggestedPresetIds.peopleRetouch} />
            </AccordionItem>
            <AccordionItem title="Export Settings" icon={<CogIcon className="w-6 h-6 text-purple-400" />} isOpenDefault={true}>
                <ExportControls settings={exportSettings} setSettings={setExportSettings} />
            </AccordionItem>
        </>
    );
};

export default ControlPanel;
