import * as tf from "@tensorflow/tfjs";

let modelPromise: Promise<tf.LayersModel> | null = null;
let modelInstance: tf.LayersModel | null = null;

export interface LoadProgress {
    progress: number;
    stage: string;
}

export const getOrLoadModel = async (
    onProgress?: (progress: number, stage: string) => void
): Promise<tf.LayersModel> => {
    if (modelInstance) {
        if (onProgress) onProgress(100, "Model Ready");
        return modelInstance;
    }
    if (modelPromise) {
        return modelPromise;
    }

    modelPromise = (async () => {
        try {
            if (onProgress) onProgress(10, "Initializing TensorFlow Backend...");
            await tf.ready();
            
            // Set backend to cpu or webgl if available
            const backend = tf.getBackend();
            console.log("TensorFlow Backend Ready:", backend);

            if (onProgress) onProgress(40, "Loading AI Runtime...");
            
            const loadedModel = await tf.loadLayersModel("/models/pollution_model.json", {
                onProgress: (fraction) => {
                    const progress = 40 + Math.round(fraction * 50);
                    if (onProgress) onProgress(progress, "Fetching Model Weights Shards...");
                }
            });

            if (onProgress) onProgress(95, "Warming up TensorFlow Shader Kernels...");
            
            // Perform dummy inference to compile shader kernels
            tf.tidy(() => {
                const dummyInput = tf.zeros([1, 15, 1]);
                loadedModel.predict(dummyInput);
            });

            if (onProgress) onProgress(100, "Model Ready");
            modelInstance = loadedModel;
            return loadedModel;
        } catch (error) {
            modelPromise = null; // Reset promise so user can retry on error
            throw error;
        }
    })();

    return modelPromise;
};
