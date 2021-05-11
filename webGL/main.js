const canvas = document.getElementById('webgl');

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


// 绘制顶点着色器
const VSHADER_SOURCE =
    `
        void main() {
            # 设置坐标
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
            # 设置尺寸
            gl_PointSize = 10.0;
        }
    `

const FSHADER_SOCUCE =
    `
        void main() {
            # 设置颜色
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `




