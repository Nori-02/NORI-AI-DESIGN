import React, { useState, useCallback, useEffect } from 'react';
// FIX: Import 'GenerationParams' to resolve type error.
import { CameraPreset, LightingPreset, MockupPreset, ManipulationPreset, PeopleRetouchPreset, RetouchPreset, ExportSettings, ImageFile, GenerationParams } from './types';
import { CAMERA_PRESETS, LIGHTING_PRESETS, MOCKUP_PRESETS, MANIPULATION_PRESETS, PEOPLE_RETOUCH_PRESETS, RETOUCH_PRESETS } from './constants';
import { generateImage, analyzeForCompositeSuggestions, generateCreativeImage } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import ImageUploader from './components/ImageUploader';
import Loader from './components/Loader';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import { SmilingTomatoIcon, SparklesIcon, WandIcon, WifiOffIcon } from './components/Icons';
import MagicCompositeToggle from './components/MagicCompositeToggle';

type Mode = 'design-kit' | 'creative-studio';

const App: React.FC = () => {
    const [mode, setMode] = useState<Mode>('design-kit');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // --- Design Kit State ---
    const [productImage, setProductImage] = useState<ImageFile | null>(null);
    const [referenceImage, setReferenceImage] = useState<ImageFile | null>(null);
    const [generatedImage, setGeneratedImage] = useState<{ base64: string; mimeType: string } | null>(null);
    
    const [selectedCameras, setSelectedCameras] = useState<CameraPreset[]>([CAMERA_PRESETS[0]]);
    const [selectedLightings, setSelectedLightings] = useState<LightingPreset[]>([LIGHTING_PRESETS[0]]);
    const [selectedMockups, setSelectedMockups] = useState<MockupPreset[]>([MOCKUP_PRESETS[0]]);
    const [selectedManipulations, setSelectedManipulations] = useState<ManipulationPreset[]>([MANIPULATION_PRESETS[0]]);
    const [selectedPeopleRetouches, setSelectedPeopleRetouches] = useState<PeopleRetouchPreset[]>([PEOPLE_RETOUCH_PRESETS[0]]);
    const [selectedRetouches, setSelectedRetouches] = useState<RetouchPreset[]>([RETOUCH_PRESETS[0]]);
    const [dkExportSettings, setDkExportSettings] = useState<ExportSettings>({ aspectRatio: '1:1', transparent: false });
    const [customPrompt, setCustomPrompt] = useState<string>('');
    const [useMagicComposite, setUseMagicComposite] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [suggestedPresetIds, setSuggestedPresetIds] = useState<Record<string, string[]>>({});
    const [error, setError] = useState<string | null>(null);
    
    // --- Creative Studio State ---
    const [creativePrompt, setCreativePrompt] = useState<string>('');
    const [inspirationImage, setInspirationImage] = useState<ImageFile | null>(null);
    const [creativeResultImage, setCreativeResultImage] = useState<{ base64: string; mimeType: string } | null>(null);
    const [isGeneratingCreative, setIsGeneratingCreative] = useState(false);
    const [creativeError, setCreativeError] = useState<string | null>(null);

    // --- Global State Handlers (e.g., Online/Offline) ---
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // --- Effects and Handlers for Design Kit ---
    useEffect(() => {
        const runAnalysis = async () => {
            if (mode === 'design-kit' && productImage && referenceImage && useMagicComposite) {
                setIsAnalyzing(true);
                setSuggestedPresetIds({}); 
                
                try {
                    const suggestions = await analyzeForCompositeSuggestions(productImage, referenceImage);
                    
                    if (suggestions.camera?.length) setSelectedCameras(CAMERA_PRESETS.filter(p => suggestions.camera.includes(p.id)));
                    if (suggestions.lighting?.length) setSelectedLightings(LIGHTING_PRESETS.filter(p => suggestions.lighting.includes(p.id)));
                    if (suggestions.manipulation?.length) setSelectedManipulations(MANIPULATION_PRESETS.filter(p => suggestions.manipulation.includes(p.id)));
                    if (suggestions.retouch?.length) setSelectedRetouches(RETOUCH_PRESETS.filter(p => suggestions.retouch.includes(p.id)));
                    if (suggestions.peopleRetouch?.length) setSelectedPeopleRetouches(PEOPLE_RETOUCH_PRESETS.filter(p => suggestions.peopleRetouch.includes(p.id)));
                    
                    setSuggestedPresetIds(suggestions);
                } catch (e) {
                     console.error("Failed to analyze for composite suggestions:", e);
                     setError("AI analysis failed. Please check the console for details.");
                } finally {
                    setIsAnalyzing(false);
                }
            }
        };
        runAnalysis();
    }, [productImage, referenceImage, useMagicComposite, mode]);


    const createToggleHandler = useCallback(<T extends { id: string }>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        presets: readonly T[]
    ) => (preset: T) => {
        setter(prev => {
            const isSelected = prev.some(p => p.id === preset.id);
            const nonePreset = presets.find(p => p.id === 'none')!;

            if (preset.id === 'none') {
                return [nonePreset];
            }

            let newSelection;
            if (isSelected) {
                if (prev.length === 1) {
                    return [nonePreset];
                }
                newSelection = prev.filter(p => p.id !== preset.id);
            } else {
                newSelection = [...prev.filter(p => p.id !== 'none'), preset];
            }
            
            return newSelection;
        });
    }, []);

    const handleCameraToggle = createToggleHandler(setSelectedCameras, CAMERA_PRESETS);
    const handleLightingToggle = createToggleHandler(setSelectedLightings, LIGHTING_PRESETS);
    const handleManipulationToggle = createToggleHandler(setSelectedManipulations, MANIPULATION_PRESETS);
    const handlePeopleRetouchToggle = createToggleHandler(setSelectedPeopleRetouches, PEOPLE_RETOUCH_PRESETS);
    const handleRetouchToggle = createToggleHandler(setSelectedRetouches, RETOUCH_PRESETS);
    
    const handleMockupSelect = useCallback((preset: MockupPreset) => {
        setSelectedMockups(currentSelected =>
            currentSelected[0]?.id === preset.id
            ? [MOCKUP_PRESETS[0]]
            : [preset]
        );
    }, []);
    
    const handleMagicCompositeToggle = (enabled: boolean) => {
        setUseMagicComposite(enabled);
        if (!enabled) {
            setSelectedCameras([CAMERA_PRESETS[0]]);
            setSelectedLightings([LIGHTING_PRESETS[0]]);
            setSelectedManipulations([MANIPULATION_PRESETS[0]]);
            setSelectedRetouches([RETOUCH_PRESETS[0]]);
            setSelectedPeopleRetouches([PEOPLE_RETOUCH_PRESETS[0]]);
            setSuggestedPresetIds({});
        }
    };


    const handleDesignKitGeneration = useCallback(async () => {
        if (!isOnline) {
            setError("You are offline. Please check your internet connection.");
            return;
        }
        if (!productImage) {
            setError("Please upload a product image first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        const params: GenerationParams = {
            cameraPresets: selectedCameras,
            lightingPresets: selectedLightings,
            mockupPreset: selectedMockups[0],
            manipulationPresets: selectedManipulations,
            peopleRetouchPresets: selectedPeopleRetouches,
            retouchPresets: selectedRetouches,
            exportSettings: dkExportSettings,
            customPrompt,
        };

        try {
            const result = await generateImage(
                productImage,
                referenceImage,
                useMagicComposite,
                params
            );
            if (result) {
                setGeneratedImage({ base64: result.base64, mimeType: result.mimeType });
            } else {
                setError("The AI could not generate an image. Please try again with a different prompt or images.");
            }
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [productImage, referenceImage, useMagicComposite, selectedCameras, selectedLightings, selectedMockups, selectedManipulations, selectedPeopleRetouches, selectedRetouches, dkExportSettings, customPrompt, isOnline]);
    
    const canGenerateDK = productImage && !isLoading && isOnline;

    // --- Handlers for Creative Studio ---
    const handleCreativeGeneration = useCallback(async () => {
        if (!isOnline) {
            setCreativeError("You are offline. Please check your internet connection.");
            return;
        }
        if (!inspirationImage) {
            setCreativeError("Please upload a base image to edit.");
            return;
        }
        if (!creativePrompt.trim()) {
            setCreativeError("Please enter a prompt to describe your edit.");
            return;
        }

        setIsGeneratingCreative(true);
        setCreativeError(null);
        setCreativeResultImage(null);

        try {
            const result = await generateCreativeImage(creativePrompt, inspirationImage);
            
            if (result) {
                setCreativeResultImage(result);
            } else {
                setCreativeError("The AI could not edit the image. Try a different prompt.");
            }
        } catch (e) {
            console.error(e);
            setCreativeError(e instanceof Error ? e.message : "An unknown error occurred during image editing.");
        } finally {
            setIsGeneratingCreative(false);
        }
    }, [creativePrompt, inspirationImage, isOnline]);

    const canGenerateCS = creativePrompt.trim().length > 0 && !!inspirationImage && !isGeneratingCreative && isOnline;

    const ModeSwitcher = () => (
        <div className="flex items-center bg-gray-800 rounded-full p-1 border border-gray-700">
            <button
                onClick={() => setMode('design-kit')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-2 ${mode === 'design-kit' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
                <WandIcon className="w-5 h-5" /> Design Kit
            </button>
            <button
                onClick={() => setMode('creative-studio')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors flex items-center gap-2 ${mode === 'creative-studio' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
                <SparklesIcon className="w-5 h-5" /> Creative Studio
            </button>
        </div>
    );
    
    const OfflineBanner = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-500/10 backdrop-blur-sm border-t border-yellow-500/30 text-yellow-200 p-3 text-center text-sm z-50 flex items-center justify-center gap-3">
            <WifiOffIcon className="w-5 h-5" />
            <span>You are currently offline. Some features may be unavailable.</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-gray-200 flex flex-col font-sans">
            <header className="bg-gray-900/70 backdrop-blur-sm border-b border-gray-800 px-6 py-3 sticky top-0 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <SmilingTomatoIcon className="w-8 h-8 text-red-400" />
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        TOMATO AI
                    </h1>
                </div>
                <ModeSwitcher />
                <div />
            </header>
            
            {mode === 'design-kit' && (
                <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-screen-2xl mx-auto w-full overflow-hidden">
                    {/* Left Panel: Inputs */}
                    <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col space-y-8 overflow-y-auto">
                        <ImageUploader
                            title="1. Product Image"
                            description="Upload your raw product photo."
                            onImageChange={setProductImage}
                        />
                        <ImageUploader
                            title="2. Reference Image (Optional)"
                            description="Provides stylistic inspiration for the AI to generate a new background."
                            onImageChange={setReferenceImage}
                        />
                        <MagicCompositeToggle isEnabled={useMagicComposite} onToggle={handleMagicCompositeToggle} />
                        <div>
                            <h3 className="font-semibold text-gray-300 text-lg">3. Custom Prompt (Optional)</h3>
                            <p className="text-sm text-gray-500 mb-3">Describe any specific changes or additions.</p>
                            <textarea
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder="e.g., 'Make the product float...', 'Add a splash of water...'"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors h-28 resize-y"
                                aria-label="Custom prompt for image generation"
                            />
                        </div>
                    </div>

                    {/* Center Panel: Viewer */}
                    <div className="lg:col-span-6 bg-gray-900 border border-gray-800 rounded-xl p-1 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0">
                        {isLoading && <Loader />}
                        {!isLoading && !generatedImage && (
                            <div className="text-center text-gray-600 p-8 flex flex-col items-center justify-center animate-pulse-slow">
                                <SmilingTomatoIcon className="w-20 h-20 text-gray-700 mb-6" />
                                <p className="text-lg font-medium text-gray-500">Your creation will appear here</p>
                                <p className="text-sm text-gray-600">Let's make something amazing.</p>
                            </div>
                        )}
                        {generatedImage && productImage && !isLoading && (
                            <BeforeAfterSlider 
                                beforeSrc={`data:${productImage.mimeType};base64,${productImage.base64}`}
                                afterSrc={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`}
                            />
                        )}
                        {error && !isLoading && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-xl">
                                <div className="text-center text-red-400">
                                    <p className="text-lg font-bold">Generation Failed</p>
                                    <p className="text-sm mt-2 max-w-sm">{error}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Controls */}
                    <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-gray-800 shrink-0">
                            <h2 className="text-lg font-bold tracking-widest text-center uppercase text-gray-300">DESIGN KIT</h2>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <ControlPanel 
                                selectedCameras={selectedCameras}
                                onCameraSelect={handleCameraToggle}
                                selectedLightings={selectedLightings}
                                onLightingSelect={handleLightingToggle}
                                selectedMockups={selectedMockups}
                                onMockupSelect={handleMockupSelect}
                                selectedManipulations={selectedManipulations}
                                onManipulationSelect={handleManipulationToggle}
                                selectedPeopleRetouches={selectedPeopleRetouches}
                                onPeopleRetouchSelect={handlePeopleRetouchToggle}
                                selectedRetouches={selectedRetouches}
                                onRetouchSelect={handleRetouchToggle}
                                exportSettings={dkExportSettings}
                                setExportSettings={setDkExportSettings}
                                referenceImage={referenceImage}
                                isAnalyzing={isAnalyzing}
                                suggestedPresetIds={suggestedPresetIds}
                            />
                    </div>
                        <div className="p-6 border-t border-gray-800 bg-gray-900/50 shrink-0">
                            <button
                                onClick={handleDesignKitGeneration}
                                disabled={!canGenerateDK}
                                className={`w-full py-3 px-4 text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] ${
                                    canGenerateDK 
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20' 
                                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                }`}
                                title={!isOnline ? "You are offline. Please check your connection." : ""}
                            >
                            {isLoading ? 'Generating...' : isAnalyzing ? 'AI is Thinking...' : 'Generate Image'}
                            {!isAnalyzing && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>}
                            {isAnalyzing && <div className="w-6 h-6 border-2 border-t-white border-white/30 rounded-full animate-spin ml-2"></div>}
                            </button>
                            {generatedImage && !isLoading && (
                                <a 
                                    href={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`} 
                                    download="ai-product-shot.png"
                                    className="w-full py-3 px-4 mt-3 text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Download Image
                                </a>
                            )}
                        </div>
                    </div>
                </main>
            )}

            {mode === 'creative-studio' && (
                 <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-screen-2xl mx-auto w-full overflow-hidden">
                    {/* Left Panel: Creative Controls */}
                    <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col space-y-8 overflow-y-auto">
                        <div>
                            <h2 className="text-lg font-bold tracking-widest text-center uppercase text-gray-300 mb-6">CREATIVE STUDIO</h2>
                        </div>
                        <ImageUploader
                            title="1. Base Image"
                            description="Upload the image you want the AI to edit and transform."
                            onImageChange={setInspirationImage}
                        />
                        <div>
                            <h3 className="font-semibold text-gray-300 text-lg">2. Creative Prompt</h3>
                            <p className="text-sm text-gray-500 mb-3">Describe how you want to change the image.</p>
                            <textarea
                                value={creativePrompt}
                                onChange={(e) => setCreativePrompt(e.target.value)}
                                placeholder="e.g., 'Add a crown on his head', 'Change the background to a futuristic city', 'Make the product look like it's made of wood...'"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors h-40 resize-y"
                                aria-label="Creative prompt for image editing"
                            />
                        </div>
                         <div className="pt-4 flex-grow flex flex-col justify-end">
                            <button
                                onClick={handleCreativeGeneration}
                                disabled={!canGenerateCS}
                                className={`w-full py-3 px-4 text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] ${
                                    canGenerateCS 
                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20' 
                                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                }`}
                                title={!isOnline ? "You are offline. Please check your connection." : !inspirationImage ? "Please upload a base image first." : ""}
                            >
                                {isGeneratingCreative ? 'Generating...' : 'Generate'}
                                {isGeneratingCreative 
                                    ? <div className="w-6 h-6 border-2 border-t-white border-white/30 rounded-full animate-spin ml-2"></div>
                                    : <SparklesIcon className="h-6 w-6 ml-2" />
                                }
                            </button>
                             {creativeResultImage && !isGeneratingCreative && (
                                 <a
                                     href={`data:${creativeResultImage.mimeType};base64,${creativeResultImage.base64}`}
                                     download="creative-studio-edit.png"
                                     className="w-full py-3 px-4 mt-3 text-lg font-bold rounded-lg transition-all duration-300 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
                                 >
                                     Download Image
                                 </a>
                             )}
                        </div>
                    </div>
                    {/* Right Panel: Creative Viewer */}
                    <div className="lg:col-span-9 bg-gray-900 border border-gray-800 rounded-xl p-1 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0 overflow-y-auto">
                        {isGeneratingCreative && <Loader />}
                        {!isGeneratingCreative && !creativeResultImage && (
                             <div className="text-center text-gray-600 p-8 flex flex-col items-center justify-center animate-pulse-slow">
                                <SparklesIcon className="w-20 h-20 text-gray-700 mb-6" />
                                <p className="text-lg font-medium text-gray-500">Your edited creation will appear here</p>
                                <p className="text-sm text-gray-600">Upload an image and describe your vision.</p>
                            </div>
                        )}
                        {creativeResultImage && inspirationImage && !isGeneratingCreative && (
                           <BeforeAfterSlider
                                beforeSrc={`data:${inspirationImage.mimeType};base64,${inspirationImage.base64}`}
                                afterSrc={`data:${creativeResultImage.mimeType};base64,${creativeResultImage.base64}`}
                           />
                        )}
                         {creativeError && !isGeneratingCreative && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-xl">
                                <div className="text-center text-red-400">
                                    <p className="text-lg font-bold">Generation Failed</p>
                                    <p className="text-sm mt-2 max-w-sm">{creativeError}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            )}
            {!isOnline && <OfflineBanner />}
        </div>
    );
};

export default App;