import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GenerationParams, ImageFile } from '../types';

// According to guidelines, API key must be from process.env.API_KEY
const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface AnalysisResult {
    camera: string[];
    lighting: string[];
    mockup: string[];
    manipulation: string[];
    retouch: string[];
    peopleRetouch: string[];
}

export const analyzeForCompositeSuggestions = async (productImage: ImageFile, referenceImage: ImageFile): Promise<AnalysisResult> => {
    const model = 'gemini-2.5-flash';

    const productPart = { inlineData: { mimeType: productImage.mimeType, data: productImage.base64 } };
    const referencePart = { inlineData: { mimeType: referenceImage.mimeType, data: referenceImage.base64 } };

    const prompt = `You are a professional art director. Analyze the provided product image (first) and the reference/style image (second).
    
    Your goal is to suggest the best technical and creative presets to create a high-end advertisement by placing the product into a NEW scene that is HEAVILY INSPIRED by the reference image's style, mood, and lighting. Do NOT suggest simply putting the product into the reference image.
    
    Your response MUST be in JSON format. Provide suggestions for the following categories by returning the preset 'id's.
    - "camera": Suggest 1-2 camera presets that would best frame the product in a scene like the reference.
    - "lighting": Suggest 1-2 lighting presets that mimic the reference image's mood.
    - "manipulation": Suggest 2-3 manipulation/FX presets to seamlessly blend the product and achieve the desired style (e.g., atmospheric effects, reflections).
    - "retouch": Suggest 1-2 essential product retouching presets.
    - "peopleRetouch": If the product is for people (e.g., makeup) or the reference has people, suggest 1 preset. Otherwise, return an empty array.
    - "mockup": Return an empty array. Mockups are not used with reference images.
    
    Example response:
    {
      "camera": ["hero-45"],
      "lighting": ["day-02"],
      "mockup": [],
      "manipulation": ["shadow-synthesis", "atmospheric-fx", "ibl-match"],
      "retouch": ["cleanup", "specular-control"],
      "peopleRetouch": []
    }`;


    try {
        const response = await genAI.models.generateContent({
            model: model,
            contents: { parts: [productPart, referencePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        camera: { type: Type.ARRAY, items: { type: Type.STRING } },
                        lighting: { type: Type.ARRAY, items: { type: Type.STRING } },
                        mockup: { type: Type.ARRAY, items: { type: Type.STRING } },
                        manipulation: { type: Type.ARRAY, items: { type: Type.STRING } },
                        retouch: { type: Type.ARRAY, items: { type: Type.STRING } },
                        peopleRetouch: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ["camera", "lighting", "mockup", "manipulation", "retouch", "peopleRetouch"]
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisResult;
    } catch (error) {
        console.error("Error analyzing composite image:", error);
        throw new Error("Failed to get composite suggestions from AI.");
    }
};

export const generateImage = async (
    productImage: ImageFile,
    referenceImage: ImageFile | null,
    useMagicComposite: boolean,
    params: GenerationParams,
): Promise<{ base64: string; mimeType: string } | null> => {
    
    const {
        cameraPresets,
        lightingPresets,
        mockupPreset,
        manipulationPresets,
        retouchPresets,
        peopleRetouchPresets,
        exportSettings,
        customPrompt,
    } = params;

    const model = 'gemini-2.5-flash-image';
    
    let prompt = `You are an expert product photographer and digital artist.
Your task is to create a dynamic, professional advertisement image for the provided product (the FIRST image) from scratch, placing it within a newly generated, photorealistic scene.

--- PRIMARY SCENE GOAL ---\n`;

    if (referenceImage) {
        prompt += `The SECOND image provided is a reference for style and mood.
**IMPORTANT:** Do NOT composite the product into the reference image.
Instead, generate a NEW, unique background scene that is heavily INSPIRED by the reference image. Capture its atmosphere, lighting, color palette, and overall aesthetic. The final result should look like the product was photographed in a location similar to the reference image, but it must be a completely new scene.\n\n`;
    } else if (mockupPreset && mockupPreset.id !== 'none') {
        prompt += `Place the product in a photorealistic "${mockupPreset.name}" environment. Description for context: ${mockupPreset.description}.\n\n`;
    } else {
        prompt += "Place the product on a clean, elegant, professional studio backdrop that complements its style and the instructions below.\n\n";
    }
    
    prompt += "--- CREATIVE & TECHNICAL INSTRUCTIONS ---\n";
    prompt += `${useMagicComposite ? "**Magic Composite Mode is ON**: You have creative freedom to interpret these instructions to create the most stunning image possible.\n" : "**Manual Design Kit Mode is ON**: Strictly adhere to the following instructions.\n"}`;

    if (customPrompt) {
        prompt += `\n- **Creative Direction**: "${customPrompt}"\n`;
    }

    if (cameraPresets.length > 0 && cameraPresets.some(p => p.id !== 'none')) {
        prompt += `- **Camera Instructions**:\n`;
        cameraPresets.forEach(p => { if (p.id !== 'none') prompt += `  - ${p.name}: ${p.description}. Technical hint: ${p.metadata}\n`; });
    }
    
    if (lightingPresets.length > 0 && lightingPresets.some(p => p.id !== 'none')) {
        prompt += `- **Lighting Instructions**:\n`;
        lightingPresets.forEach(p => { if (p.id !== 'none') prompt += `  - ${p.name}: ${p.description}. Technical hint: ${p.metadata}\n`; });
    }
    
    prompt += "\n\n--- POST-PRODUCTION & RETOUCHING ---";

    if (retouchPresets.length > 0 && retouchPresets.some(p => p.id !== 'none')) {
        prompt += `\n- **Product Retouching**:\n`;
        retouchPresets.forEach(p => { if (p.id !== 'none') prompt += `  - ${p.name}: ${p.description}.\n`; });
    }

    if (peopleRetouchPresets.length > 0 && peopleRetouchPresets.some(p => p.id !== 'none')) {
        prompt += `- **People Retouching**:\n`;
        peopleRetouchPresets.forEach(p => { if (p.id !== 'none') prompt += `  - ${p.name}: ${p.description}.\n`; });
    }

    if (manipulationPresets.length > 0 && manipulationPresets.some(p => p.id !== 'none')) {
        prompt += `- **Creative Manipulations & FX**:\n`;
        manipulationPresets.forEach(p => { if (p.id !== 'none') prompt += `  - ${p.name}: ${p.description}.\n`; });
    }
    
    prompt += "\n--- FINAL EXPORT REQUIREMENTS ---\n";
    prompt += `- **Aspect Ratio**: The final image MUST have an exact aspect ratio of ${exportSettings.aspectRatio}.\n`;
    prompt += `- **Background**: ${exportSettings.transparent ? "The final image MUST have a transparent background (PNG format). If compositing, this means removing the original background but keeping all generated shadows and reflections for placing on another backdrop." : "The final image must have a fully rendered, opaque background."}\n`;
    prompt += "- **Output**: The final output must be ONLY the generated image. Do not add any text, watermarks, or annotations. The product is the hero.";
    
    const imagePart = {
        inlineData: {
            data: productImage.base64,
            mimeType: productImage.mimeType,
        },
    };
    
    const parts: any[] = [imagePart];

    if (referenceImage) {
        const referencePart = {
            inlineData: {
                data: referenceImage.base64,
                mimeType: referenceImage.mimeType,
            },
        };
        parts.push(referencePart);
    }

    parts.push({ text: prompt });

    try {
        const response = await genAI.models.generateContent({
            model,
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return {
                    base64: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                };
            }
        }
        console.error("No image found in Gemini response.");
        return null;

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("The AI failed to generate an image. This could be due to a safety policy violation or an internal error.");
    }
};

export const generateCreativeImage = async (
    prompt: string,
    baseImage: ImageFile
): Promise<{ base64: string; mimeType: string } | null> => {
    const model = 'gemini-2.5-flash-image'; // This is Nano Banana

    const imagePart = {
        inlineData: {
            data: baseImage.base64,
            mimeType: baseImage.mimeType,
        },
    };
    const textPart = { text: prompt };

    try {
        const response = await genAI.models.generateContent({
            model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return {
                    base64: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                };
            }
        }
        
        console.error("No image found in creative generation response.");
        return null;

    } catch (error) {
        console.error("Error generating creative image:", error);
        throw new Error("The AI failed to generate an image. This could be due to a safety policy violation or an internal error.");
    }
};
