import React from "react";
import './lessson-styleSheet.css';
import {useNavigate} from "react-router-dom";
import Navbar from "../common_components/navbar/navbar";
import ReactPlayer from "react-player";
import lesson_01 from "../../assests/lesson-page/lesson-videos/lesson_01.mp4";
import buttonImage from "../../assests/home-page/home-button.gif";
import FaceEmotionDetection from "../face_and_emotion_detection/FaceEmotionDetection";
import png from "../../assests/lesson-page/png.png"

const First_lesson = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="background">
                <Navbar/>
                <div className="lesson-page-grid">
                    <div className="lesson-video-panel">
                        <ReactPlayer
                            width="100%"
                            height="100%"
                            // ref={this.playerRef}
                            url={lesson_01}
                            playing={false}
                            controls={true}
                            onEnded={() => navigate("/Quiz_one")}
                        />
                    </div>

                    <div className="lesson-webcam-panel">
                        <FaceEmotionDetection
                        />
                    </div>

                    <div className="lesson-right-panel">
                        <button className="go-button-lesson1">
                            <img className="go-button-img-lesson1"
                                 src={buttonImage}
                            />
                        </button>
                    </div>

                    <div className="lesson-left-panel">
                        <img className="png-img" src={png}></img>
                    </div>
                    <div className="lesson-bottom-panel"></div>

                </div>
            </div>
        </>

    );
}
export default First_lesson;