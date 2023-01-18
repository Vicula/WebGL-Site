import { Ref } from "@/API"

interface IRenderTarget {
    width: number;
    height: number;
    sizeArray: Float32Array;
    dtxArray: Float32Array;
    frameBuffer: WebGLFramebuffer | null;
    renderBuffer: WebGLRenderbuffer | null;
    texture: WebGLTexture | null;
}

export function deleteRenderTarget(gl: Ref<WebGLRenderingContext>, rt: IRenderTarget) {
    gl.value.deleteFramebuffer(rt.frameBuffer);
    gl.value.deleteRenderbuffer(rt.renderBuffer);
    gl.value.deleteTexture(rt.texture);
}

export function createRenderTarget(gl: Ref<WebGLRenderingContext>, w: number, h: number) {

    const ret: IRenderTarget = {
        width: w,
        height: h,
        sizeArray: new Float32Array([w, h, w / h]),
        dtxArray: new Float32Array([1.0 / w, 1.0 / h]),
        frameBuffer: gl.value.createFramebuffer(),
        renderBuffer: gl.value.createRenderbuffer(),
        texture: gl.value.createTexture()
    };

    gl.value.bindTexture(gl.value.TEXTURE_2D, ret.texture);
    gl.value.texImage2D(gl.value.TEXTURE_2D, 0, gl.value.RGBA, w, h, 0, gl.value.RGBA, gl.value.UNSIGNED_BYTE, null);
    gl.value.texParameteri(gl.value.TEXTURE_2D, gl.value.TEXTURE_WRAP_S, gl.value.CLAMP_TO_EDGE);
    gl.value.texParameteri(gl.value.TEXTURE_2D, gl.value.TEXTURE_WRAP_T, gl.value.CLAMP_TO_EDGE);
    gl.value.texParameteri(gl.value.TEXTURE_2D, gl.value.TEXTURE_MAG_FILTER, gl.value.LINEAR);
    gl.value.texParameteri(gl.value.TEXTURE_2D, gl.value.TEXTURE_MIN_FILTER, gl.value.LINEAR);

    gl.value.bindFramebuffer(gl.value.FRAMEBUFFER, ret.frameBuffer);
    gl.value.framebufferTexture2D(gl.value.FRAMEBUFFER, gl.value.COLOR_ATTACHMENT0, gl.value.TEXTURE_2D, ret.texture, 0);

    gl.value.bindRenderbuffer(gl.value.RENDERBUFFER, ret.renderBuffer);
    gl.value.renderbufferStorage(gl.value.RENDERBUFFER, gl.value.DEPTH_COMPONENT16, w, h);
    gl.value.framebufferRenderbuffer(gl.value.FRAMEBUFFER, gl.value.DEPTH_ATTACHMENT, gl.value.RENDERBUFFER, ret.renderBuffer);

    gl.value.bindTexture(gl.value.TEXTURE_2D, null);
    gl.value.bindRenderbuffer(gl.value.RENDERBUFFER, null);
    gl.value.bindFramebuffer(gl.value.FRAMEBUFFER, null);

    return ret;
}