import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import * as serviceAccount from "../../serviceAccount.json";
import {
  fetchAllPosts,
  createPost,
  fetchUserPosts
} from "../../redux/reducers/postReducer";
import { fetchGames } from "../../redux/reducers/gameReducer";
import CreatableSelect from "react-select/creatable";

firebase.initializeApp({
  apiKey: serviceAccount.api_key,
  authDomain: `${serviceAccount.project_id}.firebaseapp.com`,
  databaseURL: "https://personal-project-devmtn.firebaseio.com",
  storageBucket: "personal-project-devmtn.appspot.com"
});

const storage = firebase.storage();
const imagesRef = storage.ref("images");
const videosRef = storage.ref("videos");

class CreatePost extends Component {
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
    this.props.fetchGames();
  }

  handleImageChange = event => {
    const file = event.target.files[0];
    const uploadTask = imagesRef.child(file.name).put(file);
    uploadTask.then(() => {
      imagesRef
        .child(file.name)
        .getDownloadURL()
        .then(url => this.setState({ image_url: url }));
    });
  };

  handleVideoChange = event => {
    const file = event.target.files[0];
    const uploadTask = videosRef.child(file.name).put(file);
    uploadTask.then(() => {
      videosRef
        .child(file.name)
        .getDownloadURL()
        .then(url => this.setState({ video_url: url }));
    });
  };

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

  render() {
    const { games } = this.props;
    const defaultOptions = games.map(game => {
      return this.createOption(game.name);
    });

    return (
      <div className="mb-5 border-solid border-1 border-darkgrey flex justify-center items-center h-auto">
        <div className="bg-white text-grey w-5/6 rounded justify-center items-center pb-5 pt-5">
          <div className="flex flex-row justify-start w-full">
            <div className="flex flex-col justify-center items-center">
              <h1 className="m-2">Profile Image</h1>
            </div>
            <div className="textinput flex flex-col flex-grow w-full justify-start items-center leading-normal">
              {this.state.image_url.length !== 0 ? (
                <img
                  src={this.state.image_url}
                  className="h-auto max-w-md mb-3 border-solid border-grey border-2"
                  alt=""
                />
              ) : null}
              <textarea
                className="mb-3 flex-grow bg-white p-2 pr-10 w-11/12 overflow-hidden resize-none"
                maxLength="255"
                placeholder="What's up bitch..."
                name="content_text"
                value={this.state.content_text}
                onChange={this.handleChange}
              />
              <div className="flex justify-between items-center w-11/12">
                <div className="flex flex-row">
                  <label>
                    <i className="material-icons m-2 cursor-pointer">
                      video_library
                    </i>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={this.handleVideoChange}
                      className="hidden"
                    />
                  </label>
                  <label>
                    <i className="material-icons m-2 cursor-pointer">
                      insert_photo
                    </i>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={this.handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <CreatableSelect
                    isClearable
                    onChange={this.handleSelectChange}
                    options={defaultOptions}
                    className="w-64"
                  />
                </div>
                <button
                  className="bg-grey text-white cursor-pointer font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    const {
                      image_url,
                      video_url,
                      game,
                      content_text
                    } = this.state;
                    if (game === "") {
                      alert("Choose a category.");
                    } else {
                      this.props.createPost(
                        image_url,
                        video_url,
                        game,
                        content_text
                      );
                      this.setState({
                        image_url: "",
                        content_text: "",
                        game: "",
                        video_url: ""
                      });
                      this.props.fetchAllPosts();
                      this.props.fetchUserPosts(this.props.profileGamertag);
                    }
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.postReducer.posts,
    loading: reduxState.postReducer.loading,
    gamertag: reduxState.user.gamertag,
    id: reduxState.user.id,
    games: reduxState.games.games
  };
}

export default connect(
  mapStateToProps,
  { fetchAllPosts, fetchGames, createPost, fetchUserPosts }
)(CreatePost);
