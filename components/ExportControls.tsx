
import React from 'react';
import { ExportSettings, AspectRatio } from '../types';
import { EXPORT_ASPECT_RATIOS } from '../constants';

interface ExportControlsProps {
    settings: ExportSettings;
    setSettings: (settings: ExportSettings) => void;
    hideTransparency?: boolean;
}

const ExportControls: React.FC<ExportControlsProps> = ({ settings, setSettings, hideTransparency = false }) => {
    const handleAspectRatioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({ ...settings, aspectRatio: e.target.value as AspectRatio });
    };

    const handleTransparencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, transparent: e.target.checked });
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-400 mb-1">Aspect Ratio</label>
                <select
                    id="aspectRatio"
                    value={settings.aspectRatio}
                    onChange={handleAspectRatioChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                    {EXPORT_ASPECT_RATIOS.map(ratio => (
                        <option key={ratio.value} value={ratio.value} className="bg-gray-800">{ratio.label} ({ratio.value})</option>
                    ))}
                </select>
            </div>
            {!hideTransparency && (
                <div className="flex items-center">
                    <input
                        id="transparent"
                        type="checkbox"
                        checked={settings.transparent}
                        onChange={handleTransparencyChange}
                        className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-offset-0 focus:ring-offset-gray-800 focus:ring-purple-500"
                    />
                    <label htmlFor="transparent" className="ml-3 block text-sm text-gray-300">
                        Transparent Background (PNG)
                    </label>
                </div>
            )}
        </div>
    );
};

export default ExportControls;
