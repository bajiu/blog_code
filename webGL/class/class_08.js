/**
 *  2021/05/19
 *  Matrix4 对象学习
 */

// 矩阵变换库 cuon-matrix.js
// 其中 Matrix4 对象提供了创建变换矩阵的方法(之后会review其中代码)


const draw_triangle_matrix = () => {
    // 创建变换矩阵,并将变换矩阵传给顶点着色器

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
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
            }
        `


    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    const ANGLE = 90.0;

    const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    const xformMatrix = new Matrix4();

    const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);


    initVertexBuffer(gl, vertices);
    setAttributeFromBuffer(gl, 'a_Position');

    // 如果旋转角度是正值, 那么旋转就是逆时针方向(class_05 右手法则)
    xformMatrix.setRotate(ANGLE, 0, 0, 1);
    console.log(xformMatrix.elements);
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);





    // Matrix 对象所支持的方法和属性
    // Matrix4.setIdentity()
    // Matrix4.setTranslate(x, y, z)
    // Matrix4.setRotate(angle, x, y, z)    旋转轴为 (x, y, z), 旋转轴无需归一化(后面会讲)
    // Matrix4.setScale(x, y, z)
    // Matrix4.translate(x, y, z)           所得结果保存在 Matrix4 中, 下同
    // Matrix4.rotate(angle, x, y, z)
    // Matrix4.scale(x, y, z)
    // Matrix4.set(m)                       将 Matrix4 实例设置为m, m必须也是一个 Matrix4 实力
    // Matrix4.elements                     类型化数组(Float32Array) 包含 Matrix4 实例的矩阵元素

    // 单位阵在矩阵乘法中的行为, 就像数字 1在乘法中的行为一样. 将一个矩阵乘以单位阵, 得到的结果和原矩阵完全相同.
    // 在单位阵中，对角线上的元素为 1.0, 其余的元素为0.0


    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0 ,3)




}

draw_triangle_matrix();


