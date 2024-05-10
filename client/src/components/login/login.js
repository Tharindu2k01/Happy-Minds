import React from "react";
import './login-styleSheet.css';
import cover_img from "../../assests/login-page/cv-img1.jpg";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    function handleLogin(e) {
        e.preventDefault()
        console.log("method calls");
        const form = e.target;
        const user = {
            email: form[0].value,
            password: form[1].value
        }

        fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token);

                fetch("http://localhost:5000/users/isUserAuth", {
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        //data.isLoggedIn ? history("/dashboard") : null;
                        if (data.isLoggedIn) {
                                navigate("/home");
                        }else{
                            alert("Invalid Login");
                        }

                    })
            })
    }
    return(
      <div className="login-grid">
          <div className="login-left-panel">
              <img className="left-panel-cover-img" src={cover_img} />
          </div>

          <div className="login-form-panel">

              <div>
            <img src="LOGO.png" alt="Logo" className="logo-img1" />
            </div>

              <form onSubmit={event => handleLogin(event)}>

            
                
                  <div className="mb-3">

                      <label htmlFor="exampleInputEmail1" className="form-label fs-4"> Email address </label>

                      <input type="email" name="email" className="form-control form-control-lg " id="exampleInputEmail1" aria-describedby="emailHelp"/>
                          <div id="emailHelp" className="form-text">
                              We'll never share your email with anyone else.
                          </div>
                  </div>

                  <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label fs-4"> Password </label>
                      <input type="password" name="password" className="form-control form-control-lg" id="exampleInputPassword1"/>
                  </div>

                  <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                          <label className="form-check-label" htmlFor="exampleCheck1"> Remember me </label>
                  </div>

                  <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary"> Log In </button>
                  </div>

                  <br/>

                  <p className="text-center"> or <br/> Don't have an account ? </p>

                  <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-success" onClick={() => navigate('/register')}> Sign Up </button>
                  </div>
              </form>
          </div>
      </div>
    );
}
export default Login;