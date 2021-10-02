import type Sprite from "./Sprites/Sprite";
import type CollisionEvent from "./CollisionEvents/CollisionEvent";
import type WallCollisionEvent from "./CollisionEvents/WallCollisonEvent";
import type GameText from "./Text";

// Because canvas elements are special snowflakes, its impossible for them to be the active element
// This little snippet saves the last clicked element and when I want to fire an event on canvas,
// checks if the last clicked element is the canvas
// If it is, fires the event
// Thus achieving the same effect as attaching the events directly to the canvas
let lastClickElem: EventTarget;
document.addEventListener("click", (event) => { lastClickElem = event.target; });

const detectCollision = (sprite1: Sprite, sprite2: Sprite): boolean => {
    const sprite1Coords = sprite1.getSpriteEdges();
    const sprite2Coords = sprite2.getSpriteEdges();

    if (sprite1Coords.bottom > sprite2Coords.top || sprite2Coords.bottom > sprite1Coords.top) {
        // One rectangle's bottom edge is higher than the other's top edge
        // Thus, the cannot overlap
        return false;
    }

    if (sprite1Coords.top < sprite2Coords.bottom || sprite2Coords.top < sprite1Coords.bottom) {
        // One rectangles top edge is lower than the others bottom
        return false;
    }

    if (sprite1Coords.left > sprite2Coords.right || sprite2Coords.left > sprite1Coords.right) {
        // idk anymore but it seems to be working
        return false;
    }

    if (sprite1Coords.right < sprite2Coords.left || sprite2Coords.right < sprite1Coords.left) {
        return false;
    }

    return true;
};

const detectWallCollision = (sprite: Sprite, canvas: HTMLCanvasElement): boolean => {
    const spriteCoords = sprite.getSpriteEdges();

    if (spriteCoords.left <= 0
        || spriteCoords.right >= canvas.width
        || spriteCoords.bottom <= 0 // Yes, i know these two are reversed. getSpriteEdges is wrong
        || spriteCoords.top >= canvas.height
    ) return true;

    return false;
};

class Game {
    canvas: HTMLCanvasElement;
    private sprites: Array<Sprite>;
    private collisionEvents: Array<CollisionEvent>;
    private wallCollisionEvents: Array<WallCollisionEvent>;
    private textBoxes: Array<GameText>;

    constructor(canvasId: string) {
        this.canvas = document.querySelector(`#${canvasId}`);
        this.sprites = [];
        this.collisionEvents = [];
        this.wallCollisionEvents = [];
        this.textBoxes = [];
        this.fixDpi();
    }

    fixDpi(): void {
        // Canvas elements don't scale well because computers are dumb, so this function fixes that
        const dpi = window.devicePixelRatio;
        const styleHeight = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);
        const styleWidth = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);

        this.canvas.setAttribute("height", (styleHeight * dpi).toString());
        this.canvas.setAttribute("width", (styleWidth * dpi).toString());
    }

    setStageBackgroundColor(hex: string): void {
        (this.canvas as HTMLElement).style.backgroundColor = hex;
    }

    registerKeyEvent(key: string, eventFunc: Function): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === key && lastClickElem === this.canvas) {
                eventFunc();
            }
        });
    }

    redrawSprites(): void {
        // Clear the canvas
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sprites.forEach((sprite) => sprite.draw());
        this.textBoxes.forEach((textbox) => textbox.draw());

        this.collisionEvents.forEach((event: CollisionEvent) => {
            if (detectCollision(event.sprite1, event.sprite2)) {
                event.onCollisonFunc();
            }
        });

        this.wallCollisionEvents.forEach((event: WallCollisionEvent) => {
            if (detectWallCollision(event.sprite, this.canvas)) {
                event.onCollisionFunc();
            }
        });
    }

    registerSprite(sprite: Sprite): void {
        sprite.attachToGame(this);
        this.sprites.push(sprite);

        this.redrawSprites();
    }

    deregisterSprite(sprite: Sprite): void {
        const index = this.sprites.indexOf(sprite);
        this.sprites.splice(index, 1);

        this.redrawSprites();
    }

    registerCollisionEvent(event: CollisionEvent): void {
        this.collisionEvents.push(event);
    }

    registerWallCollisionEvent(event: WallCollisionEvent): void {
        this.wallCollisionEvents.push(event);
    }

    registerText(text: GameText) {
        text.attachToGame(this);
        this.textBoxes.push(text);
        text.draw();
    }
}

export default Game;
