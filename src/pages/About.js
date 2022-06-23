import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Nathan Loafman</div>
            <div className="brief_description">
            I am a rising junior at Rose-Hulman Institute of Technology majoring in Computer Science. I wish to become an ethical hacker in the future.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
