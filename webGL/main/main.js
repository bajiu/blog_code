/**
 *  2021/05/29
 *  多幅纹理 (重叠粘贴两幅纹理图像)
 */




const multiTexture = () => {
    const VSHADER =
        `
            attribute vec4 a_Position;
            attribute vec2 a_Texture;
            varying vec2 v_Texture;
            void main() {
                gl_Position = a_Position;
                v_Texture = a_Texture;
            }
        `
    const FSHADER =
        `
            precision mediump float;
            uniform sampler2D u_Sampler0;
            uniform sampler2D u_Sampler1;
            void main() {
                vec4 color0 = texture2D(u_Sampler0, v_Texture);
                vec4 color1 = texture2D(u_Sampler1, v_Texture);
                gl_FragColor = color0 * color1;
            }
        `

    initShaders(gl, VSHADER, FSHADER);




}

multiTexture()





