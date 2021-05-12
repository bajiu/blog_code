/**
 * 获取常量方法
 */


window.gl = (() => {
    const canvas = document.getElementById('webgl');
    const gl = canvas.getContext('webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
})()


