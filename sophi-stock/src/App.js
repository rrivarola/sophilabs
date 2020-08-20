import React, { useState, Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/HomeComponent";

import Login from "./components/login/LoginComponent";
import SignUp from "./components/login/SignupComponent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddProductPageComponent from "./components/AddProductPageComponent";
import { AuthenticationContext } from "./shared/contextinfo";
import { baseUrl } from "./shared/baseUrl";
import { withRouter } from 'react-router-dom';

class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userName: "Guest",
    };

    this.signOut = this.signOut.bind(this);
  }

  setAuthenticationInfo(user) {
    this.setState({ isAuthenticated: true });
    this.setState({ userName: user });
  }

  signOut() {
    this.logout();
    this.setState({ isAuthenticated: false });
  }

 logout = ()=>  {
    localStorage.removeItem("token");
    localStorage.removeItem("creds");

    fetch(baseUrl + "users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response;
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <div className="navbar-brand" >
                <h3>SophiStock</h3>
              </div>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  {!this.state.isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                  )}
                  {this.state.isAuthenticated && (
                    <li className="nav-item" onClick={this.signOut} >
                      <Link className="nav-link" to={"/sign-in"}>Logout</Link>
                    </li>
                  )}
                  {!this.state.isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign up
                      </Link>
                    </li>
                  )}

                  {this.state.isAuthenticated && (
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        {this.state.userName}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <div>
            <ToastContainer autoClose={3000} hideProgressBar />
            <div>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route
                    path="/sign-in"
                    component={() => (
                      <Login
                        handleAuthenticationInfo={(user) =>
                          this.setAuthenticationInfo(user)
                        }
                      />
                    )}
                  />
                  <Route path="/sign-up" component={SignUp} />
                  <Route path="/home" component={Home} />
                  <Route path="/product" component={AddProductPageComponent} />
               
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default withRouter  (App);
