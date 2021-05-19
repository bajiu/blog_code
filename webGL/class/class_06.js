/**
 *  2021/05/18
 *  变换矩阵
 */
const draw_matrix = () => {

    const VSHADER_SOURCE =
        `
            attribute vec4 a_Position;
            // 变换矩阵
            uniform mat4 u_xformMatrix;
            
            void main() {
                gl_Position = u_xformMatrix * a_Position;
                gl_PointSize = 10.0;
            }
        `
    const FSHADER_SOURCE =
        `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `

    const ANGLE = 90.0;

    const n = 3;
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);


    const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');


    // 获取弧度
    const radian = Math.PI * ANGLE / 180;
    const cosB = Math.cos(radian),
        sinB = Math.sin(radian);


    // 注意 WebGL 中矩阵是列主序的
    // const xformMatrix = new Float32Array([
    //     cosB, sinB, 0.0, 0.0,
    //     -sinB,cosB, 0.0, 0.0,
    //     0.0,  0.0,  1.0, 0.0,
    //     0.0,  0.0,  0.0, 1.0
    // ])

    // 这个是平移
    const xformMatrix = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.3, 0.3, 0.0, 1.0
    ])
    // 矩阵的主序: **按行主序(row major oder)** 和 **按列主序(column major order)**

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position)

    // 将旋转矩阵传输给顶点着色器
    const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');



    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    // gl.uniformMatrix4fv(location, transpose, array)
    // 将 array 表示的 4 x 4 矩阵分配给由 location 指定的 uniform 变量
    // 参数:
    // - `location`: uniform 变量的储存位置
    // - `transpose`: 在 WebGL中必须指定为false
    // - `array`: 待传输的类型化数组, 4 x 4 矩阵按列主序存储在其中


    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
draw_matrix()
