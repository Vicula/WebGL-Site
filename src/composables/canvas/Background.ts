// background
export function createBackground() {
    //console.log("create background");
}

export function initBackground() {
    //console.log("init background");
}

export function renderBackground(gl: WebGLRenderingContext) {
    gl.disable(gl.DEPTH_TEST);

    useEffect(effectLib.sceneBg, null);
    gl.uniform2f(effectLib.sceneBg.program.uniforms.uTimes, timeInfo.elapsed, timeInfo.delta);
    drawEffect(effectLib.sceneBg);
    unuseEffect(effectLib.sceneBg);

    gl.enable(gl.DEPTH_TEST);
}