import * as faceapi from 'face-api.js';
import React from 'react';
import axios from 'axios';
import PopUpModel from "./PopUpModel";
import {useNavigate} from "react-router-dom";
import swal from 'sweetalert';

function FaceEmotionDetection() {

    /**
     * state variables related to video state and the model state
     */
    const [recordVideo, setRecordVideo] = React.useState(false);
    const [modelReady, setModelReady] = React.useState(false);


    const webcamReference = React.useRef();
    const faceDetectionCanvasReferences = React.useRef();
    const navigate = useNavigate();

    /**
     * Defining the dimensions of the web camera video stream
     * @type {number}
     */
    const webcamVideoWidth = 640 / 2.4;
    const webcamVideoHeight = 480 / 2.4;


    React.useEffect(() => {

        const loadFaceDetectionModels = async () => {

            const MODEL_PATH = process.env.PUBLIC_URL + '/models';
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_PATH),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_PATH),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
            ]).then(() => {
                setModelReady(true);
                beginWebcamStream();
            });
        }
        loadFaceDetectionModels().then(r => console.log('Face detection models loaded ...'));
    }, []);

    const beginWebcamStream = () => {
        setRecordVideo(true);
        navigator.mediaDevices
            .getUserMedia({video: {width: 300}})
            .then(stream => {
                let videoFeed = webcamReference.current;
                videoFeed.srcObject = stream;
                videoFeed.play();
            })
            .catch(err => {
                console.error("Something went wrong. Error is:", err);
            });
    }


    let [noFaceCount, setNoFaceCount] = React.useState(0);
    let [notHappyEmotionCount, setNotHappyEmotionCount] = React.useState(0);
    let [isShowPopUp, setIsShowPopUp] = React.useState(false);

    const HAPPY = 'happy';
    const NEUTRAL = 'neutral';
    const SAD = 'sad';

    /**
     * This is handling the actions when there is a not happy emotion.
     * @param emotion
     */
    const handleNotHappyEmotions = (emotion) => {
        setNoFaceCount(noFaceCount = 0);
        console.log(':: handleNotHappyEmotions', emotion);
        if (emotion === SAD || emotion === NEUTRAL) {

            notHappyEmotionCount += 1;
            console.log('Current not happy count:', notHappyEmotionCount);
            if (notHappyEmotionCount > 5) {
                setIsShowPopUp(isShowPopUp = true);
            }
        } else {

            notHappyEmotionCount = 0;
            console.log('Resetting the not happy count.', notHappyEmotionCount);
        }
    }

    /**
     * This handles the actions when the child is not present.
     */
    const handleNoFaceDetected = () => {
        setNoFaceCount(noFaceCount = noFaceCount + 1);

        if (noFaceCount > 5) {
            //alert('බබා ඔයා ඉන්නවද?');
            swal({
                //title: "Good job!",
                text: "බබා ඔයා ඉන්නවද?",
                icon: "warning",
                button: "ඔව්",
            });
        }
    }

    const resetNotHappyEmotionCount = () => {
        console.log('::resetNotHappyEmotionCounsetNotHappyEmotionCountt');
        setNotHappyEmotionCount( 0);
        console.log('Not Happy Count >> ', notHappyEmotionCount);
        setIsShowPopUp(false);
    }

    const handleRedirect = () => {
        console.log('::handleRedirect');
        navigate("/therapy_session");
    }

    const handleWebcamStreamOnPlay = () => {
        setInterval(async () => {
            if (faceDetectionCanvasReferences.current && faceDetectionCanvasReferences) {

                faceDetectionCanvasReferences.current.innerHTML = faceapi.createCanvasFromMedia(webcamReference.current);
                const displayDimensions = {
                    width: webcamVideoWidth,
                    height: webcamVideoHeight
                }

                faceapi.matchDimensions(faceDetectionCanvasReferences.current, displayDimensions);

                const detections = await faceapi.detectAllFaces(webcamReference.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
                //console.log(detections);
                if (detections.length !== 0) {
                    setNoFaceCount(0);
                    const resizedDetections = faceapi.resizeResults(detections, displayDimensions);

                    faceDetectionCanvasReferences && faceDetectionCanvasReferences.current && faceDetectionCanvasReferences.current.getContext('2d').clearRect(0, 0, webcamVideoWidth, webcamVideoHeight);
                    faceDetectionCanvasReferences && faceDetectionCanvasReferences.current && faceapi.draw.drawDetections(faceDetectionCanvasReferences.current, resizedDetections);
                    faceDetectionCanvasReferences && faceDetectionCanvasReferences.current && faceapi.draw.drawFaceLandmarks(faceDetectionCanvasReferences.current, resizedDetections);

                    const canvas = document.createElement('canvas');
                    const detectedFace = detections[0].detection._box;
                    canvas.width = detectedFace._width;
                    canvas.height = detectedFace._height;

                    canvas.getContext('2d').drawImage(webcamReference.current, detectedFace._x, detectedFace._y, detectedFace._width, detectedFace._height, 0, 0, detectedFace._width, detectedFace._height);

                    const img = document.createElement("img");
                    img.src = canvas.toDataURL('image/jpg');
                    console.log('Sending Image data URL ...')
                    //console.log(img.src);
                    const payload = {
                        img: img.src
                    }

                    // With AWS
                    axios.post('http://127.0.0.1:5000' + '/predict_emotion', payload).then((response) => {
                        console.log('Calling Flask API')
                        handleNotHappyEmotions(response.data.emotion);
                    })
                } else {
                    handleNoFaceDetected();
                }

            }
        }, 5000)
    }

    const closeWebcamStream = () => {
        webcamReference.current.pause();
        webcamReference.current.srcObject.getTracks()[0].stop();
        setRecordVideo(false);
    }

    return (
        <div>
            {isShowPopUp &&
            <PopUpModel isShowPopUp={isShowPopUp} handleRedirect={handleRedirect}
                        resetNotHappyEmotionCount={resetNotHappyEmotionCount}/>}
            <div style={{padding: '12px', textAlign: 'center'}}>
                {
                    recordVideo && modelReady ?
                        <button onClick={closeWebcamStream} style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '15px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '10px'
                        }}>
                            Stop Video
                        </button>
                        :
                        <button onClick={beginWebcamStream} style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '15px',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '10px'
                        }}>
                            Start Video
                        </button>
                }
            </div>
            {
                recordVideo ?
                    modelReady ?
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                                <video ref={webcamReference} height={webcamVideoHeight} width={webcamVideoWidth}
                                       onPlay={handleWebcamStreamOnPlay} style={{borderRadius: '12px'}}/>
                                <canvas ref={faceDetectionCanvasReferences} style={{position: 'absolute'}}/>
                            </div>
                        </div>
                        :
                        <p>Loading ...</p>
                    :
                    <>
                    </>
            }
        </div>
    );
};

export default FaceEmotionDetection;
;