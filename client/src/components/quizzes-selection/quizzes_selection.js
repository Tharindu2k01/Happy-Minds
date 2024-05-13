import React from "react";
import './quizzes_selection_styleSheet.css';
import Navbar from "../common_components/navbar/navbar";
import {useNavigate} from "react-router-dom";

const Quizzes_selection = (props) => {
    const navigate = useNavigate();
        return(
            <div>
                <Navbar/>
                <div className="quizzes-selection-grid">
                    <div className="quizzes-selection-top-banner">
                        <h1 className="display-4">ප්‍රශ්නාවලි තෝරා ගමු</h1></div>

                    <div className="lessons-selection-bottom-banner"></div>

                    <button className="quizzes-selection-01"
                            onClick={() => navigate("/Quiz_one")}>
                    </button>

                    <button className="quizzes-selection-02"
                            onClick={() => navigate("/Quiz_two")}>
                    </button>

                    <button className="quizzes-selection-03"
                            onClick={() => navigate("/quizzes_selection")}>
                    </button>

                </div>
            </div>
        );
}
export default Quizzes_selection
