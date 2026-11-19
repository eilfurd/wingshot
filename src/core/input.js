import { idOf, KEY_COUNT } from "./keys";

class Input
{
    static #keyDown = new Uint8Array(KEY_COUNT);
    static #keyPressed = new Uint8Array(KEY_COUNT);
    static #keyReleased = new Uint8Array(KEY_COUNT);

    static #btnDown = new Uint8Array(3);
    static #btnPressed = new Uint8Array(3);
    static #btnReleased = new Uint8Array(3);

    static #x = 0;
    static #y = 0;
    static #dx = 0;
    static #dy = 0;

    static #canvas = null;
    static #left = 0;
    static #top = 0;
    static #width = 0;
    static #height = 0;

    static #observer = null;

    static init(canvas)
    {
        Input.#canvas = canvas;
        Input.#canvas.style.touchAction = "none";

        Input.#updateSizing();
        Input.#observer = new ResizeObserver(Input.#updateSizing);
        Input.#observer.observe(Input.#canvas);

        window.addEventListener("keydown", Input.#onKeyDown);
        window.addEventListener("keyup", Input.#onKeyUp);

        window.addEventListener("pointerdown", Input.#onBtnDown);
        window.addEventListener("pointerup", Input.#onBtnUp);
        window.addEventListener("pointermove", Input.#onMouseMove);
        window.addEventListener("contextmenu", Input.#onContextMenu);
    }

    static destroy()
    {
        window.removeEventListener("keydown", Input.#onKeyDown);
        window.removeEventListener("keyup", Input.#onKeyUp);

        window.removeEventListener("pointerdown", Input.#onBtnDown);
        window.removeEventListener("pointerup", Input.#onBtnUp);
        window.removeEventListener("pointermove", Input.#onMouseMove);
        window.removeEventListener("contextmenu", Input.#onContextMenu);

        Input.#observer?.disconnect();
        Input.#observer = null;

        Input.#canvas = null;
    }
    
    static postUpdate()
    {
        Input.#keyPressed.fill(0);
        Input.#keyReleased.fill(0);

        Input.#btnPressed.fill(0);
        Input.#btnReleased.fill(0);
    }

    static isKeyDown(key) { return Input.#keyDown[key]; }
    static isKeyPressed(key) { return Input.#keyPressed[key]; }
    static isKeyReleased(key) { return Input.#keyReleased[key]; }

    static isBtnDown(btn) { return Input.#btnDown[btn]; }
    static isBtnPressed(btn) { return Input.#btnPressed[btn]; }
    static isBtnReleased(btn) { return Input.#btnReleased[btn]; }

    static get mouseX() { return Math.min(Math.max(0, Input.#x), Input.#width); }
    static get mouseY() { return Math.min(Math.max(0, Input.#y), Input.#height); }
    static get mouseDX() { return Input.#dx; }
    static get mouseDY() { return Input.#dy; }

    static #onKeyDown(event)
    {
        const id = idOf(event.code);
        if (event.repeat) return;
        if (!Input.#keyDown[id]) Input.#keyPressed[id] = 1;
        Input.#keyDown[id] = 1;
    }
    static #onKeyUp(event)
    {
        const id = idOf(event.code);
        if (Input.#keyDown[id]) Input.#keyReleased[id] = 1;
        Input.#keyDown[id] = 0;
    }

    static #onBtnDown(event)
    {
        if (!event.isPrimary) return;
        if (!Input.#btnDown[event.button]) Input.#btnPressed[event.button] = 1;
        Input.#btnDown[event.button] = 1;
    }
    static #onBtnUp(event)
    {
        if (!event.isPrimary) return;
        if (Input.#btnDown[event.button]) Input.#btnReleased[event.button] = 1;
        Input.#btnDown[event.button] = 0;
    }

    static #onMouseMove(event)
    {
        if (!event.isPrimary) return;
        const x = event.clientX - Input.#left;
        const y = event.clientY - Input.#top;
        Input.#dx += x - Input.#x;
        Input.#dy += y - Input.#y;
        Input.#x = x;
        Input.#y = y;
    }

    static #onContextMenu(event)
    {
        event.preventDefault();
    }

    static #updateSizing()
    {
        const rect = Input.#canvas.getBoundingClientRect();
        Input.#left = rect.left;
        Input.#top = rect.top;
        Input.#height = rect.height;
        Input.#width = rect.width;
    }
}

export default Input;