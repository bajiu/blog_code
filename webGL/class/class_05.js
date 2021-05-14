/**
 *  2021/05/14
 *  WebGL 移动, 旋转, 和缩放
 */


// 变换(transformations)
// 仿射变换(affine transformations)

// 顶点着色器需要的数据，可以通过以下三种方式获得
// - `Attributes` 属性 (从缓冲中获取的数据)
// - `Uniforms` 全局变量 (在一次绘制中对所有顶点保持一致值)
// - `Textures` 纹理 (从像素或纹理元素中获取的数据)




const draw_transform = () => {

    // 先画一个三角形
    const VSHADER_SOURCE =
        `
            attribute vec4 a_Position;
            // 平移
            uniform vec4 u_Translation; 
            // 旋转
            uniform float u_CosB, u_SinB;
          
            void main() {
                
                // 旋转 (具体计算参考 书第 92 页)
                gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB + u_Translation.x;
                gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB + u_Translation.y; 
                   
                // 这俩要是没有的话，就是默认值 0 了
                gl_Position.z = a_Position.z;
                gl_Position.w = 1.0;
                // 平移
                // gl_Position = a_Position + u_Translation;
                
                gl_PointSize = 10.0;
            }
        `
    const FSHADER_SOURCE =
        `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `


    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const vertexBuffer = gl.createBuffer();
    const n = 3;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');


    // 平移
    // 获取平移距离地址给到 JS 变量(注意这里变成 `uniform` 了)
    const u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    gl.uniform4f(u_Translation, 0.3, 0.3, 0.0, 0.0);


    // 旋转
    // 为了描述一个旋转, 必须指明:
    // - 旋转轴 (图形将围绕旋转轴旋转)
    // - 旋转防线 (方向: 顺时针或逆时针)
    // - 旋转角度 (图形旋转经过的角度)

    // > 确认旋转方向(右手旋转法则): 右手握拳, 大拇指指向旋转轴正方向, 右手其余几个手指表明旋转方向

    // 旋转角度
    const angle = 45.0;
    // 将旋转所需的数据传递给顶点着色器
    const radian = Math.PI * angle/180; // 转换为弧度制


    // **这两个玩意必须接受的是弧度制!!!**(不是角度)
    const cosB = Math.cos(radian);
    const sinB = Math.sin(radian);

    const u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    const u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);





    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);


}
draw_transform()
