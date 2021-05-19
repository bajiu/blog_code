/**
 *  2021/05/19
 *  复习
 */


const draw_review_01 = () => {
    const VSHADER_SOURCE =
        `
            attribute vec4 a_Position;
            uniform mat4 u_xformMatrix;
            void main() {
                gl_Position = u_xformMatrix * a_Position;
                gl_PointSize = 10.0;
            }
        `
    const FSHADER_SOURCE =
        `
            precision mediump float;
            uniform vec4 u_FragColor;
            void main () {
                gl_FragColor = u_FragColor;
            }
        `

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('你多少是有点儿问题');
        return;
    }
    const n = 3;



    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')


    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0,0)
    gl.enableVertexAttribArray(a_Position);
    const xformMatrix = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.3, 0.3, 0.0, 1.0
    ])
    const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    const u_fragColor = gl.getUniformLocation(gl.program, 'u_fragColor');
    gl.uniform4f(u_fragColor, 0.0, 1.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n)

}

draw_review_01()

