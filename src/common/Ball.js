'use strict';

const PhysicalObject = require('incheon').serialize.PhysicalObject;
const RADIUS = 1;
const MASS = 1;
let CANNON = null;

class Ball extends PhysicalObject {

    constructor(id, gameEngine, position) {
        super(id, position);
        this.class = Ball;
        this.gameEngine = gameEngine;
    }

    onAddToWorld(gameEngine) {

        // create the physics body
        this.gameEngine = gameEngine;
        CANNON = this.gameEngine.physicsEngine.CANNON;
        this.physicsObj = gameEngine.physicsEngine.addSphere(RADIUS, MASS);
        this.physicsObj.position.set(this.position.x, this.position.y, this.position.z);
        this.physicsObj.angularDamping = 0.1;

        let scene = gameEngine.renderer ? gameEngine.renderer.scene : null;
        if (scene) {
            let el = this.renderEl = document.createElement('a-entity');
            scene.appendChild(el);
            let p = this.position;
            let q = this.quaternion;
            el.setAttribute('position', `${p.x} ${p.y} ${p.z}`);
            el.setAttribute('material', 'color: green');
            el.setAttribute('geometry', 'primitive: sphere; radius: 2; segmentsWidth: 32; segmentsHeight: 16');
            el.setAttribute('game-object-id', this.id);
        }
    }

    toString() {
        return `Ball::${super.toString()}`;
    }

    destroy() {
        this.gameEngine.physicsEngine.removeObject(this.physicsObj);
    }

}

module.exports = Ball;