import type Sprite from "../Sprites/Sprite";

class WallCollisionEvent {
    sprite: Sprite;
    onCollisionFunc: Function;

    constructor(sprite: Sprite, collisionFunc: Function) {
        this.sprite = sprite;
        this.onCollisionFunc = collisionFunc;
    }
}

export default WallCollisionEvent;
