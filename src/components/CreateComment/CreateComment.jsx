import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchComments,
  addComment,
  fetchCommentCount
} from "../../redux/reducers/commentReducer";

class CreateComment extends Component {
  constructor() {
    super();
    this.state = {
      comment_text: "",
      giphy: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="bg-white text-grey w-5/6 rounded justify-center items-center pb-5 pt-5 mb-5">
        <div className="flex flex-row justify-start w-full">
          <div className="flex flex-col justify-center items-center">
            <h1 className="m-2">Profile Image</h1>
          </div>
          <div className="textinput flex flex-col flex-grow w-full justify-start items-center leading-normal">
            <textarea
              className="mb-3 flex-grow bg-white p-2 pr-10 w-11/12 overflow-hidden resize-none"
              maxLength="255"
              placeholder="What's up bitch..."
              name="comment_text"
              value={this.state.comment_text}
              onChange={this.handleChange}
            />
            <div className="flex justify-between items-center w-11/12">
              <i className="material-icons cursor-pointer text-5xl ">gif</i>
              <button
                className="bg-grey text-white cursor-pointer font-semibold py-2 px-4 rounded"
                onClick={() => {
                  const { comment_text, giphy } = this.state;
                  if (comment_text === "") {
                    alert("Empty Comment.");
                  } else {
                    this.props.addComment(
                      this.props.post_id,
                      comment_text,
                      giphy
                    );
                  }
                  this.setState({
                    comment_text: "",
                    giphy: ""
                  });
                  this.props.fetchComments(this.props.post_id);
                  this.props.fetchCommentCount();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
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
