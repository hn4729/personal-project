import React, { Component } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      gamertag: "",
      password: "",
      comparePass: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  register = () => {
    const { username, gamertag, password, comparePass } = this.state;
    if (password !== comparePass) {
      alert("Password does not match");
    } else if (username === "" || gamertag === "" || password === "") {
      alert("Empty fields");
    } else {
      axios
        .post("/auth/register", { username, password, gamertag })
        .then(response => {
          this.setState({
            userrname: "",
            password: "",
            comparePass: "",
            gamertag: ""
          });
          this.props.history.goBack();
        })
        .catch(error => {
          this.setState({
            userrname: "",
            password: "",
            comparePass: "",
            gamertag: ""
          });
          alert(error.response.request.response);
        });
    }
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
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gamertag"
                type="text"
                placeholder="Display Name"
                name="gamertag"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="comparePass"
                type="password"
                placeholder="******************"
                name="comparePass"
                onChange={this.handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/">
                <button
                  className="bg-grey hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                  type="button"
                >
                  Go Back
                </button>
              </Link>
              <button
                className="bg-grey hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto"
                type="button"
                onClick={this.register}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
