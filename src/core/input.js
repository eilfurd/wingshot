import { idOf, KEY_COUNT } from "./keys";

class Input
{
    static #down = new Uint8Array(KEY_COUNT);
    static #pressed = new Uint8Array(KEY_COUNT);
    static #released = new Uint8Array(KEY_COUNT);


    static init()
    {
        window.addEventListener("keydown", Input.#onKeyDown);
        window.addEventListener("keyup", Input.#onKeyUp);
    }

    static postUpdate()
    {
        Input.#pressed.fill(0);
        Input.#released.fill(0);
    }

    static destroy()
    {
        window.removeEventListener("keydown", Input.#onKeyDown);
        window.removeEventListener("keyup", Input.#onKeyUp);
    }

    static isKeyDown(key) { return Input.#down[key]; }
    static isKeyPressed(key) { return Input.#pressed[key]; }
    static isKeyReleased(key) { return Input.#released[key]; }

    static #onKeyDown(event)
    {
        const id = idOf(event.code);
        if (event.repeat) return;
        if (!Input.#down[id]) Input.#pressed[id] = 1;
        Input.#down[id] = 1;
    }

    static #onKeyUp(event)
    {
        const id = idOf(event.code);
        if (Input.#down[id]) Input.#released[id] = 1;
        Input.#down[id] = 0;
    }
}

export default Input;