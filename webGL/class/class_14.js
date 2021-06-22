/**
 *  2021/06/05
 *  多幅纹理 (重叠粘贴两幅纹理图像)
 */


// 按照位判断偶数
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

let gl_texUint0 = false;
let gl_texUint1 = false;
const loadTexture = (gl, n, texture,u_Sampler, image, unitNum = 0) => {
    // 对纹理图像进行 Y轴 反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // 开启 0-7号纹理单元 (在使用纹理之前, 需要激活它)
    const textureUnitName = `TEXTURE${unitNum}`
    console.log(unitNum)



    console.log(textureUnitName)
    unitNum === 0 && (gl_texUint0 = true);
    unitNum === 1 && (gl_texUint1 = true);
    gl.activeTexture(gl[textureUnitName]);
    // 向 target 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 检查每个维度是否是 2 的幂
    console.log(image.width)
    console.log(image.height)
    // if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    //     // 是 2 的幂，一般用贴图
    //     gl.generateMipmap(gl.TEXTURE_2D);
    // } else {
    // //     // 不是 2 的幂，关闭贴图并设置包裹模式（不需要重复）为到边缘
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // }

    // 将纹理图像分配给纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // 将 0号纹理传递给着色器
    gl.uniform1i(u_Sampler, unitNum);

    gl.clear(gl.COLOR_BUFFER_BIT);

    console.log(gl_texUint0)
    console.log(gl_texUint1)
    if(gl_texUint0 && gl_texUint1) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    }

}



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
            varying vec2 v_Texture;
            void main() {
                vec4 color0 = texture2D(u_Sampler0, v_Texture);
                vec4 color1 = texture2D(u_Sampler1, v_Texture);
                gl_FragColor = color0 * color1;
            }
        `

    initShaders(gl, VSHADER, FSHADER);

    const initVertexBuffers = () => {
        const verticesTexture  = new Float32Array([
            // 顶点坐标, 纹理坐标
            -0.5, 0.5, 0.0, 1.0,
            -0.5,-0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5,-0.5, 1.0, 0.0,
        ])
        const vertexTexureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesTexture, gl.STATIC_DRAW);

        const FSIZE = verticesTexture.BYTES_PER_ELEMENT;
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
        gl.enableVertexAttribArray(a_Position);

        // 将纹理坐标分配给 a_Texture 并开启
        const a_Texture = gl.getAttribLocation(gl.program, 'a_Texture');
        gl.vertexAttribPointer(a_Texture, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
        gl.enableVertexAttribArray(a_Texture);
    }
    initVertexBuffers();


    const initTextures = () => {
        // 创建缓冲区纹理对象
        const texture0 = gl.createTexture();
        const texture1 = gl.createTexture();

        // 顶点个数
        const n = 4;
        const u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
        const u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');


        const image0 = new Image();
        const image1 = new Image();
        image0.onload = () => {
            loadTexture(gl, n, texture0, u_Sampler0, image0, 0);
            image1.onload = () => {
                loadTexture(gl, n, texture1, u_Sampler1, image1, 1);
            };
            image1.crossOrigin = "anonymous";
            // image.src = 'https://webglfundamentals.org/webgl/resources/leaves.jpg';
            image1.src = '../resource/texture/circle.gif';
        };
        image0.crossOrigin = "anonymous";
        // image.src = 'https://webglfundamentals.org/webgl/resources/leaves.jpg';
        image0.src = '../resource/texture/sky.jpeg';


    }
    initTextures()




}

multiTexture()





