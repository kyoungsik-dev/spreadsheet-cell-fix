import React, {Component} from 'react';
import {Cell} from '../';
import './Row.scss';

function Row(props) {
  const cols = props.data.map((o, i) => {
    return <Cell data={o} key={`col-${i}`} />
  });
  return (
    <div className="Row">
      {(props.num === 2 || props.num === 3)
        && <Cell data={props.index} isLabel={true} />}
      {cols}
    </div>
  );
}

export default Row;