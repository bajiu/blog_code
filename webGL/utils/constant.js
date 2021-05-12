/**
 * 获取常量方法
 */
const canvas = document.getElementById('webgl');
const gl = (() => {
    const gl = canvas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
})()


