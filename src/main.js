import Input from "./core/input";
import { Key, Mouse } from "./core/keys";

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

    if (Input.isBtnPressed(Mouse.Right))
        console.log("Left Mouse Button Pressed");
    if (Input.isBtnDown(Mouse.Right))
        console.log("Left Mouse Button Held");
    if (Input.isBtnReleased(Mouse.Right))
        console.log("Left Mouse Button Released");

    Input.postUpdate();

    anim = requestAnimationFrame(gameLoop);
}
anim = requestAnimationFrame(gameLoop);
