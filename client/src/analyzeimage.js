import * as faceapi from "face-api.js"


 export async function analyzeimage(img) {

    const image = await faceapi.bufferToImage(img)

    const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()

    // console.log(detection)
    if (!detection || detection.length === 0) {
        return false
    }
    
    const resized = await faceapi.resizeResults(detection, {
      width: 400,
      height: 600
    })

    const pointArr = []
    for (let coords of resized.landmarks.relativePositions) {
        pointArr.push(Object.values(coords))
    }
    return pointArr

  }