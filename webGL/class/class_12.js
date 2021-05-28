/**
 *  2021/05/27
 *  顶点着色器和片元着色器的传值
 *  varying 变量
 */


// 在顶点着色器和片元着色器之前有这样两个步骤
    // **图形装配过程** : 这一步的任务是, 将孤立的顶点坐标装配成几何图形, 几何图形的类别由 gl.drawArrays() 的第一个参数决定
    // **光栅化过程** : 这一步的过程是将装配好的几何图形转化为片元


const MultiAttributeColor = () => {
        // uniform 一致的
        // varying 可变的

        const VSHADER =
            `
            attribute vec4 a_Position;
            attribute vec4 a_Color;
            // varying 变量
            varying vec4 v_Color;
            void main () {
                gl_Position = a_Position;
                gl_PointSize = 10.0;
                // 将数据传递给片元着色器
                v_Color = a_Color;
            }
        `
        const FSHADER =
            `
            // 片元着色器一定要设定精度
            precision mediump float;
            varying vec4 v_Color;
            void main () {
                // 从顶点着色器 接受数据
                gl_FragColor = v_Color;
            }
        `

        // varying 变量的作用和内插
        // 我们在顶点着色器中向 varying 赋上两个颜色(红、蓝)
        // 那么WebGL 就会自动的计算出线段上所有的点(片元)的颜色, 并赋值给片元着色器中的 varying 变量 v_Color
        // 就是传说中的内插过程

        initShaders(gl, VSHADER, FSHADER);

        const verticesColor = new Float32Array([
            0.0,  0.5, 1.0, 0.0, 0.0,
            -0.5,-0.5, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.0, 0.0, 1.0
        ]);

        const verticesColorBuffer = gl.createBuffer();
        // 将顶点坐标和颜色写入缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesColor, gl.STATIC_DRAW);

        const FSIZE = verticesColor.BYTES_PER_ELEMENT;
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(a_Position);

        // 获取 a_Color 的存储位置, 分配缓冲区并开启
        const a_Color = gl.getAttribLocation(gl.program, 'a_Color');

        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
        gl.enableVertexAttribArray(a_Color);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

    }

MultiAttributeColor()
