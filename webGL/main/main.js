/**
 *  2021/06/16
 *  播放视频
 */

const getVideo = () => {
    const video = document.createElement('video');
    video.src='../resource/cat.mp4'
    video.loop = true;
    video.autoplay = true;


    document.body.append(video)
    return video;
}



// 按照位判断偶数
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}



// 加载纹理
const loadTexture = (gl, n, texture, u_Sampler, image) => {

    // 对纹理图像进行 Y轴 反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    //
    gl.activeTexture(gl.TEXTURE0);
    //
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //
    //
    //
    //
    // // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //
    // if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    //     // 是 2 的幂，一般用贴图
    //     gl.generateMipmap(gl.TEXTURE_2D);
    // } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // }
    //
    // // 将纹理图像分配给纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //
    // // 将 0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

const textureQuad = () => {
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
            uniform sampler2D u_Sampler;
            varying vec2 v_Texture;
            void main() {
                gl_FragColor = texture2D(u_Sampler, v_Texture);
            }
        `

    initShaders(gl, VSHADER, FSHADER);



    // 设置纹理坐标
    const initVertexBuffers = () => {

        // const verticesTexture = new Float32Array([
        //     // 顶点坐标, 纹理坐标
        //     -0.5, 0.5, 0.0, 1.0,
        //     -0.5,-0.5, 0.0, 0.0,
        //     0.5, 0.5, 1.0, 1.0,
        //     0.5,-0.5, 1.0, 0.0,
        // ]);

        // 全屏
        const verticesTexture = new Float32Array([
            // 顶点坐标, 纹理坐标
            -0.5, 0.5, 0.0, 1.0,
            -0.5,-0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5,-0.5, 1.0, 0.0,
        ]);


        // // 修改后的纹理坐标
        // const verticesTexture = new Float32Array([
        //     // 顶点坐标, 纹理坐标
        //     -0.5, 0.5,-0.3, 1.7,
        //     -0.5,-0.5,-0.3,-0.2,
        //     0.5, 0.5, 1.7, 1.7,
        //     0.5,-0.5, 1.7,-0.2,
        // ]);



        const vertexTextureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesTexture, gl.STATIC_DRAW);

        const FSIZE = verticesTexture.BYTES_PER_ELEMENT;
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
        gl.enableVertexAttribArray(a_Position);

        // 将纹理坐标分配给 a_Texture 并开启
        const a_Texture = gl.getAttribLocation(gl.program, 'a_Texture');
        gl.vertexAttribPointer(a_Texture, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
        gl.enableVertexAttribArray(a_Texture);
    };

    initVertexBuffers();



    const initTextures = () => {
        // 创建纹理对象
        const texture = gl.createTexture();
        // gl.deleteTexture() 删除一个纹理对象

        const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        // 顶点个数
        const n = 4;
        const video = getVideo();
        document.body.addEventListener('click',()=> {
            video.play().then(() => {
                const ani = () => {
                    loadTexture(gl, n, texture, u_Sampler, video);
                    requestAnimationFrame(ani)
                }
                ani()
            })
        })

    }

    initTextures()
}
textureQuad()















