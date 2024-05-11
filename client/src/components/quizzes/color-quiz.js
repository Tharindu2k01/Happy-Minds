import React, { useEffect, useState } from "react";
import "./quize-styleSheet.css";
import Navbar from "../common_components/navbar/navbar";

function QuizTwo(props) {
    const colors = [
        { name: "රතු", hex: "#FF0000" },
        { name: "කොළ", hex: "#00FF00" },
        { name: "නිල්", hex: "#0000FF" },
        // Add more colors as needed
    ];

    const [currentColor, setCurrentColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        generateRandomColor();
    }, []); // Empty dependency array to run only once when component mounts

    const generateRandomColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentColor(randomColor);
        setSelectedColor(null);
        setFeedback(null);
    };

    const checkAnswer = (colorName) => {
        if (currentColor && colorName === currentColor.name) {
            setFeedback("Correct!");
        } else {
            setFeedback("Wrong! Try again.");
        }
        setSelectedColor(colorName);
    };

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const renderColorRows = () => {
        const chunkedColors = chunkArray(colors, 3); // Change 3 to the number of colors you want per row
        return chunkedColors.map((row, rowIndex) => (
            <div key={rowIndex} className="color-row">
                {row.map((color, index) => (
                    <button
                        key={index}
                        type="button"
                        className="btn btn-light"
                        onClick={() => checkAnswer(color.name)}
                        disabled={selectedColor !== null}
                        style={{border: "1px solid black"}}
                    >
                        {color.name}
                    </button>
                ))}
            </div>

        ));
    };

    return (
        <div>
            <Navbar/>

            <div className="quiz-grid">
                <div className="quiz-grid-top-banner">
                    <h1 className="display-4">මේ පාට මොකක්ද?</h1>
                </div>

                <div className="quiz-panel">
                    <div
                        style={{
                            backgroundColor: currentColor ? currentColor.hex : "#FFFFFF",
                            width: "400px",
                            height: "300px",
                        }}
                    ></div>
                </div>

                <div className="voice-input-panel">{renderColorRows()}</div>

                <div className="quiz-grid-bottom-banner">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={generateRandomColor}
                    >
                        අපි ඊළඟ පාටට යමු
                    </button>

                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    );
}

export default QuizTwo;
