import React from "react";
import './lessons_selection_styleSheet.css';
import Navbar from "../common_components/navbar/navbar";
import {useNavigate} from "react-router-dom";

const Lessons_selection = (props) => {
    const navigate = useNavigate();
        return(
            <div>
                <Navbar/>
                <div className="lessons-selection-grid">
                    <div className="lessons-selection-top-banner"></div>
                    <div className="lessons-selection-left-banner"></div>

                    <button className="lessons-selection-01"
                            onClick={() => navigate("/first_lesson")}>
                        <div>

                        </div>
                    </button>
                    <button className="lessons-selection-02"
                            onClick={() => navigate("/colour_lesson")}>
                        <div>

                        </div>
                    </button>
                    <button className="lessons-selection-03"
                            onClick={() => navigate("/therapy_session")}>
                        <div >

                        </div>
                    </button>
                    <div className="lessons-selection-right-banner"></div>
                    <div className="lessons-selection-bottom-banner"></div>
                </div>
            </div>
        );
}
export default Lessons_selection
