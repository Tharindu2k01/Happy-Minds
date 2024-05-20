import React from "react";
import './login-styleSheet.css';
import cover_img from "../../assests/login-page/cv-img1.jpg";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../api/UserAPI";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await UserAPI.userLogin({ email, password });
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate('/home');
        } catch (error) {
            console.error("Error during login:", error.response || error.message || error);
            alert("Login failed: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="login-grid">
            <div className="login-left-panel">
                <img className="left-panel-cover-img" src={cover_img} alt="Cover" />
            </div>

            <div className="login-form-panel">
                <div>
                    <img src="LOGO.png" alt="Logo" className="logo-img1" />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-4">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-4">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            id="exampleInputPassword1"
                            required
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </div>

                    <br />

                    <p className="text-center">or<br />Don't have an account?</p>

                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
