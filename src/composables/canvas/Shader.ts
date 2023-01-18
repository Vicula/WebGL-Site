import { Ref } from "@/API";

export function compileShader(gl: Ref<WebGLRenderingContext>, shtype: number, shsrc: string) {
    const retsh = gl.value.createShader(shtype);

    if (retsh) {
        gl.value.shaderSource(retsh, shsrc);
        gl.value.compileShader(retsh);

        if (!gl.value.getShaderParameter(retsh, gl.value.COMPILE_STATUS)) {
            var errlog = gl.value.getShaderInfoLog(retsh);
            gl.value.deleteShader(retsh);
            console.error(errlog);
            return null;
        }
        return retsh;
    }

    return null;
}

interface IWebGLProgram extends WebGLProgram {
    uniforms: Record<string, WebGLUniformLocation | null>;
    attributes: Record<string, number>;
}

export function createShader(gl: Ref<WebGLRenderingContext>, vtxsrc: string, frgsrc: string, uniformlist: string[] | null, attrlist: string[] | null) {
    const
        vsh = compileShader(gl, gl.value.VERTEX_SHADER, vtxsrc),
        fsh = compileShader(gl, gl.value.FRAGMENT_SHADER, frgsrc);

    if (vsh == null || fsh == null)
        return null;


    const prog: IWebGLProgram = {
        ...gl.value.createProgram(),
        uniforms: {},
        attributes: {}
    };

    if (prog) {
        gl.value.attachShader(prog, vsh);
        gl.value.attachShader(prog, fsh);

        gl.value.deleteShader(vsh);
        gl.value.deleteShader(fsh);

        gl.value.linkProgram(prog);
        if (!gl.value.getProgramParameter(prog, gl.value.LINK_STATUS)) {
            var errlog = gl.value.getProgramInfoLog(prog);
            console.error(errlog);
            return null;
        }

        if (uniformlist) {
            prog.uniforms = {};
            for (var i = 0; i < uniformlist.length; i++) {
                prog.uniforms[uniformlist[i]] = gl.value.getUniformLocation(prog, uniformlist[i]);
            }
        }

        if (attrlist) {
            prog.attributes = {};
            for (var i = 0; i < attrlist.length; i++) {
                var attr = attrlist[i];
                prog.attributes[attr] = gl.value.getAttribLocation(prog, attr);
            }
        }

        return prog;
    }
    return null;
}

export function useShader(gl: Ref<WebGLRenderingContext>, prog: IWebGLProgram) {
    gl.value.useProgram(prog);
    for (var attr in prog.attributes) {
        gl.value.enableVertexAttribArray(prog.attributes[attr]);;
    }
}

export function unuseShader(gl: Ref<WebGLRenderingContext>, prog: IWebGLProgram) {
    for (var attr in prog.attributes) {
        gl.value.disableVertexAttribArray(prog.attributes[attr]);
    }
    gl.value.useProgram(null);
}