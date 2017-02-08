'use strict';
/* globals AFRAME */

const EventEmitter = require('eventemitter3');
const networkedPhysics = require('../network/NetworkedPhysics');

/**
 * The A-Frame Renderer
 */
class AFrameRenderer {

    /**
    * Constructor of the Renderer singleton.
    * @param {GameEngine} gameEngine - Reference to the GameEngine instance.
    * @param {ClientEngine} clientEngine - Reference to the ClientEngine instance.
    */
    constructor(gameEngine, clientEngine) {
        this.gameEngine = gameEngine;
        this.clientEngine = clientEngine;

        // mixin for EventEmitter
        Object.assign(this, EventEmitter.prototype);

        // set up the networkedPhysics as an A-Frame system
        networkedPhysics.gameEngine = gameEngine;
        AFRAME.registerSystem('incheon-networked-physics', networkedPhysics);
    }

    /**
     * Initialize the renderer.
     * @return {Promise} Resolves when renderer is ready.
    */
    init() {
        if ((typeof window === 'undefined') || !document) {
            console.log('renderer invoked on server side.');
        }
        return Promise.resolve(); // eslint-disable-line new-cap
    }

    /**
     * The main draw function.  This method is called at high frequency,
     * at the rate of the render loop.  Typically this is 60Hz, in WebVR 90Hz.
     */
    draw() {
        this.gameEngine.world.forEachObject((id, o) => {
            if (typeof o.refreshRenderObject === 'function')
                o.refreshRenderObject();
        });
    }

}

module.exports = AFrameRenderer;