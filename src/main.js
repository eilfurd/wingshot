import Input from "./core/input";
import { Key } from "./core/keys";

Input.init();

let anim = null;

function gameLoop()
{
    if (Input.isKeyDown(Key.Space))
        console.log("Space Held");
    if (Input.isKeyPressed(Key.AltLeft))
        console.log("AltLeft Pressed");
    if (Input.isKeyReleased(Key.AltLeft))
        console.log("AltLeft Released");

    Input.postUpdate();

    anim = requestAnimationFrame(gameLoop);
}
anim = requestAnimationFrame(gameLoop);
