import React from 'react';
import {Icon} from '../../static/';
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: 0,
      col: 0
    };

    this.setRow = this.setRow.bind(this);
    this.setCol = this.setCol.bind(this);
    this.submitValue = this.submitValue.bind(this);
  }

  setRow(e) {
    this.setState({row: Number(e.target.value)});
  }
  setCol(e) {
    this.setState({col: Number(e.target.value)});
  }
  submitValue() {
    this.props.submitValue({x: this.state.col, y: this.state.row});
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-Icon">
          <Icon />
        </div>
        <div className="Header-Body">
          <span>스프레드시트 셀고정 기능 만들기</span>
          <div className="Header-Body-Right">
            <form>
              <input className="form-control" type="text" placeholder="고정할 행" onChange={this.setRow}></input>
              <input className="form-control" type="text" placeholder="고정할 열" onChange={this.setCol}></input>
              <a href="#" className="btn btn-success" onClick={this.submitValue}>설정</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;