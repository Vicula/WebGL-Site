import { Ref } from "@/API";

// background
export function createBackground() {
    //console.log("create background");
}

export function initBackground() {
    //console.log("init background");
}

export function renderBackground(gl: Ref<WebGLRenderingContext>) {
    gl.value.disable(gl.value.DEPTH_TEST);

    useEffect(effectLib.sceneBg, null);
    gl.value.uniform2f(effectLib.sceneBg.program.uniforms.uTimes, timeInfo.elapsed, timeInfo.delta);
    drawEffect(effectLib.sceneBg);
    unuseEffect(effectLib.sceneBg);

    gl.value.enable(gl.value.DEPTH_TEST);
}