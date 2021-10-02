import Sprite from "./Sprite";

class Circle extends Sprite {
    private radius: number;
    private backgroundColor: string;

    public enableHitboxes = false;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    setBackgroundColor(backgroundColor: string): void {
        this.backgroundColor = backgroundColor;
    }

    draw(): void {
        const context = this.parentGame.canvas.getContext("2d");

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, (2 * Math.PI));

        if (this.backgroundColor) {
            context.fillStyle = this.backgroundColor;
            context.fill();
        }

        if (this.enableHitboxes) {
            const hitboxCtx = this.parentGame.canvas.getContext("2d");
            hitboxCtx.strokeStyle = "#ff0000";
            // eslint-disable-next-line max-len
            hitboxCtx.rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            hitboxCtx.stroke();
        }

        context.stroke();
    }

    getSpriteEdges() {
        return {
            top: this.y + this.radius,
            right: this.x + this.radius,
            bottom: this.y - this.radius,
            left: this.x - this.radius,
        };
    }
}

export default Circle;
