/**
 * 公用方法集合
 */

const initVertexBuffer = (gl, vertices) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}

const initSizeBuffer = (gl, sizes) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
}

const setAttributeFromBuffer = (gl, name, size = 2, stride = 0, offset = 0) => {
    const attribute = gl.getAttribLocation(gl.program, name);
    gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, stride, offset);
    gl.enableVertexAttribArray(attribute);
}


const draw = (gl, size) => {
    gl.drawArrays(gl.TRIANGLES, 0, size);
}
