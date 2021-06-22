// webGlz着色器载入器 initShaders


/**
 * 首先调用createProgram()函数创建一个连接好的程序对象，然后告诉WebGL系统来使用这个程序对象，最后将程序悐设为gl对象的program属性
 * @param gl GL上下文
 * @param vshader 顶点着色器
 * @param fshader 片元着色器
 * @returns {boolean}
 */
const initShaders = (gl, vshader, fshader) => {
    const program = createProgram(gl, vshader, fshader);

    if (!program) {
        console.log('无法创建程序对象');
        return false;
    }

    gl.useProgram(program);

    // 自定义属性
    gl.program = program;

    return true;
}

/**
 * 创建程序对象，然后将前面撞见的顶点着色器和片元着色器分配给程序对象创建
 * @param gl GL上下文
 * @param vshader 顶点着色器
 * @param fshader 片元着色器
 * @returns {null|WebGLProgram}
 */
const createProgram = (gl, vshader, fshader) => {
    // 创建着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);

    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // 创建程序对象
    const program = gl.createProgram();
    if (!program) {
        return null;
    }

    // 为程序对象分配顶点着色器和片元着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 链接着色器
    gl.linkProgram(program);

    // 检查链接
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        const error = gl.getProgramInfoLog(program);
        console.log('无法连接程序对象: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

/**
 * 首先创建了一个着色器对象，然后为改着色器对象指定源代码，并进行编译，接着检查编译是否成功，如果编译成功，没有出错，就返回着色器对象
 * @param gl gl上下文
 * @param type 着色器类型
 * @param source 着色器资源
 */
const loadShader = (gl, type, source) => {
    // 创建着色器对象
    const shader = gl.createShader(type);
    if (shader == null) {
        console.log('无法创建着色器');
        return null;
    }

    // 设置着色器源代码
    gl.shaderSource(shader, source);

    // 编译着色器
    gl.compileShader(shader);

    // 检查着色器编译状态
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        const error = gl.getShaderInfoLog(shader);
        console.log('着色器编译失败: ' + error);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}


window.gl = (() => {
    const canvas = document.getElementById('webgl');
    canvas.preserveDrawingBuffer = true;
    const gl = canvas.getContext('webgl',{preserveDrawingBuffer:true});
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
})
