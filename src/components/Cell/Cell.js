import React from 'react';
import './Cell.scss';

function Cell(props) {
  return (
    <div className={`Cell ${props.isLabel ? 'Cell-Label' : ''}`} >
      <div className="Cell-Text">
        {props.data}
      </div>
    </div>
  );
}

export default Cell;