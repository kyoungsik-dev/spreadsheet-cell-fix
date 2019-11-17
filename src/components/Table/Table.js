import React, {Component} from 'react';
import {Row} from '../';
import './Table.scss';

function Table(props) {
  const zIndex = [,11, 12, 11, 10];
  const rows = props.data.map((o, i) => {
    return <Row num={props.num} fixedPos={props.fixedPos} data={o} index={(props.num < 3) ? i+1 : i+props.fixedPos.y+1} key={`row-${i}`} />
  });
  return (
    <div id={`table_wrapper_${props.num}`} className="Wrapper" style={{width: props.width, zIndex: zIndex[props.num]}}>
      <div className="Table">
        {rows}
      </div>
    </div>
  );
}

export default Table;