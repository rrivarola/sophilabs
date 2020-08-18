import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../shared/baseUrl";
import { toast } from "react-toastify";

function SignUp (){
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (event) => {
    setErrorMsg(false);
    event.preventDefault();
    let email = event.target[2].value;
    let pass = event.target[3].value;
    let firstname = event.target[0].value;
    let lastname = event.target[1].value;
    signup({ username: email, password: pass,  firstname: firstname, lastname: lastname  });
    

  };

  function signup (creds){
    fetch(baseUrl + "users/signup", {
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
                  
          history.push("/sign-in");
          toast.success("Signup Succeed.");  
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
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div>

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

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
        {errorMsg && <div className="error">Register Failed</div>}
      </form>
      </div>
    </div>
    );
  }


  export default SignUp;