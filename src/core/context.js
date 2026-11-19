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
        if (Context.#ctx === null)
            throw new Error("Context.get() called before the context was created. Call Context.init(canvas) first.");
        return Context.#ctx;
    }
}

export default Context;