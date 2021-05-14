/**
 *  2021/05/14
 *  绘制简单的三角形
 *  WebGL 可绘制的基本图形
 */
const draw_triangle = () => {
    const VSHADER_SOURCE =
        `
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
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


    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5]);
    // 画一个举例子
    const n = 3;

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.POINTS, 0, n);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);


    gl.drawArrays(gl.TRIANGLES, 0, n);
    // gl.drawArrays(mode, first, count); 剩下两个第一天有讲
    // mode 参数:
    // - `gl.POINTS` 一系列点, 绘制在 v0, v1, v2 ....
    // - `gl.LINES`  一系列单独的线段, 绘制在 (v0, v1), (v2, v3), (v4, v5) ....
    // - `gl.LINE_STRIP` 一系列连接的线段, 绘制在 (v0, v1), (v1, v2), (v2, v3) ....
    // - `gl.LINE_LOOP` 一系列连接的线段, (v0, v1), (v1, v2), (v2, v3) .... (vn, v0) 闭合了
    // - `gl.TRIANGLES` 一系列单独的三角形, 绘制在 (v0, v1, v2), (v3, v4, v5), (v6, v7, v8) ....
    // - `gl.TRIANGLE_STRIP` 一系列带状的三角形 (v0, v1, v2), (v2, v1, v3), (v2, v3, v4)... 注意顺序!
    //  > 第二个三角形是 (v2, v1, v3), 而不是(v1, v2, v3), 这是为了保持第二个三角形绘制也是按照逆时针的顺序
    // - `gl.TRIANGLE_FAN` 一系列三角形组成的扇形, 绘制在 (v0, v1, v2), (v0, v2, v3), (v0, v3, v4) ....
}
draw_triangle()


