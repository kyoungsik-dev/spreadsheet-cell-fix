import React from 'react';
import {Icon} from '../../static/';
import './Header.scss';

function Header(props) {
  return (
    <div className="Header">
      <div className="Header-Icon">
        <Icon />
      </div>
      <div className="Header-Body">
        <span>스프레드시트 셀고정 기능 만들기</span>
        <div className="Header-Body-Right">
          <form>
            <input className="form-control" type="text" placeholder="고정할 행" onKeyUp={(e) => props.setRow(e.target.value)}></input>
            <input className="form-control" type="text" placeholder="고정할 열" onKeyUp={(e) => props.setCol(e.target.value)}></input>
          </form>
          <button className="btn btn-success">공유</button>
        </div>
      </div>
    </div>
  );
}

export default Header;