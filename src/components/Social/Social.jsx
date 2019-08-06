import React, { Component } from "react";
import "./Social.scss";
import { connect } from "react-redux";
import firebase from "firebase";
import * as serviceAccount from "../../serviceAccount.json";
import { fetchAllPosts } from "../../redux/reducers/postReducer";
import { requestUserData } from "../../redux/reducers/userReducer";

firebase.initializeApp({
  apiKey: serviceAccount.api_key,
  authDomain: `${serviceAccount.project_id}.firebaseapp.com`,
  databaseURL: "https://personal-project-devmtn.firebaseio.com",
  storageBucket: "personal-project-devmtn.appspot.com"
});

class Social extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    const { loading, posts, gamertag } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="border-solid border-2 border-darkgrey flex justify-left items-center mb-5">
          <h1 className="m-2 text-2xl font-bold">Personal Feed</h1>
        </div>

        <div className="mb-5 border-solid border-1 border-darkgrey flex justify-center items-center h-auto">
          <div className="bg-white text-grey w-5/6 rounded justify-center items-center pb-5 pt-5">
            <div className="flex flex-row justify-start w-full">
              <div className="flex flex-col justify-center items-center">
                <h1 className="m-2">Profile Image</h1>
              </div>
              <div className="textinput flex flex-col flex-grow w-full justify-start items-center leading-normal">
                <img
                  src="https://socialmediaacademia.files.wordpress.com/2018/11/poggers.png"
                  className="h-auto max-w-lg border-solid border-grey border-2"
                  alt=""
                />
                <textarea
                  className="mb-3 flex-grow bg-white p-2 pr-10 w-11/12 overflow-hidden"
                  maxlength="255"
                  placeholder="What's up bitch..."
                />
                <div className="flex justify-between items-center w-11/12">
                  <div className="flex flex-row">
                    <label>
                      <i className="material-icons m-2 cursor-pointer">
                        video_library
                      </i>
                      <input type="file" className="hidden" />
                    </label>
                    <label>
                      <i className="material-icons m-2 cursor-pointer">
                        insert_photo
                      </i>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  <button className="bg-grey text-white cursor-pointer font-semibold py-2 px-4 rounded">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-5">
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-darkgrey">
            <img
              class="w-full"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2452cddc-5880-475f-8f3c-b3a605702740/ddaqxv0-19ed3d11-2b72-4218-9013-6349b802414f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0NTJjZGRjLTU4ODAtNDc1Zi04ZjNjLWIzYTYwNTcwMjc0MFwvZGRhcXh2MC0xOWVkM2QxMS0yYjcyLTQyMTgtOTAxMy02MzQ5YjgwMjQxNGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GBJL07XjUxOy1vE-wpGebs-_bXpSadUcLzmgVk5w3kE"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4 bg-white">
              <div class="font-bold text-xl text-grey mb-2">
                The Coldest Sunset
              </div>
              <p class="text-grey text-base bg-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 py-4 bg-white">
              <span class="inline-block bg-grey rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #photography
              </span>
              <span class="inline-block bg-grey rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #travel
              </span>
              <span class="inline-block bg-grey rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                #winter
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {loading ? (
            <h1 className="font-bold text-5xl">Loading...</h1>
          ) : (
            posts.map(post => {
              return (
                <div
                  key={post.post_id}
                  className="border-solid rounded mb-5 bg-white text-grey w-4/6"
                >
                  <h1>{post.gamertag}</h1>
                  <h3>{post.profile_img}</h3>
                  <h3>{post.date}</h3>
                  <h3>{post.game}</h3>
                  <h3>{post.content_text}</h3>
                  <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2452cddc-5880-475f-8f3c-b3a605702740/ddaqxv0-19ed3d11-2b72-4218-9013-6349b802414f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0NTJjZGRjLTU4ODAtNDc1Zi04ZjNjLWIzYTYwNTcwMjc0MFwvZGRhcXh2MC0xOWVkM2QxMS0yYjcyLTQyMTgtOTAxMy02MzQ5YjgwMjQxNGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GBJL07XjUxOy1vE-wpGebs-_bXpSadUcLzmgVk5w3kE"
                    alt="default"
                    className="border-solid border-1 border-grey bg-contain"
                  />
                  {/* <h3>{post.image_url}</h3> */}
                  <h3>{post.video_url}</h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.postReducer.posts,
    loading: reduxState.postReducer.loading,
    gamertag: reduxState.user.gamertag
  };
}

export default connect(
  mapStateToProps,
  { fetchAllPosts, requestUserData }
)(Social);
