/// <reference types="vite/client" />

interface FaceDetector {
  detect(image: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement): Promise<Array<{
    boundingBox: DOMRectReadOnly;
    landmarks: Array<{ type: string; locations: Array<{ x: number; y: number }> }>;
  }>>;
}

interface FaceDetectorConstructor {
  new(options?: { fastMode: boolean }): FaceDetector;
}

interface Window {
  FaceDetector: FaceDetectorConstructor;
}