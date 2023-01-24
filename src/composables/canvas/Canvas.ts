import { Ref, ref, watch } from "@/API";
import type { ICanvas } from "@/types";
import { setViewports } from "./Viewports";
import { useEventListener } from "../EventListener";
import { useRegistry } from "../ecs/Registry";

/**
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * @function useCanvas
 * @public
 * @version 1.0.0
 * @since   1.0.0
 * @author    [Victor C](https://github.com/vicula)
 * @desc    Exposes a canvas ref and utility functions used for creating
 *          and syncing a canvas HTMLElement with vue's reactive system for 
 *          establishing a WebGLRenderContext to create 3D animations easily
 *          within the vue Composition API
 * 
 * @summary Composable used to init and sync a canvasRef
 *
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * @returns {ICanvas} ref and utility functions for configuring and syncing
 *                       an HTMLCanvasElement
 * 
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * @example Using and setting the canvas
 * 
 * ```vue
 * <template>
 *     <canvas ref="canvasRef" />
 * </template>
 * 
 * <script lang="ts">
 * import { useCanvas } from "PATH"
 * 
 * const { canvasRef } = useCanvas();
 * </script>
 * ```
 * 
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
export function useCanvas(): ICanvas {
    const
        __canvasRef = ref<HTMLCanvasElement | null>(null),
        __gl = ref<WebGLRenderingContext | null>(null),
        __mountCallback = ref<((canvasRef: Ref<HTMLCanvasElement>) => void) | null>(null),
        __isUsingFullscreen = ref(false),
        __sceneStandBy = ref(false),
        __isRunning = ref(false),
        __isDebug = ref(false),
        // TODO: make the registry
        // __registry = ref(null),
        // TODO: make an asset store, it will hold textures and shaders
        // __assetStore = ref(null),
        // TODO: move timeInfo to a more relevant location
        // __timeInfo = reactive({
        //     'start': new Date(), 'prev': new Date(),
        //     'delta': 0, 'elapsed': 0 // Number(sec)
        // }),

        /**
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        * @Lifecycle
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        */
        /**
         * @function whenMounted
         * @internal
         * @desc    internal lifecycle hook of the canvas composable fired when the 
         *          canvasRef is no longer falsy. We use this hook to attempt to establish
         *          the WebGLRenderingContext and if its succesful we continue with setup
         *          otherwise the try catch will return an error.
         ------------------------------------------------------------------------------ 
         */
        __whenMounted =
            () => {
                try {
                    // Check to see if we have a Canvas Ref (should always be truthy but check for TS)
                    // if truthy, attempt to set the WebGLContext if this fails the try/catch will trigger.
                    !!__canvasRef.value &&
                        ((__gl.value = <WebGLRenderingContext | null>__canvasRef.value.getContext("experimental-webgl"))
                            // if setting is successful we continue with init()
                            && __init());

                    // stop the watcher we used to set the canvasRef
                    // since its mounted on failure or success
                    __unWatch();
                } catch (e) {
                    alert("WebGL not supported." + e);
                    console.error(e);
                    return;
                }
            },

        /**
         * @function onResize
         * @internal
         * @desc    Lifecycle function of the canvas composable, passed to a window resize
         *          event listener. On this event we check if we want fullscreen, reset
         *          viewports and redraw the scene.
         ------------------------------------------------------------------------------ 
         */
        __onResize =
            () => {
                // if we have fullscreen set running `setFullscreen` to 
                // update the canvas width/height
                __isUsingFullscreen.value && __setFullscreen();

                // updating WebGl viewport settings if the WebGL context
                // isnt undefined
                __gl.value && setViewports(__gl as Ref<WebGLRenderingContext>);

                // reinit the scene after changing all the viewport settings
                // TODO: Wrap up this functionality
                // __sceneStandBy.value && initScene();
            },

        /**
         * @function unWatch
         * @internal
         * @desc    house keeping utility function used to stop the watcher created
         *          here. We are watching the canvasRef and waiting for the element 
         *          to be truthy and the prevElement is falsy to run the whenMounted
         *          hook and set the canvasRef to the element
         ------------------------------------------------------------------------------ 
        */
        __unWatch =
            watch(__canvasRef, (element, prevElement) => {
                // run a type check on `element` to see if its been set/mounted
                // the type check is for HTMLCanvasElement
                element as unknown instanceof HTMLCanvasElement
                    ? (
                        // when/if the `element` type check passes we set the canvasRef
                        // to the current version of the canvas element
                        (__canvasRef.value = element) && (
                            // and if the `prevElement` is falsy we then run the mounted lifecycle
                            // TODO: handle failure of WebGLContext
                            !(!!prevElement) && __whenMounted()
                        )
                    )
                    // if the element isnt of HTMLCanavasElement type
                    // we simply set the ref as null for house keeping
                    : (__canvasRef.value = null);
            }),

        /**
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        * @Configuration
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        */
        /**
         * @function init
         * @internal
         * @desc    lifecycle function used internally for finishing canvas
         *          configuration and setup
         ------------------------------------------------------------------------------
        */
        __init = () => {
            // we finally call the mounted callback, if set, after ensuring canvas and WebGL
            // context were sucessfully set
            !!__mountCallback.value && __mountCallback.value(__canvasRef as Ref<HTMLCanvasElement>);

            // if we have opted to use fullscreen we run `setFullscreen` to 
            // update the canvas width/height
            __isUsingFullscreen && __setFullscreen();

            // set an event listener on the window resize
            // event to redraw the canvas with new size             
            useEventListener(window, "resize", __onResize);

            // If the WebGLRenderingContext was sucessfully created we continue
            // with configuring the canvas by calling the setup function for the canvas             
            !!__gl.value && __setup(__gl as Ref<WebGL2RenderingContext>);
        },

        /**
         * @function setup
         * @internal
         * @desc    lifecycle function used internally for finishing canvas
         *          configuration and setup
         ------------------------------------------------------------------------------
         */
        __setup =
            (gl: Ref<WebGLRenderingContext>) => {
                setViewports(gl);

                // TODO: wrap up scene creation
                // createScene();
                // initScene();

                // TODO: move timeinfo into ECS or Registry
                // __timeInfo.start = new Date();
                // __timeInfo.prev = __timeInfo.start;
            },

        /**
         * @function setFullscreen
         * @internal
         * @desc    house keeping function used to actually set the canvas to fullscreen
         ------------------------------------------------------------------------------ 
         */
        __setFullscreen =
            () => {
                // Get the biggest height and width value from the document
                // to set the canvas as fullscreen
                const b = document.body,
                    d = document.documentElement,
                    fullw = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth),
                    fullh = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);

                // update the canvas's height and width
                !!__canvasRef.value && (
                    (__canvasRef.value.width = fullw) &&
                    (__canvasRef.value.height = fullh)
                );
            };

    /**
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    * @Exposed
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    */
    return {
        canvasRef: __canvasRef,
        // TODO: Fullscreen can be moved to its own composite
        useFullscreen:
            () => __isUsingFullscreen.value = true,
        onMount:
            (callback: () => void) =>
                __mountCallback.value = callback
    }
}