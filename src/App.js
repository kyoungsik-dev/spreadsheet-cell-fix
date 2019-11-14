import React, { Component } from 'react';
import Table from './components/Table/';
import Header from './components/Header/';
import {csv} from './static/index';
import 'bootstrap/dist/css/bootstrap.css'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedPos: {x: 5, y: 10},
      size: {x: 0, y: 0},
      table1_pos: {x: 0, y: 0},
      table2_pos: {x: 0, y: 0},
      table3_pos: {x: 0, y: 0},
      table4_pos: {x: 0, y: 0}
    };
  }
  componentDidMount() {
    const parseData = csv.split('\n').map(o => o.split(','));
    this.setState({size: {x: parseData[0].length, y: parseData.length}});

    const table1_dom = document.getElementById('table_wrapper_1');
    const table3_dom = document.getElementById('table_wrapper_3');
    const table4_dom = document.getElementById('table_wrapper_4');

    let prevEventTime = 0;
    document.addEventListener('mousewheel', (e) => {
      if (e.timeStamp - prevEventTime > 150) {
        prevEventTime = e.timeStamp;

        const [dx, dy] = [e.wheelDeltaX, e.wheelDeltaY];

        if (Math.abs(dx) > Math.abs(dy)) { //가로 움직임의 경우 1,4분면 이동
          const way = (dx < 0) ? -1 : 1; //오른쪽 스크롤 : -1, 왼쪽 스크롤 : 1

          //오른쪽 스크롤 - 왼쪽으로 더 못감
          if (dx < 0 && this.state.table1_pos.x+1*way < (this.state.size.x - this.state.fixedPos.x)*(-1) + 1) return;

          //왼쪽 스크롤 - 오른쪽으로 더 못감
          if (dx > 0 && this.state.table1_pos.x+1*way > 0) return;

          table1_dom.style.transform = `translateX(${(this.state.table1_pos.x+1*way)*100}px)`;
          this.setState({table1_pos: {x: this.state.table1_pos.x+1*way, y: this.state.table1_pos.y}});

          table4_dom.style.transform = `translate(${(this.state.table4_pos.x+1*way)*100}px, ${this.state.table4_pos.y*34}px)`;
          this.setState({table4_pos: {x: this.state.table4_pos.x+1*way, y: this.state.table4_pos.y}});
        }

        else { //세로 움직임의 경우 3,4분면 이동
          const way = (dy < 0) ? -1 : 1; //아래쪽 스크롤 : -1, 위쪽 스크롤 : 1

          //아래쪽 스크롤 - 위로 더 못감
          if (dy < 0 && this.state.table3_pos.y+1*way < (this.state.size.y - this.state.fixedPos.y)*(-1) + 1) return;

          //위쪽 스크롤 - 아래쪽으로 더 못감
          if (dy > 0 && this.state.table3_pos.y+1*way > 0) return;

          table3_dom.style.transform = `translateY(${(this.state.table3_pos.y+1*way)*34}px)`;
          this.setState({table3_pos: {x: this.state.table3_pos.x, y: this.state.table3_pos.y+1*way}});

          table4_dom.style.transform = `translate(${this.state.table4_pos.x*100}px, ${(this.state.table4_pos.y+1*way)*34}px)`;
          this.setState({table4_pos: {x: this.state.table4_pos.x, y: this.state.table4_pos.y+1*way}});
        }
      }
    });
  }
  render() {
    const parseData = csv.split('\n').map(o => o.split(','));
    const {x, y} = this.state.fixedPos;
    const table1_data = parseData.slice(0, y).map(o => o.slice(x));
    const table2_data = parseData.slice(0, y).map(o => o.slice(0, x));
    const table3_data = parseData.slice(y).map(o => o.slice(0, x));
    const table4_data = parseData.slice(y).map(o => o.slice(x));

    return (
      <div className="App">
        <Header
          setRow={(o) => {this.setState({fixedPos: {x : this.state.fixedPos.x, y: o}})}}
          setCol={(o) => {this.setState({fixedPos: {x: o, y : this.state.fixedPos.y}})}}
        />
        <div className="App-TableArea">
          <div className="App-Upper" style={{width: `${(this.state.size.x + 1) * 100}px`}}>
            <Table data={table2_data} num={2} fixedPos={this.state.fixedPos} width={`${(this.state.fixedPos.x + 1)*100}px`} />
            <Table data={table1_data} num={1} fixedPos={this.state.fixedPos} width={`${(this.state.size.x - this.state.fixedPos.x)*100}px`} />
          </div>
          <div className="App-Lower" style={{width: `${(this.state.size.x + 1) * 100}px`}}>
            <Table data={table3_data} num={3} fixedPos={this.state.fixedPos} width={`${(this.state.fixedPos.x + 1)*100}px`} />
            <Table data={table4_data} num={4} fixedPos={this.state.fixedPos} width={`${(this.state.size.x - this.state.fixedPos.x)*100}px`} />
          </div>
          <div className="App-Border" style={{width: "100%", top: `${this.state.fixedPos.y*34-2}px`}}/>
          <div className="App-Border" style={{left: `${(this.state.fixedPos.x+1)*100-2}px`, height: `${this.state.size.y*34}px`}}/>
        </div>
      </div>
    );
  }
}

export default App;