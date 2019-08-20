import React, { Component } from "react";
import "./UpdatePost.scss";
import { connect } from "react-redux";
import Modal from "react-awesome-modal";
import {
  fetchAllPosts,
  deletePost,
  updatePost,
  fetchIndividualPost,
  fetchUserPosts
} from "../../redux/reducers/postReducer";
import { fetchGames } from "../../redux/reducers/gameReducer";
import CreatableSelect from "react-select/creatable";
import moment from "moment";

class UpdatePost extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content_text: "",
      game: "",
      video_url: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchGames();
    this.setState({
      game: this.props.game,
      content_text: this.props.content_text
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleInputChange = (input, action) => {
    console.log(input);
    console.log(action);
  };

  handleSelectChange = (input, action) => {
    // console.log(input)
    // console.log(action)

    if (action.action !== "clear") {
      this.setState({
        game: input.value
      });
    }
  };

  createOption = label => {
    return {
      label,
      value: label
    };
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
    const {
      gamertag,
      date,
      image_url,
      video_url,
      post_id,
      games,
      profile_img
    } = this.props;
    const { content_text, game } = this.state;
    const defaultOptions = games.map(game => {
      return this.createOption(game.name);
    });

    return (
      <div className="mr-5 flex justify-center">
        <i
          className="material-icons text-grey cursor-pointer"
          onClick={() => this.openModal()}
        >
          edit
        </i>
        <Modal
          visible={this.state.visible}
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="max-w-xl rounded shadow-lg bg-darkgrey">
            <div className="px-6 py-4 bg-white text-grey flex flex-row justify-between items-center">
              <div className="flex justify-center items-center">
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
                <h1 className="font-semibold mr-2">{gamertag}</h1>
              </div>
              <div className="flex justify-center items-center">
                <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
                  {moment(date).fromNow()}
                </span>
                <button
                  className="text-grey px-3 py-1 font-semibold material-icons"
                  onClick={() => {
                    this.closeModal();
                    this.setState({ content_text: "", game: "" });
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
            {image_url !== "" ? (
              <img
                className="w-full"
                src={image_url}
                alt={`${gamertag} ${post_id}`}
              />
            ) : null}

            <div className="px-6 py-4 bg-white">
              <textarea
                className="w-11/12 bg-white text-grey p-2 pr-10 overflow-hidden resize-none border-solid border-2 border-grey rounded"
                maxLength="255"
                name="content_text"
                value={this.state.content_text}
                onChange={this.handleChange}
              />
            </div>
            <div className="px-2 py-4 bg-white flex flex-col justify-center items-center w-full">
              <span className="bg-grey rounded-full px-3 py-1 text-sm font-semibold text-white mb-2">
                {game}
              </span>
              <CreatableSelect
                isClearable
                onChange={this.handleSelectChange}
                options={defaultOptions}
                className="w-64 text-grey css-263qy-menu leedle mb-2"
              />
              <div>
                <button
                  className="bg-grey text-white px-3 py-1 font-semibold rounded"
                  onClick={() => {
                    this.props.updatePost(
                      this.state.game,
                      image_url,
                      video_url,
                      content_text,
                      post_id
                    );
                    if (this.props.fetchPostID) {
                      this.props.fetchIndividualPost(this.props.fetchPostID);
                    } else if (this.props.fetchGamertag) {
                      this.props.fetchUserPosts(this.props.fetchGamertag);
                    } else {
                      this.props.fetchAllPosts();
                    }

                    this.closeModal();
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    games: reduxState.games.games
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllPosts,
    fetchGames,
    deletePost,
    updatePost,
    fetchIndividualPost,
    fetchUserPosts
  }
)(UpdatePost);
