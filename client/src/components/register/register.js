import React, { useState } from "react";
import './register-styleSheet.css';
import { useNavigate } from "react-router-dom";
import cover_img from "../../assests/login-page/cv-img1.jpg";
import ReCAPTCHA from 'react-google-recaptcha';
import UserAPI from "../../api/UserAPI";

const Register = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({
            ...formValues,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValues.password !== formValues.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const data = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
        };

        console.log("Submitting data:", data);

        try {
            await UserAPI.userSignUp(data);
            navigate('/'); // Redirect after successful signup
        } catch (error) {
            console.error("Error during signup:", error.response || error.message || error);
            alert("Signup failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="register-grid">
            <div className="register-form-panel">
                <form className="register-form" onSubmit={handleSubmit}>

                    <div>
                        <img src="LOGO.png" alt="Logo" className="logo-img2" />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={formValues.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="form-label">Create new password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <br />

                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                            <label className="form-check-label" htmlFor="invalidCheck2">
                                Agree to terms and conditions
                            </label>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
                    </div>

                    <br />

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary"> Register User </button>
                    </div>

                    <br /><p className="text-center">or <br />Already have an account?</p>

                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-success" onClick={() => navigate('/')}> Log In </button>
                    </div>

                </form>
            </div>

            <div className="register-right-panel">
                <img className="register-cover-img" src={cover_img} alt="Cover" />
            </div>

        </div>
    );
}

export default Register;
