/**
 *  2021/10/20
 *  旗子飘动
 */






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
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

}

const textureQuad = () => {
    const VSHADER =
        `
            uniform float u_Distance;
            attribute vec2 a_Position;
            varying vec2 v_UV;
            varying float v_Slope;
            
            float PI = 3.14159;
            float scale = 0.8;
            
            void main() {
            
              float x = a_Position.x;
              float y = a_Position.y;
            
              float amplitude = 1.0 - scale; // 振幅
              float period = 2.0;  // 周期
              float waveLength = 2.0 * scale;
            
              v_UV = (mat3(0.625,0,0, 0,0.625,0, 0.5,0.5,1) * vec3(x, y, 1.0)).xy;
              y += amplitude * ( (x - (-scale)) / waveLength) * sin(2.0 * PI * (x - u_Distance));
            
              float x2 = x - 0.001;
              float y2 = a_Position.y + amplitude * ( (x2 - (-scale)) / waveLength) * sin(2.0 * PI * (x2 - u_Distance));
            
              v_Slope = y - y2;
              gl_Position = vec4(vec2(x, y), 0.0, 1.0);
            }
        `
    const FSHADER =
        `
            precision mediump float;
            uniform sampler2D u_Sampler;
            varying vec2 v_UV;
            varying float v_Slope;
            
            void main() {
              vec4 color = texture2D( u_Sampler, v_UV );
              if( v_Slope > 0.0 ) {
                color = mix( color, vec4(0.0, 0.0, 0.0, 1.0), v_Slope * 300.0 );
              }
              if( v_Slope < 0.0 ) {
                color = mix( color, vec4(1.0), abs(v_Slope) * 300.0 );
              }
              if(v_UV.x < 0.0 || v_UV.x > 1.0 || v_UV.y < 0.0 || v_UV.y > 1.0) {
                color.a = 0.0;
              }
              gl_FragColor = color;
            }
        `

    initShaders(gl, VSHADER, FSHADER);



    // 设置纹理坐标
    const initVertexBuffers = (size = {width: 0,height: 0}) => {
        const {width,height} = size;
        console.log(size)
        // const verticesTexture = new Float32Array([
        //     // 顶点坐标, 纹理坐标
        //     -0.5, 0.5, 0.0, 1.0,
        //     -0.5,-0.5, 0.0, 0.0,
        //     0.5, 0.5, 1.0, 1.0,
        //     0.5,-0.5, 1.0, 0.0,
        // ]);

        // 宽高比
        const ratio = width / height;
        const vertexHeight = 1;
        const vertexWidth = vertexHeight * ratio;

        // 全屏
        const verticesTexture = new Float32Array([
            // 顶点坐标, 纹理坐标
            -vertexWidth/2, vertexHeight, 0.0, 1.0,
            -vertexWidth,-vertexHeight, 0.0, 0.0,
            vertexWidth/2, vertexHeight, 1.0, 1.0,
            vertexWidth,-vertexHeight, 1.0, 0.0,
        ]);

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
    const width = video.videoWidth;
    const height = video.videoHeight;
    initVertexBuffers({width,height});
    const fps = 30;




    const initTextures = () => {
        // 创建纹理对象
        const texture = gl.createTexture();
        const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        // 顶点个数
        const n = 4;
        const video = getVideo();
        document.body.addEventListener('click',()=> {
            video.play().then(() => {
                const width = video.videoWidth;
                const height = video.videoHeight;
                initVertexBuffers({width,height});
                const fps = 30;
                const tick = () => {
                    setTimeout(function() {
                        loadTexture(gl, n, texture, u_Sampler, video);
                        requestAnimationFrame(tick);
                    }, 1000 / fps);
                }
                // todo 顶点着色器不挂载完之后会有警告
                // RENDER WARNING: texture bound to texture unit 0 is not renderable. It might be non-power-of-2 or have incompatible texture filtering (maybe)?
                tick();
            })
        })

    }

    // initTextures()
}
textureQuad()















