import type Game from "../Game";

class Sprite {
    x: number;
    y: number;
    parentGame: Game;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    attachToGame(game: Game): void {
        this.parentGame = game;
    }

    move(newCoors: { x: number, y: number }): void {
        if (this.parentGame.canvas.width > this.x + newCoors.x && this.x + newCoors.x > 0) {
            this.x += newCoors.x;
        }

        if (this.parentGame.canvas.height > this.y + newCoors.y && this.y + newCoors.y > 0) {
            this.y += newCoors.y;
        }

        if (this.parentGame) {
            this.parentGame.redrawSprites();
        } else {
            throw new Error("Sprite must be rendered before it can be moved");
        }
    }

    // I know eslint-disables are hacky, but this is the only easy way to make it work
    // Parent class includes a default method that does nothing
    // Children classes overwrite it
    // Thus, all sprites have a parent method that does nothing for types
    // And a child method that actually carries out the draw

    // eslint-disable-next-line class-methods-use-this
    draw() {}

    // Same kind of deal as above
    // eslint-disable-next-line class-methods-use-this
    getSpriteEdges(): { bottom: number, top: number, left: number, right: number } {
        // returns an array of the coordinates for the edges of the sprite
        // in order of top right bottom left
        return {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
        };
    }
}

export default Sprite;
