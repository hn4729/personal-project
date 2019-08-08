import React, { Component } from "react";
import "./WelcomeLogin.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class WelcomeLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(user => {
        this.setState({ username: "", password: "" });
        console.log(user.data);
        this.props.history.push("/poggers");
      })
      .catch(error => {
        alert(error.response.request.response);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="Login mx-h full flex justify-center items-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                placeholder="******************"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-grey hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                type="button"
                onClick={this.login}
              >
                Login
              </button>
              <Link to="/register">
                <button
                  className="bg-grey hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default WelcomeLogin;
