import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import {
  updatePost,
  fetchIndividualPost
} from "../../redux/reducers/postReducer";
import {
  fetchComments,
  updateComment
} from "../../redux/reducers/commentReducer";

class UpdateComment extends Component {
  constructor() {
    super();
    this.state = {
      comment_text: "",
      giphy: "",
      visible: false
    };
  }

  componentDidMount() {
    this.setState({
      comment_text: this.props.comment_text,
      giphy: this.props.giphy
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openModal = () => {
    this.setState({
      visible: true
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { gamertag, date, profile_img, comment_id } = this.props;
    const { comment_text, giphy } = this.state;
    return (
      <div className="mr-5 flex justify-center">
        <i
          className="material-icons cursor-pointer mr-2 hover:text-green-400 focus:outline-none focus:shadow-outline"
          onClick={() => {
            this.openModal();
          }}
        >
          edit
        </i>
        <Modal
          visible={this.state.visible}
          effect="fadeInUp"
          onClickAway={() => {
            this.closeModal();
          }}
          width="30%"
        >
          <div className="max-w-xl px-6 py-4 bg-white text-grey flex flex-row justify-center items-center">
            <h1 className="font-semibold mr-2">{gamertag}</h1>
            <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
              {date}
            </span>
          </div>

          <div className="px-6 py-4 bg-white">
            <textarea
              className="w-11/12 bg-white text-grey p-2 pr-10 overflow-hidden resize-none border-solid border-2 border-grey rounded"
              maxLength="255"
              name="comment_text"
              value={this.state.comment_text}
              onChange={this.handleChange}
            />
          </div>
          <div className="max-w-full px-6 py-4 bg-white flex justify-end items-center">
            <div>
              <button
                className="bg-grey text-white px-3 py-1 font-semibold rounded mr-2 hover:text-green-400 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  this.closeModal();
                  this.setState({
                    comment_text: "",
                    giphy: ""
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="bg-grey text-white px-3 py-1 font-semibold rounded mr-2 hover:text-green-400 focus:outline-none focus:shadow-outline"
                onClick={() => {
                  this.props.updateComment(comment_id, comment_text, giphy);
                  this.props.fetchComments(this.props.post_id);
                  this.closeModal();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
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
  { fetchComments, updateComment }
)(UpdateComment);
