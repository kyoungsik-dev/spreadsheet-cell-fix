import * as React from 'react';
import Cell from '../Cell/Cell';
import './Row.scss';

interface Props {
  num: number;
  index: number;
  data: Array<string>;
}
function Row(props: Props) {
  const cols = props.data.map((o, i) => {
    return <Cell data={o} key={`col-${i}`} isLabel={false} />
  });
  return (
    <div className="Row">
      {(props.num === 2 || props.num === 3)
        && <Cell data={String(props.index)} isLabel={true} />}
      {cols}
    </div>
  );
}

export default Row;