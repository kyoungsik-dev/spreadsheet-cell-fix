import React, {Component} from 'react';
import Cell from '../Cell/';
import './Row.scss';


class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: ''
    };
  }
  componentDidMount() {
    const cols = this.props.data.map((o, i) => {
      return <Cell data={o} key={`col-${i}`} />
    });
    this.setState({cols});
  }
  render() {
    return (
      <div className="Row">
        {(this.props.num === 2 || this.props.num === 3)
          && <Cell data={this.props.index} />}
        {this.state.cols}
      </div>
    );
  }
}

export default Row;