// 齐次坐标(x,y,z,w) 等价于三维坐标 (x/w, y/w, z/w)
// 如果齐次坐标的第四个分量是 1 就可以当三维坐标使用, w 的值必须是大于等于 0 的 如果趋近于0, 那么表示无穷远, 所以在齐次坐标系中是有无穷概念的


/**
 *  2021/05/12
 *  webGl 坐标系统
 *  attribute 变量
 */


// webGl 坐标系统
// webgl 右手坐标系 观察点位于 (0.0, 0.0, 0.0) 视线是 Z轴的负方向

// webgl 和 canvas 的坐标关系:
// - `<canvas>` 的中心点: (0.0, 0.0, 0.0)
// - `<canvas>` 的上边缘和下边缘: (-1.0, 0.0, 0.0) 和 (1.0, 0.0, 0.0)
// - `<canvas>` 的左边缘和右边缘: (0.0, -1.0, 0.0) 和 (0.0, 1.0, 0.0)

// attribute 变量


const draw_attribute = () => {
    const VSHADER_SOURCE =
        `
        // 储备限定符  类型    变量名
        //    ｜      ｜      ｜
        // attribute vec4 a_Position;
        
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 10.0;
        }
    `;
    const FSHADER_SOCUCE =
        `
        void main() {
            // 设置颜色
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOCUCE)) {
        console.error('你指定是哪儿有点儿毛病');
        return;
    }

    // gl.getAttribLocation(program, name)  获取 attribute 变量地址
    // 返回值是 attribute 的储存地址
    // 错误信息:
    // - `INVALID_OPERATION` (程序对象未能成功链接)
    // - `INVALID_VALUE` (name 参数的长度大于 attribute 变量名默认长度, 默认256字节)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.error('a_Position 有点儿毛病');
        return;
    }
    // 将指定位置传递个 attribute 变量
    gl.vertexAttrib3f(a_Position, 0.1, 0.1, 0.0);
    // gl.vertexAttrib3f(location, v0, v1, v2)
    // location 制定修改的 attribute 变量的储存位置
    // v0, v1, v2 分别为 attribute 变量对应三个分量的值
    // 错误信息:
    // - `INVALID_OPERATION` 没有当前程序对象
    // - `INVALID_VALUE` (location 大于等于 attribute 变量的最大数目 默认256字节)


    // gl.vertexAttrib3f() 同族函数
    // 该系列的函数的任务就是从 JavaScript 向顶点着色器中的 attribute 变量传值(v1, v2 默认传0.0 , v3默认 1.0)
    // gl.vertexAttrib1f(location, v0)
    // gl.vertexAttrib2f(location, v0, v1)
    // gl.vertexAttrib3f(location, v0, v1, v2)
    // gl.vertexAttrib4f(location, v0, v1, v2, v3)


    // gl.vertexAttrib`(基础函数名)`3`(参数个数)`f`(参数类型: 'f' 表示浮点数, 'i' 表示整数)`

    // const position = new Float32Array([1.0, 2.0, 3.0, 1.0])
    // gl.vertexAttribute4fv(a_Position, position)


    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1);


    // 坐标数组
    const g_points = [];
    // 点击事件
    const click = (event, gl, canvas) => {
        const x = event.clientX; // X坐标
        const y = event.clientY; // Y坐标
        const rect = event.target.getBoundingClientRect();


    }
    canvas.onmousedown = (event) => {

        click(event, gl, canvas, a_Position);

    }
}

draw_attribute()














