import type Sprite from "../Sprites/Sprite";

class CollisionEvent {
    sprite1: Sprite;
    sprite2: Sprite;
    onCollisonFunc: Function;

    constructor(sprite1: Sprite, sprite2: Sprite, onCollision: Function) {
        this.sprite1 = sprite1;
        this.sprite2 = sprite2;
        this.onCollisonFunc = onCollision;
    }
}

export default CollisionEvent;
