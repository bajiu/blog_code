/**
 *  2021/05/29
 *  纹理映射 (texture mapping)
 */

// 纹理映射: 将一张图像(贴纸) 映射(贴) 到一个几何图形表面上去
// 纹理映射的作用, 就是根据纹理图像, 为之前的光栅化后的每个片元涂上合适的颜色, 组成纹理图像的像素又被成为 纹素
// 每一个纹素 的颜色都使用 rgb 或 rgba 格式编码

// 纹理映射步骤:
// 1. 准备好映射到几何图形上的纹理图像.
// 2. 为几何图形配置纹理映射方式.(详情纹理坐标)
// 3. 加载纹理图像, 对其进行一些配置, 以在 WebGL 中使用它.
// 4. 在片元着色器中将相应的纹素从纹理中抽取出来, 并将纹素的颜色赋给片元.



// 纹理坐标:
// 纹理坐标是纹理图像上的坐标, 通过纹理坐标可以在纹理图像上获取纹素颜色
// WebGL 中纹理的坐标系统是 二维的 , 使用 s 和 t 命名纹理坐标(st坐标系统)




// 本节一共分为5个部分
// 1. 顶点着色器中接收顶点的纹理坐标, 光栅化后传递给片元着色器
// 2. 片元着色器根据片元的纹理坐标, 从纹理图像中抽取出纹素颜色, 赋给当前片元
// 3. 设置顶点的纹理坐标 ( initVertexBuffers() )
// 4. 准备待加载的纹理图像, 令浏览器读取它 ( initTextures() )
// 5. 监听纹理图像的加载事件, 一旦加载完成, 就在 WebGL 系统中使用纹理 ( loadTexture() )



// 按照位判断偶数
function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}



// 加载纹理
const loadTexture = (gl, n, texture, u_Sampler, image) => {

    // 对纹理图像进行 Y轴 反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    // WebGL 纹理坐标系统中的 t 轴方向和 PNG, BMP, JPG 等格式图片的坐标系统的 Y轴方向是相反的
    // gl.pixelStorei(pname, param)  使用 pname 和 param 指定的方式处理加载得到的图像
    // 参数:
    // - pname: 可以是以下二者之一
    //          1. gl.UNPACK_FLIP_Y_WEBGL 对图像进行 Y轴反转, 默认为false
    //          2. gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL 将图像 RGB 颜色值的每一个分量乘以A, 默认值为false


    // 开启 0号纹理单元 (在使用纹理之前, 需要激活它)
    gl.activeTexture(gl.TEXTURE0);
    // gl.TEXTURE0 ~ gl.TEXTURE7 是管纹理图像的8个单元, 默认情况下 WebGL 至少支持 8 个纹理单元, 一些其他的系统支持的个数更多
    // 每一个都与 gl.TEXTURE_2D 相关联 ( 参考 WebGL纹理单元 )


    // gl.activeTexture()
    // WebGL 通过一种称为 **纹理单元(texture unit)** 的机制来同时使用多个纹理,
    // 每个纹理单元有一个编号来管理一张纹理图像, 即使你的程序只有一张纹理图像, 也得为其制定一个纹理单元


    // 向 target 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.bindTexture(target, texture)  texture - 表示被被定的纹理单元
    // 告诉 WebGL 系统纹理对象使用的是那种类型的纹理
    // gl.TEXTURE_2D 二维纹理
    // gl.TEXTURE_CUBE_MAP 立方体纹理






    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.gexParameteri(target, pname, param) 如何根据纹理坐标获取纹素颜色, 按哪种方式重复填充纹理
    // 参数：
    //      - target  gl.TEXTURE_2D 或 gl.TEXTURE_CUBE_MAP
    //      - pname: 纹理参数
    //      - param: 纹理参数的默认值

    //          纹理参数             ｜     描述      ｜     默认值
    //     gl.TEXTURE_MAG_FILTER        纹理放大           gl.LINEAR
    //     gl.TEXTURE_MIN_FILTER        纹理缩小           gl.NEAREST_MIPMAP_LINEAR
    //     gl.TEXTURE_WRAP_S           纹理水平填充         gl.REPEAT
    //     gl.TEXTURE_WRAP_T           纹理垂直填充         gl.REPEAT


    // 可以赋值给 gl.TEXTURE_MAG_FILTER 和 gl.TEXTURE_MIN_FILTER 非金字塔纹理类型常量
    //  gl.NEAREST  使用原纹理上距离映射后像素 (新像素) 中心最近的那个像素的颜色值, 作为新像素的值(使用曼哈顿距离, 即直角距离,棋盘距离)
    //  gl.LINEAR   使用距离新像素中心最近的四个像素的颜色值的加权平均, 作为新的像素的值
    //              ( 与 gl.NEAREST 相比, 该方法的图像质量更好, 但是会有较大的开销 )


    // 可以赋值给 gl.TEXTURE_WRAP_S 和 gl.TEXTURE_WRAP_T
    // gl.REPEAT            平铺式的重复纹理
    // gl.MIRRORED_REPEAT   镜像对称式的重复纹理
    // gl.CLAMP_TO_EDGE     使用纹理图像边缘值




    // 检查每个维度是否是 2 的幂
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // 是 2 的幂，一般用贴图
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        // 不是 2 的幂，关闭贴图并设置包裹模式（不需要重复）为到边缘
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }



    // 将纹理图像分配给纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    // gl.texImage2D(target, level, internalformat, type, image)
    //                         0      图像内部格式



    // 将 0号纹理传递给着色器
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
        //      0.5, 0.5, 1.0, 1.0,
        //      0.5,-0.5, 1.0, 0.0,
        // ]);


        // 修改后的纹理坐标
        const verticesTexture = new Float32Array([
            // 顶点坐标, 纹理坐标
            -0.5, 0.5,-0.3, 1.7,
            -0.5,-0.5,-0.3,-0.2,
            0.5, 0.5, 1.7, 1.7,
            0.5,-0.5, 1.7,-0.2,
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

    initVertexBuffers();



    const initTextures = () => {
        // 创建纹理对象
        const texture = gl.createTexture();
        // gl.deleteTexture() 删除一个纹理对象

        const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        // 顶点个数
        const n = 4;
        const image = new Image();
        image.onload = () => {
            loadTexture(gl, n, texture, u_Sampler, image);
        };
        image.crossOrigin = "anonymous";
        // image.src = 'https://webglfundamentals.org/webgl/resources/leaves.jpg';
        image.src = '../resource/texture/brick.jpeg';

    }

    initTextures()


}
textureQuad()






