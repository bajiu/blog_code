const constraints = {
    audio: false,
    video: {
        width: 1280,
        height: 720
    }
}

const video = document.querySelector('video');
//
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        console.log(stream.getVideoTracks()[0])
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    }).catch((e) => {
    console.error(e)
});


const canvas =document.querySelector('canvas');

const gl = canvas.getContext('webgl');
const program = gl.createProgram();
gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0,0, 100, 100);


// 创建着色器程序
// const vertexShader =


const VSHADER =
    `
        attribute vec3 aPos;
        attribute vec2 aVertexAlphaTextureCoord;
        attribute vec2 aVertexColorTextureCoord;
        varying highp vec2 vAlphaTextureCoord;
        varying highp vec2 vColorTextureCoord;
        void main(void) {
            gl_Position = vec4(aPos,1);
            vAlphaTextureCoord = aVertexAlphaTextureCoord;
            vColorTextureCoord = aVertexColorTextureCoord;
        }
    `

const FSHADER =
    `
        precision highp float;
        varying highp vec2 vAlphaTextureCoord;
        varying highp vec2 vColorTextureCoord;
        uniform sampler2D uSampler0;
        void main(void) {
            vec4 color = texture2D(uSampler0, vec2(vColorTextureCoord.s, vColorTextureCoord.t));
            vec4 colorAlpha = texture2D(uSampler0, vec2(vAlphaTextureCoord.s, vAlphaTextureCoord.t));
            gl_FragColor = vec4(color.rgb, colorAlpha.b);
        }
    `

initShaders(gl, VSHADER, FSHADER);
// vertex data
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);



// TODO posVertex
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(posVertex), gl.STATIC_DRAW);







const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
// todo video
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.bindTexture(gl.TEXTURE_2D, null);
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);


