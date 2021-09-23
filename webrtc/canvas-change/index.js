console.log('run this');
const constraints = {
    audio: false,
    video: {
        width: 300,
        height: 300
    }
}
const video = document.createElement('video');
const canvas = document.querySelector('canvas');

const video1 = document.createElement('video');

const getCanvas1Data = () => {
    const canvas1 = document.getElementById('canvas1');
    const ctx = canvas1.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


    // 处理数据
    const data = myImageData.data;
    // const myImageData1 = Object.assign({}, myImageData);
    // console.log(data)
    const myImageData1 = new ImageData(myImageData.width, myImageData.height);
    // console.log(myImageData)
    // console.log(myImageData1)
    // console.log('----')
    const data1 = myImageData1.data;


    for (let j = 0; j < data1.length; j += 4) {

        data1[j] = data[data.length - j];
        data1[j + 1] = data[data.length - j + 1];
        data1[j + 2] = data[data.length - j + 2];
        data1[j + 3] = data[data.length - j + 3];
    }
    // for (let i = 0; i < data.length; i += 4) {
    //     data[i]     = 255 - data[i];     // red
    //     data[i + 1] = 255 - data[i + 1]; // green
    //     data[i + 2] = 255 - data[i + 2]; // blue
    // }


    // console.log(myImageData)
    // console.log(myImageData1)
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    ctx2.putImageData(myImageData1, 0, 0);
}


const getVideo = () => {
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            console.log('获取到流')

            console.log(stream.getTracks())
            video.srcObject = stream;
            console.log(video.srcObject)
            // video.src = URL.createObjectURL(stream);
            video.onloadedmetadata = function (e) {
                console.log(e);
                video.play().then(() => {
                    console.log(video)
                    console.log(video.videoWidth)
                })
                setInterval(() => {
                    getCanvas1Data();
                }, 10);

            };
        }).catch((e) => {
        console.error(e)
    });
    const canvas2 = document.getElementById('canvas2');
    const stream = canvas2.captureStream(25);
    video1.srcObject = stream;
    video1.onloadedmetadata = function (e) {
        video1.play()
    }

    document.body.append(video);
    document.body.append(video1);
}


getVideo();

// const peer = () => {
//     // 创建peer
//     let iceServer = {
//         "iceServers": [
//             {
//                 "url": "http://localhost:3000"
//             }
//         ],
//         sdpSemantics: 'plan-b',
//         // sdpSemantics: 'unified-plan',
//         // bundlePolicy: 'max-bundle',
//         // iceCandidatePoolSize: 0
//     };
// // 创建
// //兼容浏览器的PeerConnection写法
//     let PeerConnection = (window.PeerConnection || window.webkitRTCPeerConnection)
// // 创建
//     var peer = new RTCPeerConnection(iceServer);
// }

