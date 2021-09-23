const cameraVideo = document.createElement('video');




let timer = 0;
const size = {
    width: 640,
    height: 480
}
const constraints = {
    audio: false,
    video: size,
}
const startRecord = () => {

}

const getCameraVideo = () => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        console.log('获取到流')
        cameraVideo.srcObject = stream;
        cameraVideo.onloadedmetadata = (e) => {
            console.log(e);
            cameraVideo.play().then(() => {

                const mediaSource = new MediaSource();
                video.src = URL.createObjectURL(mediaSource);
                mediaSource.addEventListener('sourceopen', sourceOpen);


                const buffer = [];

                const options = {
                    //录制视频，格式为webm
                    mimeType: 'video/webm;codecs=vp8'
                };
                const mediaRecorder = new MediaRecorder(stream,options);
                mediaRecorder.ondataavailable = (e) => {
                    e.data.arrayBuffer().then((res) => {
                        console.log(res)
                    })
                };
                mediaRecorder.start(10);





            })
        }
    }).catch((e) => {
        console.error(e)
    });
    document.body.append(cameraVideo)
}

getCameraVideo()



