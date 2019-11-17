import React, {Component} from 'react';
import {Row} from '../';
import './Table.scss';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: ''
    };
  }

  render() {
    const zIndex = [,11, 12, 11, 10];
    const rows = this.props.data.map((o, i) => {
      return <Row num={this.props.num} fixedPos={this.props.fixedPos} data={o} index={(this.props.num < 3) ? i+1 : i+this.props.fixedPos.y+1} key={`row-${i}`} />
    });
    return (
      <div id={`table_wrapper_${this.props.num}`} className="Wrapper" style={{width: this.props.width, zIndex: zIndex[this.props.num]}}>
        <div className="Table">
          {rows}
        </div>
      </div>
    );
  }
}

export default Table;