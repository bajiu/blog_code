/**
 *  2021/05/26
 *  整个移动的三角形
 */



const rotate_triangle = (currentAngle) => {
    const VSHADER =
        `
            attribute vec4 a_Position;
            uniform mat4 u_matrix;
            void main() {
                gl_Position = a_Position * u_matrix;
                gl_PointSize = 10.0;
            }
        `
    const FSHADER =
        `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
            }
        `
    initShaders(gl, VSHADER, FSHADER);
    const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    initVertexBuffer(gl, vertices);

    setAttributeFromBuffer(gl, 'a_Position');

    const matrix = new Matrix4();
    console.log(currentAngle)
    matrix.setRotate(currentAngle, 0, 0, 1);
    const u_Matrix = gl.getUniformLocation(gl.program, 'u_matrix');

    gl.uniformMatrix4fv(u_Matrix, false, matrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

let last_time = Date.now();
const ANGLE_STEP = 10.0
const animate = (angle) => {
    const now = Date.now();
    const elapsed = now - last_time;
    last_time = now;
    let newAngle = angle + (ANGLE_STEP * elapsed) / 1000;
    return newAngle %= 360
}
let currentAngle = 0;
const tick = () => {
    currentAngle = animate(currentAngle);
    rotate_triangle(currentAngle);
    requestAnimationFrame(tick);
}
tick()