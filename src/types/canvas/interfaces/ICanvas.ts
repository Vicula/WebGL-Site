import type { Ref } from "@/API"

export interface ICanvas {
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