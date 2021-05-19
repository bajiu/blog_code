// 齐次坐标(x,y,z,w) 等价于三维坐标 (x/w, y/w, z/w)
// 如果齐次坐标的第四个分量是 1 就可以当三维坐标使用, w 的值必须是大于等于 0 的 如果趋近于0, 那么表示无穷远, 所以在齐次坐标系中是有无穷概念的


/**
 *  2021/05/12 - 2021/05/13
 *  webGl 坐标系统
 *  attribute 变量
 *  uniform 变量
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
        // 确定了GPU在计算浮点数时使用的精度
        // precision mediump float;
        //     ｜        |    
        //    精度     中精度(P)
        // 精度:  
        // highp   高精度 对于顶点位置
        // mediump 中精度 对于纹理坐标
        // lowp    低精度 对于颜色
        
        // 某些系统根本不支持highp，这将导致代码在这些系统上根本无法工作
        // 尽可能在WebGL中使用中级精度
        
        
        precision mediump float;
        
        uniform vec4 u_FragColor;
        
        void main() {
            // 设置颜色
            gl_FragColor = u_FragColor;
        }
    `;

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOCUCE)) {
        console.error('你指定是哪儿有点儿毛病');
        return;
    }

    // ### **获取 a_Position 变量的储存位置**


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


    // ### **获取 u_FragColor 变量的储存位置**
    // 具体地址信息上面有介绍
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (u_FragColor < 0) {
        console.error('u_FragColor 有点儿毛病');
        return;
    }


    // gl.clear(gl.COLOR_BUFFER_BIT)

    // gl.drawArrays(gl.POINTS, 0, 1);


    // 坐标数组
    const g_points = [];
    // 颜色数组
    const g_colors = [];
    // 点击事件
    const click = (event, gl, canvas, a_Position, u_FragColor) => {
        const x = event.clientX; // X坐标
        const y = event.clientY; // Y坐标
        const rect = event.target.getBoundingClientRect();
        const positionX = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
        const positionY = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
        // 将坐标储存到 g_points 数组中
        g_points.push(positionX);
        g_points.push(positionY);


        // 将颜色储存到 g_color 数组中
        if (positionX >= 0.0 && positionY >= 0.0) {
            // 第一象限
            g_colors.push([1.0, 0.0, 0.0, 1.0]); // 红色
        } else if (positionX < 0.0 && positionY < 0.0) {
            // 第三象限
            g_colors.push([0.0, 1.0, 0.0, 1.0]); // 绿色
        } else {
            // 另外两个
            g_colors.push([1.0, 1.0, 1.0, 1.0]); // 白色
        }

        // 清除canvas (因为在绘制点之后, 颜色缓冲区就被 webGl 重置为了默认颜色(0.0, 0.0, 0.0, 0.0) ,默认alpha 的分量是 0.0 所以给整透明了)
        gl.clear(gl.COLOR_BUFFER_BIT);

        const len = g_points.length;
        for (let i = 0; i < len; i += 2) {
            const rgba = g_colors[i/2];
            // 将点的位置传递到变量中 a_Position
            gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);
            console.log(rgba)

            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);


            gl.drawArrays(gl.POINTS, 0, 1);

        }

    }
    canvas.onmousedown = (event) => {
        click(event, gl, canvas, a_Position, u_FragColor);

    }
}
draw_attribute()

// 不知道有没有用
//早期软件渲染的时代，图形绘制的确是会去判断当前界面哪些像素区域可以复用，然后优先绘制这部分内容，下一次绘制的时候就不必清空它了，这样就能达到优化的目的，但是这样的优化会导致一些游戏中常见的著名的“镜子大厅Hall of mirrors”的效应。在现代的图形绘制 这种优化已经不再有效了，最新的gpu以不同的方式工作，如果屏幕是清空状态，反而能工作的更快，**通过gpu清空屏幕 ，可以节省帧拷贝浪费的时间。因为gpu的工作方式，清空屏幕可以帮助避免很多问题，如 闪烁，或者有物品没有绘制。**














