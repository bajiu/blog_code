/**
 *  2021/05/13
 *  webGl 缓冲区对象
 */


// webGL 提供了 **缓冲区对象(buffer object)**, 它可以一次性向着色器传入多个顶点的数据
// 我们可以一次性像缓冲区对象中填入大量的顶点数据, 然后将这些数据保存在其中, 供顶点着色器使用

const buffer_object = () =>{

    const VSHADER_SOURCE =
        `
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
                gl_PointSize = 10.0;
            }
        `
    const FSHADER_SOURCE =
        `
         void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
         }   
        `

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('你指定是哪儿有点儿毛病');
        return;
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    // 设置顶点的位置
    const initVertexBuffers = (gl) => {
        const vertices = new Float32Array([
            0.0, 0.5, -0.5, 0.5, -0.5
        ]);
        // 点的个数
        const n = 3;

        // 创建缓冲区对象
        const vertexBuffer = gl.createBuffer();
        // gl.deleteBuffer(buffer) 删除缓冲区对象

        // 将缓冲区对象绑定到目标(在这里, 表示向顶点着色器提供传给 attribute 变量的数据)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // gl.bindBuffer(target, buffer); 把缓冲区对象 buffer 绑定到 target 上
        // target 参数:
        // - `gl.ArrayBuffer` 表示缓冲区包含顶点的数据
        // - `gl.ELEMENT_ARRAY_BUFFER` 表示缓冲区对象中包含顶点的索引值(听说后面会学)
        // buffer 参数: 指定之前的由 gl.createBuffer() 返回的待绑定的缓冲区对象

        // 向缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        // 将第二个参数 `vertices` 中的数据写入了绑定到 第一个参数 `gl.ARRAY_BUFFER` 上的缓冲区对象
        // 我们不能直接向缓冲区写入数据, 只能向'目标'写入数据, 所以要向缓冲区写入数据, 必须先要绑定

        // gl.bufferData(target, data, usage); 开辟存储空间, 向绑定在 target 上的缓冲区对象写入 data
        // target gl.bindBuffer() 方法的一样
        // usage 参数:
        // - `gl.STATIC_DRAW`  只会向缓冲区对象写入一次数据, 但需要绘制很多次
        // - `gl.STREAM_DRAW`  只会向缓冲区对象写入一次数据, 然后绘制若干次
        // - `gl.DYNAMIC`      会向缓冲区对象中多次写入数据, 并绘制多次



        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        // 将缓冲区对象分配给 a_Position 对象
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        // gl.vertexAttribPointer(location, size, type, normalized, stride, offset); 判定将 gl.ARRAY_BUFFER 的缓冲区对象分配给 location 指定的 attribute 变量
        // type 参数:  gl.UNSIGNED_BYTE | gl.SHORT | gl.UNSIGNED_SHORT | gl.INT | gl.UNSIGNED_INT | gl.FLOAT
        // normalized 参数: Boolean 值, 表明是否将非浮点型的数据归一化到 [0, 1] 或 [-1, 1] 之间
        // stride 参数: 指定相邻两个顶点间的字节数, 默认为 0 (之后又会学到)
        // offset 参数: 偏移量没什么好说的




        // 连接 a_Position 变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_Position);
        // 为了使顶点着色器能够访问 缓冲区内的数据, 我们需要用 gl.enableVertexAttribArray(location) 方法来开启 attribute 变量
        // `gl.disableVertexAttribArray(location)` 关闭分配


        return n;

    }


    const n = initVertexBuffers(gl);




    gl.drawArrays(gl.POINTS, 0, n);


}
buffer_object()

// 流程:
// 1. 创建缓冲区对象 `gl.createBuffer()`
// 2. 绑定缓冲区对象 `gl.bindBuffer()`
// 3. 将数据写入缓冲区对象 `gl.bufferData()`
// 4. 将缓冲区对象分配给一个 attribute 对象 `gl.vertexAttribPointer()`
// 5. 开启 attribute 变量 `gl.enableVertexAttribArray()`