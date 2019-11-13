import React from 'react';
import {Icon} from '../../static/';
import './Header.scss';

function Header() {
  return (
    <div className="Header">
      <div className="Header-Icon">
        <Icon />
      </div>
      <div className="Header-Body">
        <span>스프레드시트 셀고정 기능 만들기</span>
        <button className="btn btn-success">공유</button>
      </div>
    </div>
  );
}

export default Header;