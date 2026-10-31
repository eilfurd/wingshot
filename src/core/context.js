class Context
{
    static #context = null;

    static Get(canvas)
    {
        if (!this.#context)
        {
            this.#context = canvas.getContext("webgl2.0");
            if (!this.#context)
                throw Error("WebGL2.0 is not supported in this browser.");
            return this.#context;    
        }
        return this.#context;
    }
}

export default Context;