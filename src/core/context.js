class Context
{
    static #ctx = null;

    static init(canvas)
    {
        Context.#ctx = canvas.getContext("webgl2.0");
        if (!Context.#ctx)
            throw Error("WebGL2.0 is not supported in this browser.");
    }

    static get()
    {
        return this.#ctx;
    }
}

export default Context;