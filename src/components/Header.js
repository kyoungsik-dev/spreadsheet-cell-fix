import React from 'react';
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFloat: false
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100) { // false => true
        if (this.state.isFloat) return;
        this.setState({isFloat : true});
      }
       else if (y === 0) { // true => false
        if (!this.state.isFloat) return;
        this.setState({isFloat: false});
      }
    });
  }
  render() {
    return (
      <div id="Header" className="Header">
        <div className="Header-Icon">
          <img src="/logo.svg" className="Header-Icon-Image" />
        </div>
        <div className="Header-Body">
          <div className="Header-Left">
            HEADER
          </div>
          <div className="Header-Right">
            SUB-MENU
          </div>
        </div>
      </div>
    );
  }
}

export default Header;