import { createRenderTarget, deleteRenderTarget } from "./Renderer";
import { IRenderTarget } from "@/types";
import { Ref } from "@/API";

interface IRenderConfig {
    width: number;
    height: number;
    aspect: number;
    array: Float32Array;
    halfWidth: number;
    halfHeight: number;
    halfArray: Float32Array;
    setSize: (width: number, height: number) => void;
    mainRT?: IRenderTarget;
    wFullRT0?: IRenderTarget;
    wFullRT1?: IRenderTarget;
    wHalfRT0?: IRenderTarget;
    wHalfRT1?: IRenderTarget;
}

const renderSpec: IRenderConfig = {
    'width': 0,
    'height': 0,
    'aspect': 1,
    'array': new Float32Array(3),
    'halfWidth': 0,
    'halfHeight': 0,
    'halfArray': new Float32Array(3),
    setSize: (w, h) => {
        renderSpec.width = w;
        renderSpec.height = h;
        renderSpec.aspect = renderSpec.width / renderSpec.height;
        renderSpec.array[0] = renderSpec.width;
        renderSpec.array[1] = renderSpec.height;
        renderSpec.array[2] = renderSpec.aspect;

        renderSpec.halfWidth = Math.floor(w / 2);
        renderSpec.halfHeight = Math.floor(h / 2);
        renderSpec.halfArray[0] = renderSpec.halfWidth;
        renderSpec.halfArray[1] = renderSpec.halfHeight;
        renderSpec.halfArray[2] = renderSpec.halfWidth / renderSpec.halfHeight;
    }
    // and some render targets. see setViewport()
};

export function setViewports(gl: Ref<WebGLRenderingContext>) {
    renderSpec.setSize(gl.value.canvas.width, gl.value.canvas.height);

    gl.value.clearColor(0.2, 0.2, 0.5, 1.0);
    gl.value.viewport(0, 0, renderSpec.width, renderSpec.height);

    const rtfunc = function (rtName: keyof IRenderConfig, rtW: number, rtH: number) {
        const tempRT = renderSpec[rtName] as IRenderTarget;
        if (tempRT) deleteRenderTarget(gl, tempRT);
        (renderSpec[rtName] as IRenderTarget) = createRenderTarget(gl, rtW, rtH);
    };
    rtfunc('mainRT', renderSpec.width, renderSpec.height);
    rtfunc('wFullRT0', renderSpec.width, renderSpec.height);
    rtfunc('wFullRT1', renderSpec.width, renderSpec.height);
    rtfunc('wHalfRT0', renderSpec.halfWidth, renderSpec.halfHeight);
    rtfunc('wHalfRT1', renderSpec.halfWidth, renderSpec.halfHeight);
}