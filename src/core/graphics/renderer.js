import Context from "../context";

class Renderer
{
    static #program;

    static init()
    {
        /** @type {WebGL2RenderingContext} */
        const gl = Context.get();

        const vertSrc = 
        `#version 300 es

        in vec2 aPos;

        void main()
        {
            gl_Position = vec4(aPos, 0.0, 1.0);
        }`;

        const fragSrc =
        `#version 300 es
        precision mediump float;

        out vec4 fragColor;

        void main()
        {
            fragColor = vec4(1.0);
        }`;

        const vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertSrc);
        gl.compileShader(vertShader);
        if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
        {
            const info = gl.getShaderInfoLog(vertShader);
            gl.deleteShader(vertShader);
            throw new Error("Vertex Shader Compilation Error: " + info);
        }

        const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragSrc);
        gl.compileShader(fragShader);
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
        {
            const info = gl.getShaderInfoLog(fragShader);
            gl.deleteShader(vertShader);
            gl.deleteShader(fragShader);
            throw new Error("Fragment Shader Compilation Error: " + info);
        }

        Renderer.#program = gl.createProgram();
        gl.attachShader(Renderer.#program, vertShader);
        gl.attachShader(Renderer.#program, fragShader);
        gl.linkProgram(Renderer.#program);
        gl.detachShader(Renderer.#program, vertShader);
        gl.detachShader(Renderer.#program, fragShader);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        if (!gl.getProgramParameter(Renderer.#program, gl.LINK_STATUS))
        {
            const info = gl.getProgramInfoLog(Renderer.#program);
            gl.deleteProgram(Renderer.#program);
            throw new Error("Program Linking Error: " + info);
        }
    }
}

export default Renderer;