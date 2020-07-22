import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <img src="assets/images/hinhnen.jpg"/>
        {/* <h1>HRMO: QUẢN LÝ NHÂN SỰ</h1> */}
        <p/>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li>ASP.Net Core WebAPI</li>
          <li>ReactJS</li>
          <li>Bootstrap Material-UI for layout and styling</li>
        </ul>
        <p>by</p>
        <ul>
          <li>Nguyễn Minh Kiệt</li>
          <li>Trần Minh Tuyến</li>
        </ul>
        <p>instructor</p>
        <ul>
          <li>Bùi Công Danh</li>
        </ul>
      </div>
    )
  }
}
