import * as React from 'react';
import Row from '../Row/';
import './Table.scss';

interface Position {
  x: number;
  y: number;
}
interface Props {
  data: Array<Array<string>>;
  num: number;
  fixedPos: Position;
  width: string;
}
function Table(props: Props) {
  const zIndex = [,11, 12, 11, 10];
  const rows = props.data && props.data.map((o, i) => {
    return <Row num={props.num} data={o} index={(props.num < 3) ? i+1 : i+props.fixedPos.y+1} key={`row-${i}`} />
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