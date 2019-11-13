import React, {Component} from 'react';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }
  joinDummy(d) {
    return [...Array(10).keys()].map(()=> d);
  }
  render() {
    const dummy = (<div style={{margin:'100px'}}>DUMMY</div>);
    return (
      <div className="Home">
        <div>
          Welcome!
        </div>
        {this.joinDummy(dummy)}
      </div>
    );
  }
}

export default Home;