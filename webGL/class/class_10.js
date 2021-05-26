/**
 *  2021/05/26
 *  颜色与纹理
 */



// 下面我们主要讨论以下三个问题
// - 将顶点的其他(非坐标)数据  -- 如颜色 -- 传入顶点着色器
// - 发生顶点着色器和片元着色器之间的从图形到片元的转化, 又称为 **图元光栅化** (rasterzation process)
// - 将图像 (或称纹理) 映射到图形或三维对象的表面上






const MultiPoint = () => {
    const VSHADER =
        `
        attribute vec4 a_Position;
        uniform mat4 u_Matrix;
        attribute float a_PointSize;
        void main () {
            gl_Position = a_Position * u_Matrix;
            gl_PointSize = a_PointSize;
        }
    `
    const FSHADER =
        `
        void main () {
            gl_FragColor = vec4(0.0, 1.0, 0.0 ,1.0);
        }
    `

    initShaders(gl, VSHADER, FSHADER);
    const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    initVertexBuffer(gl, vertices)
    setAttributeFromBuffer(gl, 'a_Position');
    const matrix = new Matrix4();
    const u_Matrix = gl.getUniformLocation(gl.program, 'u_Matrix');
    gl.uniformMatrix4fv(u_Matrix, false, matrix.elements);


    const sizes = new Float32Array([10.0, 20.0, 30.0]);

    const buffer = gl.createBuffer();
    // 将顶点尺寸写入缓冲区对象 并开启
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');


    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
    // gl.vertexAttribPointer() 的步进和偏移参数:
    // 使用多个缓冲区对象向着色器传递多种数据, 适合数据量不大的情况,
    // 当程序中的复杂三位图形具有成千上万个点的时候是难以维护

    gl.enableVertexAttribArray(a_PointSize);



    // 封装方法
    // initSizeBuffer(gl, sizes)
    // setAttributeFromBuffer(gl, 'a_PointSize', 1)



    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 3)


}

MultiPoint()

