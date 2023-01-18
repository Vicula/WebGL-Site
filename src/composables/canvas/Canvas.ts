import { Ref, ref, watch } from "@/API";
import { setViewports } from "./Viewports";

export function useCanvas() {
    try {
        // useFullscreen(canvas);
        let mountCallback: null | ((canvasRef: Ref<HTMLCanvasElement>) => void) = null;
        const
            canvasRef = ref<HTMLCanvasElement | null>(null),
            __gl = ref<WebGLRenderingContext | null>(null),
            __isUsingFullscreen = ref(false),
            onMount = (callback: () => void) => mountCallback = callback,
            __sceneStandBy = ref(false),
            __timeInfo = ref({
                'start': 0, 'prev': 0, // Date
                'delta': 0, 'elapsed': 0 // Number(sec)
            });

        // canvasRef.value?.getContext("experimental-webgl")


        const
            onCanvasResize = () => {
                // if we have fullscreen set running `setFullscreen` to 
                // update the canvas width/height
                __isUsingFullscreen && setFullscreen();

                // updating WebGl viewport settings if the WebGL context
                // isnt undefined
                __gl.value && setViewports(__gl as Ref<WebGLRenderingContext>);

                // reinit the scene after changing all the viewport settings
                // __sceneStandBy.value && initScene();
            },
            useFullscreen = () => {
                __isUsingFullscreen.value = true;
                setFullscreen();
            },
            setFullscreen = () => {
                const b = document.body,
                    d = document.documentElement,
                    fullw = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth),
                    fullh = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);

                !!canvasRef.value && (
                    (canvasRef.value.width = fullw) &&
                    (canvasRef.value.height = fullh)
                );
            };


        watch(canvasRef, (element, prevElement) => {
            // run a type check on `element` to see if its been set/mounted
            // the type check is for HTMLCanvasElement
            element as unknown instanceof HTMLCanvasElement
                ? (
                    // when/if the `element` type check passes we set the canvasRef
                    // to the current version of the canvas element
                    (canvasRef.value = element) && (
                        // if we have a mountCallback function and the `prevElement`
                        // is falsy then run the callback with a param of the canvasRef
                        (!!mountCallback && !(!!prevElement))
                        && mountCallback(canvasRef as Ref<HTMLCanvasElement>)
                    )
                )
                // if the element isnt of HTMLCanavasElement type
                // we simply set the ref as null for house keeping
                : (canvasRef.value = null);
        });

        return {
            canvasRef,
            useFullscreen,
            onMount
        }

    } catch (e) {
        alert("WebGL not supported." + e);
        console.error(e);
        return;
    }
}