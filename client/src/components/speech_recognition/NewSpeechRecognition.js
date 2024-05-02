import React, {useState, useEffect, useRef} from "react";
import "./SpeechRecognition.css";
import swal from "sweetalert";

function NewSpeechRecognition() {

    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);


    const startRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        console.log('Calling Start Recognition');
        console.log('IsRecording: ', isRecording);
        recognition.lang = "si-LK";

        recognition.onresult = event => {
            const speechToText = event.results[0][0].transcript;
            console.log('OnResult', speechToText);
            setTranscript(speechToText);
            recognition.stop();
            setIsRecording(false);
            checkMicInput(speechToText);
        };

        recognition.onstart = () => {
            console.log('OnStart');
            setIsRecording(true);
        }

        console.log('IsRecording: ', isRecording);
        console.log(recognition);

        if (!isRecording) {
            try {
                recognition.start();
                setIsRecording(true);
            } catch (e) {

            }
        }
    };


    const checkMicInput = (speechToText) => {

        if (speechToText === 'ඒ.') {
            setIsCorrect(true);
            //alert('TRUE');
            swal({
                //title: "Good job!",
                text: "ඔව්, ඔබ නිවැරදියි!",
                icon: "success",
                button: "හරි",
            });
        } else {
            setIsCorrect(false);
            startRecognition();
        }
    }

    useEffect(() => {
        startRecognition();
    }, []);

    return (
        <div>
            <div className="mic-container">
                <div className="mic-icon"/>
                <p className="mic-text">
                    මොකක්ද මේ අකුර?</p>
                {/*<p>Transcript: {transcript}</p>*/}
                {!isRecording && (isCorrect ? <p>නිවැරදි</p> : <p>නැවත උත්සහ කරමු</p>)}
            </div>
        </div>
    )
}

export default NewSpeechRecognition;