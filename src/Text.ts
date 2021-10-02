import type Game from "./Game";

class GameText {
    // TODO: add method to change text color

    fontSize: number;
    font: string;
    x: number;
    y: number;
    text: string;
    parentGame: Game;

    constructor(fontSize: number, font: string, x: number, y: number, text: string) {
        this.fontSize = fontSize;
        this.font = font;
        this.x = x;
        this.y = y;
        this.text = text;
    }

    attachToGame(game: Game): void {
        this.parentGame = game;
    }

    setText(newText: string) {
        this.text = newText;
        this.draw();
    }

    draw() {
        const context = this.parentGame.canvas.getContext("2d");
        context.font = `${this.fontSize}px ${this.font}`;
        context.fillStyle = "#000000";
        context.fillText(this.text, this.x, this.y);
    }
}

export default GameText;
