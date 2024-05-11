import React from "react";
import './quize-styleSheet.css';
import Navbar from "../common_components/navbar/navbar";
import Quiz_one from "../../assests/quize/quiz-one.mp4";
import ReactPlayer from "react-player";
import NewSpeechRecognition from "../speech_recognition/NewSpeechRecognition";


function QuizOne(props) {

    const [isVideoEnded, setIsVideoEnded] = React.useState(false);

    return (
        <div>
                <Navbar/>
            <div className="quiz-grid">

                <div className="quiz-grid-top-banner"><h1 className="display-4">අකුරු කියමු </h1></div>

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

                <div className="quiz-grid-bottom-banner"></div>
            </div>

        </div>
    );
}

export default QuizOne;