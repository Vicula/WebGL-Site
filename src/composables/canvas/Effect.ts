import commonVert from '@/shaders/common.vert';
import backgroundFrag from "@/shaders/background.frag";
import brightBufFrag from "@/shaders/brightBuf.frag";
import dirBlurFrag from "@/shaders/dirBlur.frag";
import ppFinalFrag from "@/shaders/ppFinal.frag";
import ppFinalVert from "@/shaders/ppFinal.vert";
import { Ref } from "@/API";
import type { IRenderTarget } from "@/types";
import { createShader, useShader, unuseShader, type IWebGLProgram } from './Shader';


interface IEffectProgram {
    program: IWebGLProgram | null;
    buffer: WebGLBuffer | null;
    dataArray: Float32Array | null;
}

function createEffectProgram(gl: Ref<WebGLRenderingContext>, vtxsrc: string, frgsrc: string, exunifs: string[] | null, exattrs: string[] | null) {
    const
        ret: IEffectProgram = {
            program: null,
            buffer: null,
            dataArray: null
        },
        unifs = ['uResolution', 'uSrc', 'uDelta'],
        attrs = ['aPosition'];

    exunifs && unifs.push(...exunifs);
    exattrs && attrs.push(...exattrs);

    ret.program = createShader(gl, vtxsrc, frgsrc, unifs, attrs);
    if (ret.program) {
        useShader(gl, ret.program);

        ret.dataArray = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0
        ]);
        ret.buffer = gl.value.createBuffer();
        gl.value.bindBuffer(gl.value.ARRAY_BUFFER, ret.buffer);
        gl.value.bufferData(gl.value.ARRAY_BUFFER, ret.dataArray, gl.value.STATIC_DRAW);

        gl.value.bindBuffer(gl.value.ARRAY_BUFFER, null);
        unuseShader(gl, ret.program);

        return ret;
    }

    return null;
}


// basic usage
// useEffect(prog, srctex({'texture':texid, 'dtxArray':(f32)[dtx, dty]})); //basic initialize
// gl.uniform**(...); //additional uniforms
// drawEffect()
// unuseEffect(prog)
// TEXTURE0 makes src
export function useEffect(gl: Ref<WebGLRenderingContext>, fxobj: IEffectProgram, srctex: IRenderTarget) {
    var prog = fxobj.program;

    if (prog) {
        useShader(gl, prog);
        // gl.value.uniform3fv(prog.uniforms.uResolution, renderSpec.array);

        if (srctex != null) {
            gl.value.uniform2fv(prog.uniforms.uDelta, srctex.dtxArray);
            gl.value.uniform1i(prog.uniforms.uSrc, 0);

            gl.value.activeTexture(gl.value.TEXTURE0);
            gl.value.bindTexture(gl.value.TEXTURE_2D, srctex.texture);
        }
    }

}
function drawEffect(gl: Ref<WebGLRenderingContext>, fxobj: IEffectProgram) {
    gl.value.bindBuffer(gl.value.ARRAY_BUFFER, fxobj.buffer);

    fxobj.program && gl.value.vertexAttribPointer(fxobj.program.attributes.aPosition, 2, gl.value.FLOAT, false, 0, 0);

    gl.value.drawArrays(gl.value.TRIANGLE_STRIP, 0, 4);
}
function unuseEffect(gl: Ref<WebGLRenderingContext>, fxobj: IEffectProgram) {
    fxobj.program && unuseShader(gl, fxobj.program);
}



const effectLib: IEffectLib = {
    sceneBg: null,
    mkBrightBuf: null,
    dirBlur: null,
    finalComp: null
}

interface IEffectLib {
    sceneBg: IEffectProgram | null;
    mkBrightBuf: IEffectProgram | null;
    dirBlur: IEffectProgram | null;
    finalComp: IEffectProgram | null;
}

function createEffectLib(gl: Ref<WebGLRenderingContext>) {
    // background
    effectLib.sceneBg = createEffectProgram(gl, commonVert, backgroundFrag, ['uTimes'], null);
    // make brightpixels buffer
    effectLib.mkBrightBuf = createEffectProgram(gl, commonVert, brightBufFrag, null, null);
    // directional blur
    effectLib.dirBlur = createEffectProgram(gl, commonVert, dirBlurFrag, ['uBlurDir'], null);
    // final composite
    effectLib.finalComp = createEffectProgram(gl, ppFinalVert, ppFinalFrag, ['uBloom'], null);
}