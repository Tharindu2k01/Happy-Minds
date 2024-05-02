import React, {Component, useRef} from "react";
import Navbar from "../common_components/navbar/navbar";
import ReactPlayer from 'react-player';
import './homePageStyleSheet.css'
import topImage from '../../assests/home-page/top-panel.jpg';
import leftImage from '../../assests/home-page/left-panel.jpg';
import rightImage from '../../assests/home-page/right-panel.jpg';
import buttonImage from '../../assests/home-page/nextanim.gif';
import FaceEmotionDetection from "../face_and_emotion_detection/FaceEmotionDetection";

const VIDEO_PATH = 'https://www.youtube.com/watch?v=TvRhfaouBHs';
export default class Home extends Component {
    playerRef;

    render() {
        return (
            <div className="background">
                <Navbar/>
                <div className="home-grid">
                    <div className="left-col-up">

                    </div>
                    
                    <div className="top-panel">
                    </div>

                    <div className="left-panel"> 
                    </div>

                    <div className="video-col">
                        <ReactPlayer
                            width="100%"
                            height="100%"
                            ref={this.playerRef}
                            url={VIDEO_PATH}
                            playing={true}
                            controls={true}
                        />
                        {/*<FaceEmotionDetection/>*/}
                    </div>

                    <div className="right-panel">
                    </div>

                    <div className="right-col-up">
                    </div>

                    <div className="left-col-down">
                    </div>
                    
                    <div className="bottom-panel">
                        <a className="navbar-brand" href={'/lessons_selection'}>
                            <button className="go-button">
                                <img className="go-button-img"
                                     src={buttonImage}
                                />
                            </button>
                        </a>


                    </div>
                    <div className="right-col-down">
                    </div>

                </div>

            </div>

        );
    }
}