import { Ref, ref, reactive, watch } from "@/API";

/**
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * @function useWebGL
 * @public
 * @version 1.0.0
 * @since   1.0.0
 * @author    [Victor C](https://github.com/vicula)
 * @desc    WebGL Composable function
 * 
 * @summary Composable used to init a WebGLRenderingContext
 *
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export function useWebGL(canvas: Ref<HTMLCanvasElement>) {
    /**
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     * @constants
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    */
    const
        __gl = ref<WebGLRenderingContext | null>
            (canvas.value.getContext("experimental-webgl") as WebGLRenderingContext | null);

}
