var React = require('react');
var ReactBootstrap = require('react-bootstrap')
  , Button = ReactBootstrap.Button
  , CollapsableNav = ReactBootstrap.CollapsableNav
  , DropdownButton = ReactBootstrap.DropdownButton
  , MenuItem = ReactBootstrap.MenuItem
  , Nav = ReactBootstrap.Nav
  , Navbar = ReactBootstrap.Navbar;
var ReactRouterBootstrap = require('react-router-bootstrap')
  , NavItemLink = ReactRouterBootstrap.NavItemLink;
var AuthActions = require('../../actions/AuthActions');
var AuthStore = require('../../stores/AuthStore');

var Header = React.createClass({
  render: function() {
    var user = this.props.user;
    var userMenu;
    if (user) {
      var profile = (
        <span>
          <img src={user.picture.data.url} height="18" width="18" />
          <span>&nbsp;{user.name}</span>
        </span>
      );
      userMenu = (
        <Nav navbar right>
          <DropdownButton title={profile}>
            <MenuItem onClick={this.handleSignOut}>登出</MenuItem>
          </DropdownButton>
        </Nav>
      );
    } else {
      userMenu = <Button className="navbar-btn navbar-right" onClick={this.handleSignIn}>登入</Button>;
    }
    return (
      <Navbar brand="達輝活動網" inverse fixedTop>
        <CollapsableNav>
          <Nav navbar>
            <NavItemLink to="home">探索活動</NavItemLink>
            <NavItemLink to="createActivity">新增活動</NavItemLink>
          </Nav>
          {userMenu}
        </CollapsableNav>
      </Navbar>
    );
  },
  handleSignIn: function() {
    AuthActions.signIn();
  },
  handleSignOut: function() {
    AuthActions.signOut();
  }
});

module.exports = Header;
