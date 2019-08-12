import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  fetchComments,
  addComment,
  fetchCommentCount
} from "../../redux/reducers/commentReducer";
import * as serviceAccount from "../../serviceAccount.json";

class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      comment_text: "",
      giphy: "",
      gifs: [],
      giphyInput: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="bg-white text-grey w-7/12 rounded justify-center items-center pb-5 pt-5 mb-5 flex flex-col">
        <div className="flex flex-row justify-start w-full">
          <div className="flex flex-col justify-start items-center">
            <h1 className="m-2">Profile Image</h1>
          </div>
          <div className="textinput flex flex-col flex-grow w-full justify-start items-center leading-normal">
            {this.state.giphy === "" ? (
              <textarea
                className="mb-3 flex-grow bg-white p-2 pr-10 w-11/12 overflow-hidden resize-none"
                maxLength="255"
                placeholder="What's up bitch..."
                name="comment_text"
                value={this.state.comment_text}
                onChange={this.handleChange}
              />
            ) : (
              <img
                src={this.state.giphy}
                alt={this.state.giphy}
                className="mb-3 flex-grow bg-white p-2 pr-10"
              />
            )}
            {this.state.gifs.length > 0 ? (
              <div className="giphy-container h-auto flex flex-row m-3 overflow-auto border-solid border-2 border-grey">
                {this.state.gifs.map(gif => {
                  return (
                    <img
                      src={gif.images.fixed_height_small.url}
                      alt={gif.title}
                      key={gif.id}
                      onClick={() => {
                        this.setState({ giphy: gif.images.fixed_height.url });
                        // console.log(this.state);
                      }}
                    />
                  );
                })}
              </div>
            ) : null}
            <div className="flex justify-between items-center w-11/12">
              <div className="flex justify-center items-center h-auto">
                <form
                  className="flex justify-center items-center h-10"
                  onSubmit={event => {
                    event.preventDefault();
                    axios
                      .get(
                        `https://api.giphy.com/v1/gifs/search?api_key=${
                          serviceAccount.giphy_key
                        }&q=${
                          this.state.giphyInput
                        }&limit=20&offset=0&rating=PG-13&lang=en`
                      )
                      .then(res => {
                        this.setState({ gifs: res.data.data });
                        // console.log(res.data.data);
                      })
                      .catch(error => console.log(error));
                  }}
                >
                  <input
                    type="text"
                    name="giphyInput"
                    value={this.state.giphyInput}
                    placeholder="Search GIPHY"
                    onChange={this.handleChange}
                    className="h-full flex-grow px-2 rounded"
                  />
                  <button
                    type="submit"
                    className="material-icons cursor-pointer text-4xl px-4 bg-grey text-white rounded h-full"
                  >
                    gif
                  </button>
                </form>
                <button
                  className="material-icons cursor-pointer text-xl px-4 bg-grey text-white rounded h-10 ml-1"
                  onClick={() => {
                    this.setState({ giphy: "", giphyInput: "", gifs: [] });
                  }}
                >
                  cancel
                </button>
              </div>
              <button
                className="bg-grey text-white cursor-pointer font-semibold py-2 px-4 rounded"
                onClick={() => {
                  const { comment_text, giphy } = this.state;
                  if (comment_text === "" && giphy === "") {
                    alert("Empty Comment.");
                  } else {
                    this.props.addComment(
                      this.props.post_id,
                      comment_text,
                      giphy
                    );
                    this.setState({
                      comment_text: "",
                      giphy: "",
                      giphyInput: "",
                      gifs: []
                    });
                    this.props.fetchComments(this.props.post_id);
                    this.props.fetchCommentCount();
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        {/* {this.state.showGIPHY ? (
          this.state.gifs.map((gif,index) => {
            return (<div className="flex flex-row" key={index}>
                <img src={gif.images.fixed_height.url} alt={gif.title} />
              </div>)
          })
        ):null} */}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    reduxState
  };
}

export default connect(
  mapStateToProps,
  { fetchComments, addComment, fetchCommentCount }
)(CreateComment);
