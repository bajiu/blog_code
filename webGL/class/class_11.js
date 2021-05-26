/**
 *  2021/05/26
 *  gl.vertexAttribPointer() 的步进和偏移参数
 */


// gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
// gl.vertexAttribPointer() 的步进和偏移参数:
// 使用多个缓冲区对象向着色器传递多种数据, 适合数据量不大的情况,
// 当程序中的复杂三位图形具有成千上万个点的时候是难以维护
// webgl 允许我们把顶点的坐标和尺寸数据打包到同一个缓冲区对象中

// **交错组织**

const multiAttributeSize = () => {
    const VHSADER =
        `
            attribute vec4 a_Position;
            attribute float a_PointSize;
            void main() {
                gl_Position = a_Position;
                gl_PointSize = a_PointSize;
            }
        `
    const FSHADER =
        `
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
            }
        `

    initShaders(gl, VHSADER, FSHADER);

    const verticesSizes = new Float32Array([
        0.0,   0.5,  10.0,
        -0.5, -0.5,  20.0,
        0.5,  -0.5,  30.0
    ])



    const verticesSizesBuffer = gl.createBuffer();
    // initVertexBuffer(xf, verticesSizes);
    console.log(verticesSizesBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesSizesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);


    const FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    console.log(FSIZE)

    setAttributeFromBuffer(gl, 'a_Position', 2, FSIZE * 3, 0);

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');


    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
    // gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
    // stride 参数: 指定相邻两个顶点间的字节数, 默认为 0 (之后又会学到)
    // offset 参数: 偏移量没什么好说的

    // stride (跨过): 在缓冲区对象中, 单个顶点的所有数据(现在单指顶点的坐标和大小) 的字节数,
    // 也就是相邻两个顶点间的距离, 即步进参数




    gl.enableVertexAttribArray(a_PointSize);



    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 3);
}
multiAttributeSize();
