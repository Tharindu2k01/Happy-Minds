import React, { useState } from 'react';
import './alphabet_numbers_styleSheet.css';
import Navbar from "../common_components/navbar/navbar";

const AudioLetter = ({ letter, handleLetterClick }) => {
  const [audio, setAudio] = React.useState(null);

  React.useEffect(() => {
      import(`../../assests/audio/alphabet/${letter}.mp3`)
          .then(audioModule => setAudio(audioModule.default))
  }, [letter]);

  const handleClick = () => {
      const a = new Audio(audio);
      a.load();
      a.play();
      handleLetterClick(letter)
  }

  return (
      <button className="item" onClick={handleClick}>
          {letter}
      </button>
  );
}

function Alphabet() {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const [selectedLetter, setSelectedLetter] = useState(alphabet[0]);

  const handleLetterClick = (letter) => {
      setSelectedLetter(letter);
  };

  return (
      <div>
          <Navbar />

          <div className="quiz-grid">

              <div className="quiz-grid-top-banner">
                  <h1 className="display-4">Let's Learn Alphabet</h1>
              </div>

              <div className="item-display">
                  <h1 className="selected-item">{selectedLetter}</h1>
              </div>
              <br/>

              <div className="quiz-grid-bott-banner">
                  <div className="item-container">
                      {alphabet.map(letter => <AudioLetter letter={letter} handleLetterClick={handleLetterClick}
                                                           key={letter}/>)}
                  </div>
              </div>

          </div>

      </div>
  );
}

export default Alphabet;