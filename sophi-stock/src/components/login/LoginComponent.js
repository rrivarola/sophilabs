import React, { useState } from "react";
import * as userApi from "../../api/UserApi";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../shared/baseUrl";

function Login() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSumbit = (event) => {
    setErrorMsg(false);
    event.preventDefault();
    let email = event.target[0].value;
    let pass = event.target[1].value;
    // userApi.login({ username: email, password: pass }).then(
    //     (response) => {
    //         if (response.ok) {
    //             history.push("/home");
    //         } else {
    //             errorMsg=true;
    //         }
    //     }
    // )
    login({ username: email, password: pass });
  };

  function login(creds) {
    fetch(baseUrl + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            setErrorMsg(true);
            var error = new Error("Error ");
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem("token", response.token);
          localStorage.setItem("creds", JSON.stringify(creds));
          history.push("/home");
        } else {
          var error = new Error("Error " + response.status);
          error.response = response;
          throw error;
        }
      })
      .catch((error) => setErrorMsg(true));
  }

  return (
    <div className="auth-wrapper" style={{paddingTop:100}}>
      <div className="auth-inner">
        <form onSubmit={handleSumbit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
          {errorMsg && <div className="error">Authentication Failed</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
