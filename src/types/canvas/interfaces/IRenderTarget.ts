export interface IRenderTarget {
    width: number;
    height: number;
    sizeArray: Float32Array;
    dtxArray: Float32Array;
    frameBuffer: WebGLFramebuffer | null;
    renderBuffer: WebGLRenderbuffer | null;
    texture: WebGLTexture | null;
}