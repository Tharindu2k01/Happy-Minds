import React from "react";
import {AudioRecorder, useAudioRecorder} from "react-audio-voice-recorder";
import './quize-styleSheet.css';
import Navbar from "../common_components/navbar/navbar";
import Quiz_one from "../../assests/quize/quiz-one.mp4";

import ReactPlayer from "react-player";
import NewSpeechRecognition from "../speech_recognition/NewSpeechRecognition";


function QuizOne(props) {

    const [isVideoEnded, setIsVideoEnded] = React.useState(false);

    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className="quiz-grid">

                <div className="top-instruction-panel"></div>
                <div className="left-panel-quiz">
                </div>
                <div className="quiz-panel">
                    <ReactPlayer
                        url={Quiz_one}
                        playing={true}
                        controls={true}
                        onEnded={() => setIsVideoEnded(true)}
                    />
                </div>
                <div className="voice-input-panel">
                    {isVideoEnded && <NewSpeechRecognition/>}
                </div>
                <div className="right-panel-quiz">

                </div>
                <div className="bottom-button-panel"></div>
            </div>

        </>
    );
}

export default QuizOne;