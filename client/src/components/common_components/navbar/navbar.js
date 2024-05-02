import React, {Component} from "react";
import './navbar-styleSheet.css'
export default class Navbar extends Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                
                <div className="container-fluid">
                    <a className="navbar-brand" href={'/home'}><img src="LOGO.png" alt="Logo" className="logo-img" /> Happy Minds</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={'/home'}>Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={'/lessons_selection'}>Lessons</a>
                            </li>
                        </ul>
                            <a className="navbar-brand" href={'/'}><img src="logout.png" alt="Logo" className="logout-img" /></a>
                    </div>

                    
                </div>
            </nav>
        );
    }
}
