import React, {Component} from 'react';
import {Cell} from '../';
import './Row.scss';


class Row extends Component {
  render() {
    const cols = this.props.data.map((o, i) => {
      return <Cell data={o} key={`col-${i}`} />
    });
    return (
      <div className="Row">
        {(this.props.num === 2 || this.props.num === 3)
          && <Cell data={this.props.index} isLabel={true} />}
        {cols}
      </div>
    );
  }
}

export default Row;