import React from "react";
import './register-styleSheet.css';
import {useNavigate} from "react-router-dom";
import cover_img from "../../assests/login-page/cv-img1.jpg";
import ReCAPTCHA from 'react-google-recaptcha'

const Register = () => {
    const navigate = useNavigate()

    return(
        <div className="register-grid">
            <div className="register-form-panel">
                <form className="register-form">

                    <div>
                        <img src="LOGO.png" alt="Logo" className="logo-img2"/>
                    </div>
                    <div>
                        <label htmlFor="validationDefault01" className="form-label">First name</label>
                        <input type="text" className="form-control" id="validationDefault01" required/>
                    </div>
                    <div>
                        <label htmlFor="validationDefault02" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="validationDefault02" required/>
                    </div>

                    <div>
                        <label htmlFor="validationDefault03" className="form-label">Email</label>
                        <input type="text" className="form-control" id="validationDefault03" required/>
                    </div>

                    <div>
                        <label htmlFor="validationDefault03" className="form-label">Create new password</label>
                        <input type="password" className="form-control" id="validationDefault03" required/>
                    </div>
                    <div>
                        <label htmlFor="validationDefault03" className="form-label">Confirm password</label>
                        <input type="password" className="form-control" id="validationDefault03" required/>
                    </div>
                    <br/>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                            <label className="form-check-label" htmlFor="invalidCheck2">
                                Agree to terms and conditions
                            </label>
                        </div>
                    </div>
                    <br/>

                    <div className="d-grid gap-2">
                        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>

                    <br/>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-success"
                                onClick={() => navigate('/')}>
                            Log In
                        </button>
                    </div>

                </form>
            </div>
            <div className="register-right-panel">
                <img className="register-cover-img"
                     src={cover_img}
                />
            </div>
        </div>
    );
}
export default Register;