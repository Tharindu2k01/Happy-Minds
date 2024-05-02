import React from "react";
import './lessson-styleSheet.css';
import {useNavigate} from "react-router-dom";
import Navbar from "../common_components/navbar/navbar";
import left_pane from "../../assests/lesson-page/lesson-left-pane.jpg";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import buttonImage from "../../assests/home-page/home-button.gif";
import FaceEmotionDetection from "../face_and_emotion_detection/FaceEmotionDetection";
const therapy_video_path = 'https://www.youtube.com/watch?v=rlDaAHt41hA';

const Therapy_session = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className= "background">
                <Navbar/>
                <div className="lesson-page-grid">
                    <div className="lesson-left-panel">
                        <img className="left-panel-img"
                             src={left_pane}
                        />
                    </div>
                    <div className="lesson-video-panel">
                        <ReactPlayer
                            width="100%"
                            height="100%"
                            // ref={this.playerRef}
                            url={therapy_video_path}
                            playing={true}
                            controls={true}
                            onEnded={() => navigate("/lessons_selection")}
                        />
                    </div>

                    <div className="lesson-webcam-panel1">
                        <Webcam
                            muted={true}
                            mirrored={true}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "fill",
                            }}
                        />
                    </div>

                    <div className="lesson-right-panel">
                        <a className="navbar-brand" href={'/lessons_selection'}>
                            <button className="go-button-lesson">
                                <img className="go-button-img-lesson"
                                     src={buttonImage}
                                />
                            </button>
                        </a>
                    </div>

                    <div className="lesson-bottom-panel"></div>

                </div>
            </div>
        </>

    );
}
export default Therapy_session;