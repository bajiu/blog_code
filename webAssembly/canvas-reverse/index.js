const cameraVideo = document.createElement('video');
const showVideo = document.createElement('video');
const cameraCanvas = document.createElement('canvas');
const showCanvas = document.createElement('canvas');

let timer = 0;
const size = {
    width: 640,
    height: 480
}
const constraints = {
    audio: false,
    video: size,
}
cameraCanvas.width = size.width
cameraCanvas.height = size.height
showCanvas.width = size.width
showCanvas.height = size.height



const go = new Go();
WebAssembly.instantiateStreaming(fetch("./revert.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
    console.log(window)
    // console.log(say([1,2,3]))
    getCameraVideo()
});



const getCameraVideo = () => {
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            console.log('获取到流')
            cameraVideo.srcObject = stream;
            cameraVideo.onloadedmetadata = (e) => {
                console.log(e);
                cameraVideo.play().then(() => {
                    timer = setInterval(() => {
                        // console.log('load-canvas-data');
                        getCameraCanvas();
                    }, 50)
                })
            }
        }).catch((e) => {
            console.error(e)
        });
    document.body.append(cameraVideo)
    document.body.append(showCanvas)
    document.body.append(cameraVideo)
}


const getCameraCanvas = () => {
    const ctx = cameraCanvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0, size.width, size.height)
    const imageData = ctx.getImageData(0,0,size.width, size.height);

    const data = imageData.data;
    // console.log(data)
    // console.log(say(data))
    // const reverseData = say(data);
    // const arr = new Uint8ClampedArray(reverseData);
    const arr = reverse(data);
    // console.log('-------')live-win-box-small
    // console.log(arr)
    imageData.data = arr;
    // console.log(imageData)
    const newImageData = new ImageData(arr, size.width, size.height);
    // console.log(newImageData)
    setShowCanvas(newImageData);
}

const setShowCanvas = (imageData) => {
    const ctx2 = showCanvas.getContext('2d');
    ctx2.putImageData(imageData, 0, 0);
}

const reverse = (data) => {
    const newImageData = new ImageData(size.width, size.height);
    const newData = newImageData.data;
    // console.log(data)
    for (let j = 0; j < data.length; j += 4) {
        // console.log( data[data.length - j])
        newData[j] = data[data.length - j];
        newData[j + 1] = data[data.length - j + 1];
        newData[j + 2] = data[data.length - j + 2];
        newData[j + 3] = data[data.length - j + 3];
    }
    // console.log(newData)
    return newData;
}
