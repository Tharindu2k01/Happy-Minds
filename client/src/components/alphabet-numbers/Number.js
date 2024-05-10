import React, { useState } from 'react';
import './alphabet_numbers_styleSheet.css';
import Navbar from "../common_components/navbar/navbar";

const AudioNumber = ({ number, handleNumberClick }) => {
    const [audio, setAudio] = React.useState(null);

    React.useEffect(() => {
        import(`../../assests/audio/numbers/${number}.mp3`)
            .then(audioModule => setAudio(audioModule.default))
    }, [number]);

    const handleClick = () => {
        const a = new Audio(audio);
        a.load();
        a.play();
        handleNumberClick(number)
    }

    return (
        <button className="item" onClick={handleClick}>
            {number}
        </button>
    );
}

function Number() {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];;
    const [selectedNumber, setSelectedNumber] = useState(numbers[0]);

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
    };

    return (
        <div>
            <Navbar />

            <div className="quiz-grid">

                <div className="quiz-grid-top-banner">
                    <h1 className="display-4">Let's Learn Numbers</h1>
                </div>

                <div className="item-display">
                    <h1 className="selected-item">{selectedNumber}</h1>
                </div>
                <br/>


                <div className="quiz-grid-bott-banner">
                    <div className="item-container">
                        {numbers.map(number => <AudioNumber number={number} handleNumberClick={handleNumberClick}
                                                            key={number}/>)}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Number;
