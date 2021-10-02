import Game from "./Game";
import Circle from "./Sprites/Circle";
import CollisionEvent from "./CollisionEvents/CollisionEvent";
import GameText from "./Text";
import WallCollisionEvent from "./CollisionEvents/WallCollisonEvent";

const game = new Game("romejs-test");
const player = new Circle(50, 50, 20);

player.setBackgroundColor("#27569844");

game.registerSprite(player);

game.registerKeyEvent("w", () => player.move({ x: 0, y: -10 }));
game.registerKeyEvent("a", () => player.move({ x: -10, y: 0 }));
game.registerKeyEvent("s", () => player.move({ x: 0, y: 10 }));
game.registerKeyEvent("d", () => player.move({ x: 10, y: 0 }));

export {
    Game,
    WallCollisionEvent,
    Circle,
    CollisionEvent,
    GameText,
};
