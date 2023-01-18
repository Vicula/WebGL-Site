import { Ref, ref, reactive, watch } from "@/API";
import { setViewports } from "./Viewports";
import { useEventListener } from "../EventListener";

/**
==============================================================================
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
 ==============================================================================
 *
 * @returns {IUseCanvas} ref and utility functions for configuring and syncing
 *                       an HTMLCanvasElement
 * 
 ==============================================================================
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
 ==============================================================================
 */
export function useCanvas(): IUseCanvas {
    let mountCallback: null | ((canvasRef: Ref<HTMLCanvasElement>) => void) = null;

    const
        /**
         * @constant canvasRef
         * @public
         * @desc    Ref to an HTMLCanvasElement
         ------------------------------------------------------------------------------ 
        */
        canvasRef = ref<HTMLCanvasElement | null>(null),
        __gl = ref<WebGLRenderingContext | null>(null),
        __isUsingFullscreen = ref(false),
        __sceneStandBy = ref(false),
        __timeInfo = reactive({
            'start': new Date(), 'prev': new Date(),
            'delta': 0, 'elapsed': 0 // Number(sec)
        }),

        /**
         * @function onMount
         * @module  useCanvas
         * @public
         * @desc    exposed utility function used as a pass through for setting an
         *          onMounted callback function.
         ------------------------------------------------------------------------------  
         */
        onMount =
            (callback: () => void) =>
                mountCallback = callback,

        /**
         * @function useFullscreen
         * @module  useCanvas
         * @public
         * @desc    exposed utility function used to set the canvas to fullscreen
         ------------------------------------------------------------------------------ 
        */
        useFullscreen =
            () => __isUsingFullscreen.value = true,

        /**
         * @function setup
         * @internal
         * @desc    lifecycle function used internally for finishing canvas
         *          configuration and setup
         ------------------------------------------------------------------------------
         */
        setup =
            (gl: Ref<WebGLRenderingContext>) => {
                setViewports(gl);
                /**
                 * TODO: wrap up scene creation
                 */
                // createScene();
                // initScene();

                __timeInfo.start = new Date();
                __timeInfo.prev = __timeInfo.start;
            },

        /**
         * @function stopWatch
         * @internal
         * @desc    house keeping utility function used to stop the watcher created
         *          here. We are watching the canvasRef and waiting for the element 
         *          to be truthy and the prevElement is falsy to run the whenMounted
         *          hook and set the canvasRef to the element
         ------------------------------------------------------------------------------ 
         */
        stopWatch =
            watch(canvasRef, (element, prevElement) => {
                /**
                 *  run a type check on `element` to see if its been set/mounted
                 *  the type check is for HTMLCanvasElement
                 */
                element as unknown instanceof HTMLCanvasElement
                    ? (
                        /**
                         *  when/if the `element` type check passes we set the canvasRef
                         *  to the current version of the canvas element
                         */
                        (canvasRef.value = element) && (
                            /**
                             *  if we have a mountCallback function and the `prevElement`
                             *  is falsy then run the callback with a param of the canvasRef
                             */
                            !(!!prevElement) && whenMounted()
                        )
                    )
                    /**
                     *  if the element isnt of HTMLCanavasElement type
                     *  we simply set the ref as null for house keeping
                     */
                    : (canvasRef.value = null);
            }),

        /**
         * @function whenMounted
         * @internal
         * @desc    internal lifecycle hook of the canvas composable fired when the 
         *          canvasRef is no longer falsy. We use this hook to attempt to establish
         *          the WebGLRenderingContext and then run the mounted callback and take 
         *          care of some house keeping.
         ------------------------------------------------------------------------------ 
         */
        whenMounted =
            () => {
                try {
                    /**
                     *  Check to see if we have a Canvas Ref
                     *  if truthy, attempt to set the WebGLContext if this fails the try/catch will trigger
                     */
                    !!canvasRef.value &&
                        (__gl.value = <WebGLRenderingContext | null>canvasRef.value.getContext("experimental-webgl"));

                    /**
                     *  call the mountCallback if it is set
                     */
                    !!mountCallback && mountCallback(canvasRef as Ref<HTMLCanvasElement>);

                    /** 
                     *  if we have fullscreen set running `setFullscreen` to 
                     *  update the canvas width/height
                     */
                    __isUsingFullscreen && setFullscreen();

                    /**
                     *  set an event listener on the window resize
                     *  event to redraw the canvas with new size
                     */
                    useEventListener(window, "resize", onResize);

                    /**
                     *  stop the watcher we used to set the canvasRef
                     *  when it finally mounted
                     */
                    stopWatch();

                    /**
                     *  If the WebGLRenderingContext was sucessfully created we continue
                     *  with configuring the canvas by calling the setup function for the canvas
                     */
                    !!__gl.value && setup(__gl as Ref<WebGL2RenderingContext>);

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
        onResize =
            () => {
                /** 
                 *  if we have fullscreen set running `setFullscreen` to 
                 *  update the canvas width/height
                */
                __isUsingFullscreen && setFullscreen();

                /** 
                 *  updating WebGl viewport settings if the WebGL context
                 *  isnt undefined
                */
                __gl.value && setViewports(__gl as Ref<WebGLRenderingContext>);

                /** 
                 *  reinit the scene after changing all the viewport settings
                 *  TODO: Wrap up this functionality
                */
                // __sceneStandBy.value && initScene();
            },

        /**
         * @function setFullscreen
         * @internal
         * @desc    house keeping function used to actually set the canvas to fullscreen
         ------------------------------------------------------------------------------ 
         */
        setFullscreen =
            () => {
                /**
                 * Get the biggest height and width value from the document
                 * to set the canvas as fullscreen
                 */
                const b = document.body,
                    d = document.documentElement,
                    fullw = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth),
                    fullh = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);

                /**
                 * update the canvas's height and width
                 */
                !!canvasRef.value && (
                    (canvasRef.value.width = fullw) &&
                    (canvasRef.value.height = fullh)
                );
            },
        render =
            () => {
                // renderScene();
            };

    return {
        canvasRef,
        useFullscreen,
        onMount
    }
}

interface IUseCanvas {
    /**
     * @constant canvasRef
     * @module  useCanvas
     * @public
     * @desc    Ref to an HTMLCanvasElement
    ------------------------------------------------------------------------------  
     */
    canvasRef: Ref<HTMLCanvasElement | null>;
    /**
     * @function useFullscreen
     * @module  useCanvas
     * @public
     * @desc    exposed utility function used to set the canvas to fullscreen
     ------------------------------------------------------------------------------ 
     */
    useFullscreen: () => void;
    /**
     * @function onMount
     * @module  useCanvas
     * @public
     * @desc    exposed utility function used as a pass through for setting an
     *          onMounted callback function.
     ------------------------------------------------------------------------------ 
     */
    onMount: (callback: () => void) => () => void;
}