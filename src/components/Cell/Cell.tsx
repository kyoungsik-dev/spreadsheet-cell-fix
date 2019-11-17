import * as React from 'react';
import './Cell.scss';

interface Props {
  isLabel: boolean;
  data: string;
}
function Cell(props: Props) {
  return (
    <div className={`Cell ${props.isLabel ? 'Cell-Label' : ''}`} >
      <div className="Cell-Text">
        {props.data}
      </div>
    </div>
  );
}

export default Cell;