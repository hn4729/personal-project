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
    const { profile_img } = this.props;
    return (
      <div className="bg-white text-grey w-3/4 sm:w-11/12 md:11/12 rounded justify-center items-center px-4 py-4 mb-5 flex flex-col">
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex justify-start items-center w-full mb-2">
            {profile_img ? (
              <img
                src={profile_img}
                alt="profile_image"
                className="w-16 h-auto rounded-full bg-white mr-2"
              />
            ) : (
              <img
                src="https://i.imgur.com/aSVjtu7.png"
                alt="feelsbadman"
                className="w-16 h-auto rounded-full bg-white mr-2"
              />
            )}
            {this.state.giphy === "" ? (
              <textarea
                className="flex-grow bg-white p-2 pr-10 w-11/12 overflow-hidden resize-none"
                maxLength="255"
                placeholder="POGGERS..."
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
          </div>
          <div className="textinput flex sm:flex-col w-full justify-center items-center">
            {this.state.gifs.length > 0 ? (
              <div className="giphy-container h-auto flex flex-row mb-2 overflow-auto border-solid border-2 border-grey">
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
            <div className="flex justify-center items-center h-auto w-full">
              <form
                className="flex justify-center items-center h-10 lg:mr-2 md:mr-2 sm:mb-2 w-full"
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
                  className="h-full flex-grow rounded px-1"
                />
                <button
                  type="submit"
                  className="material-icons cursor-pointer text-4xl px-4 bg-grey text-white rounded h-full"
                >
                  gif
                </button>
              </form>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="material-icons cursor-pointer text-xl px-4 bg-grey text-white rounded h-10 mr-2"
                onClick={() => {
                  this.setState({ giphy: "", giphyInput: "", gifs: [] });
                }}
              >
                cancel
              </button>
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
    profile_img: reduxState.user.profile_img
  };
}

export default connect(
  mapStateToProps,
  { fetchComments, addComment, fetchCommentCount }
)(CreateComment);
