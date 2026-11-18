import { idOf, KEY_COUNT } from "./keys";

class Input
{
    static #keyDown = new Uint8Array(KEY_COUNT);
    static #keyPressed = new Uint8Array(KEY_COUNT);
    static #keyReleased = new Uint8Array(KEY_COUNT);

    static #btnDown = new Uint8Array(3);
    static #btnPressed = new Uint8Array(3);
    static #btnReleased = new Uint8Array(3);

    static init()
    {
        window.addEventListener("keydown", Input.#onKeyDown);
        window.addEventListener("keyup", Input.#onKeyUp);

        window.addEventListener("pointerdown", Input.#onBtnDown);
        window.addEventListener("pointerup", Input.#onBtnUp);
        window.addEventListener("contextmenu", (event) => event.preventDefault());
    }

    static postUpdate()
    {
        Input.#keyPressed.fill(0);
        Input.#keyReleased.fill(0);

        Input.#btnPressed.fill(0);
        Input.#btnReleased.fill(0);
    }

    static destroy()
    {
        window.removeEventListener("keydown", Input.#onKeyDown);
        window.removeEventListener("keyup", Input.#onKeyUp);

        window.removeEventListener("pointerdown", Input.#onBtnDown);
        window.removeEventListener("pointerup", Input.#onBtnUp);
    }

    static isKeyDown(key) { return Input.#keyDown[key]; }
    static isKeyPressed(key) { return Input.#keyPressed[key]; }
    static isKeyReleased(key) { return Input.#keyReleased[key]; }

    static isBtnDown(btn) { return Input.#btnDown[btn]; }
    static isBtnPressed(btn) { return Input.#btnPressed[btn]; }
    static isBtnReleased(btn) { return Input.#btnReleased[btn]; }

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
}

export default Input;