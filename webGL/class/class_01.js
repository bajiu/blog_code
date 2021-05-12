/**
 *  2021/05/11
 *  webgl 基础 顶点着色器, 片元着色器
 *  画个点儿
 */


let canvas = document.getElementById('webgl');

const gl = canvas.getContext('webgl');


// gl.clearColor(red , green , blue , alpha); 取值范围 0.0 - 0.1
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 指定了背景色之后, 背景色就会驻存在 WEBGL 系统, 在下次调用 gl.clearColor() 前不会改变


// gl.clear( buffer );  取值范围:
// gl.COLOR_BUFFER_BIT 指定颜色缓冲区 默认值 (0.0, 0.0, 0.0, 0.0) 相关函数 gl.clearColor(red , green , blue , alpha);
// gl.DEPTH_BUFFER_BIT 指定深度缓冲区 默认值 1.0 相关函数 gl.clearDepth(depth)
// gl.STENCIL_BUFFER_BIT 指定模版缓冲区 默认值 0 相关函数 gl.clearStencil(s)

gl.clear(gl.COLOR_BUFFER_BIT);
// 告诉gl清空颜色缓冲区
// 三种缓冲区:  颜色缓冲区 ｜ 深度缓冲区 ｜ 模版缓冲区


// 画一个点
const draw_point = () => {
    // 绘制顶点着色器 GLSL ES语言
    const VSHADER_SOURCE =
        `
        void main() {
            // 设置坐标
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            // 设置尺寸 10像素
            gl_PointSize = 10.0;
        }
    `

    const FSHADER_SOCUCE =
        `
        void main() {
            // 设置颜色
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOCUCE)) {
        console.error('我觉着你可能是哪儿有问题');
        return;
    }
    // 前面洗过了这里就不洗了
    // gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(mode, first, count)
    // mode 指定绘制方式  接受以下常量符号:
    // | gl.POINTS | gl.LINES | gl.LINE_STRIP | gl.LINE_LOOP | gl.TRIANGLES | gl.TRIANGLE_STRIP | gl.TRIANGLE_FAN
    // 指定从那个顶点开始绘制 (整型数)
    // 指定绘制需要用到多少个顶点 (整型数)
    gl.drawArrays(gl.POINTS, 0, 1);


}
draw_point();








