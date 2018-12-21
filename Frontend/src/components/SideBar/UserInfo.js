import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={require("./admin.svg")} alt={user.name} className="photo" />
          <div className="userinfo">
            <div className="username">
              {user.name}
            </div>
            <div className="title">Admin</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);