import React from 'react';
import './SideMenu.css';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="SideMenu">
        <div className="SideMenu-Inner">
          최경식
        </div>
      </div>
    );
  }
}


export default Header;