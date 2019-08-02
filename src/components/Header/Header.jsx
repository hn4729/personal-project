import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import * as serviceAccount from "../../serviceAccount.json";

firebase.initializeApp({
  apiKey: serviceAccount.api_key,
  authDomain: `${serviceAccount.project_id}.firebaseapp.com`,
  databaseURL: "https://personal-project-devmtn.firebaseio.com",
  storageBucket: "personal-project-devmtn.appspot.com"
});

class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      avatar: ""
    };
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}

export default Header;
