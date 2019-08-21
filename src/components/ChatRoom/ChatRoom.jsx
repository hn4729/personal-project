import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestUserData } from "../../redux/reducers/userReducer";
import "../../App.scss";
import io from "socket.io-client";

const socket = io();

class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      messageInput: "",
      messages: []
    };
  }

  componentDidMount() {
    socket.on("chat message", data => {
      this.setState({ messages: [...this.state.messages, data] });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { gamertag } = this.props;
    return (
      <div className="feed flex flex-col w-7/12 text-grey bg-gray-400 overflow-y sm:w-10/12 md:w-10/12 h-full">
        <div className="title flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Chat Room</h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="feed flex flex-col w-11/12 h-64 justify-start items-center mb-2 bg-white rounded shadow-lg overflow-y-auto overflow-x-hidden px-2 py-2">
            {this.state.messages.map((message, index) => {
              return (
                <div
                  className="text-message flex flex-col justify-start w-full"
                  key={index}
                >
                  <div className="flex justify-start w-full">
                    <Link
                      to={`/poggers/user/${gamertag}`}
                      className="mr-2 hover:text-green-400 focus:outline-none focus:shadow-outline font-semibold"
                    >
                      {message.gamertag}:
                    </Link>
                    <p className="text-message mr-2">{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            className="w-11/12 flex justify-between items-center shadow-lg"
            onSubmit={event => {
              event.preventDefault();
              if (this.state.messageInput === "") {
                alert("Empty Message");
              } else {
                socket.emit("chat message", {
                  message: this.state.messageInput,
                  gamertag
                });
                this.setState({ messageInput: "" });
              }
            }}
          >
            <input
              value={this.state.messageInput}
              name="messageInput"
              onChange={this.handleChange}
              placeholder="Message..."
              className="flex-grow px-2 py1 h-8 rounded"
            />
            <button
              type="submit"
              className="material-icons text-white bg-grey rounded px-2 py-1 rounded hover:bg-green-400 focus:outline-none focus:shadow-outline"
            >
              send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    gamertag: reduxState.user.gamertag
  };
}

export default connect(
  mapStateToProps,
  { requestUserData }
)(ChatRoom);
