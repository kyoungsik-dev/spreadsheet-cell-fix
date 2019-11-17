import React, { Component } from 'react';
import {Table, Header} from './components/';
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
    this.setFixedPos = this.setFixedPos.bind(this);
    this.scrollHorizontal = this.scrollHorizontal.bind(this);
    this.scrollVertical = this.scrollVertical.bind(this);
    
    this.cell = {H: 34, W: 100}; //셀의 크기
  }
  componentDidMount() {
    const parseData = csv.split('\n').map(o => o.split(','));
    this.setState({size: {x: parseData[0].length, y: parseData.length}});

    this.table1_dom = document.getElementById('table_wrapper_1');
    this.table3_dom = document.getElementById('table_wrapper_3');
    this.table4_dom = document.getElementById('table_wrapper_4');

    let prevEventTime = 0;
    document.addEventListener('mousewheel', (e) => {
      if (e.timeStamp - prevEventTime > 70) {
        prevEventTime = e.timeStamp;
        const [dx, dy] = [e.wheelDeltaX, e.wheelDeltaY];

        if (Math.abs(dx) > Math.abs(dy)) {
          this.scrollHorizontal(dx);
        }

        else {
          this.scrollVertical(dy);
        }
      }
    });
  }

  scrollHorizontal(dx) {
    const way = (dx < 0) ? -1 : 1; //오른쪽 스크롤 : -1, 왼쪽 스크롤 : 1

    //오른쪽 스크롤 - 왼쪽으로 더 못감
    if (dx < 0 && this.state.table1_pos.x+1*way < (this.state.size.x - this.state.fixedPos.x)*(-1) + 1) return;

    //왼쪽 스크롤 - 오른쪽으로 더 못감
    if (dx > 0 && this.state.table1_pos.x+1*way > 0) return;

    //가로 움직임의 경우 1,4분면 이동
    this.table1_dom.style.transform = `translateX(${(this.state.table1_pos.x+1*way)*this.cell.W}px)`;
    this.setState({table1_pos: {x: this.state.table1_pos.x+1*way, y: this.state.table1_pos.y}});

    this.table4_dom.style.transform = `translate(${(this.state.table4_pos.x+1*way)*this.cell.W}px, ${this.state.table4_pos.y*this.cell.H}px)`;
    this.setState({table4_pos: {x: this.state.table4_pos.x+1*way, y: this.state.table4_pos.y}});
  }

  scrollVertical(dy) {
    const way = (dy < 0) ? -1 : 1; //아래쪽 스크롤 : -1, 위쪽 스크롤 : 1

    //아래쪽 스크롤 - 위로 더 못감
    if (dy < 0 && this.state.table3_pos.y+1*way < (this.state.size.y - this.state.fixedPos.y)*(-1) + 1) return;

    //위쪽 스크롤 - 아래쪽으로 더 못감
    if (dy > 0 && this.state.table3_pos.y+1*way > 0) return;

    //세로 움직임의 경우 3,4분면 이동
    this.table3_dom.style.transform = `translateY(${(this.state.table3_pos.y+1*way)*this.cell.H}px)`;
    this.setState({table3_pos: {x: this.state.table3_pos.x, y: this.state.table3_pos.y+1*way}});

    this.table4_dom.style.transform = `translate(${this.state.table4_pos.x*this.cell.W}px, ${(this.state.table4_pos.y+1*way)*this.cell.H}px)`;
    this.setState({table4_pos: {x: this.state.table4_pos.x, y: this.state.table4_pos.y+1*way}});
  }

  setFixedPos(o) {
    if (0 < o.y && o.y < this.state.size.y && o.y % 1 == 0 &&
        0 < o.x && o.x < this.state.size.x && o.x % 1 == 0) {
        this.setState({fixedPos: o});
    } else {
      alert("입력 값이 유효하지 않습니다.");
    }
  }

  render() {
    const parseData = csv.split('\n').map(o => o.split(','));
    const {x, y} = this.state.fixedPos;
    const table1_data = parseData.slice(0, y).map(o => o.slice(x));
    const table2_data = parseData.slice(0, y).map(o => o.slice(0, x));
    const table3_data = parseData.slice(y).map(o => o.slice(0, x));
    const table4_data = parseData.slice(y).map(o => o.slice(x));

    const wrapper_width = `${(this.state.size.x + 1) * this.cell.W}px`; // 전체 테이블의 가로길이
    const table_left_width = `${(this.state.fixedPos.x + 1)*this.cell.W}px`; //왼쪽 테이블의 가로 길이
    const table_right_width = `${(this.state.size.x - this.state.fixedPos.x)*this.cell.W}px`; //오른쪽 테이블의 가로길이
    const divider_h_style = {width: "100%", top: `${this.state.fixedPos.y*this.cell.H-2}px`}; //수평선
    const divider_v_style = {left: `${(this.state.fixedPos.x+1)*this.cell.W-2}px`, height: `${this.state.size.y*this.cell.H}px`}; //수직선

    return (
      <div className="App">
        <Header submitValue={this.setFixedPos} />
        <div className="App-TableArea">
          <div className="App-Upper" style={{width: wrapper_width}}>
            <Table data={table2_data} num={2} fixedPos={this.state.fixedPos} width={table_left_width} />
            <Table data={table1_data} num={1} fixedPos={this.state.fixedPos} width={table_right_width} />
          </div>
          <div className="App-Lower" style={{width: wrapper_width}}>
            <Table data={table3_data} num={3} fixedPos={this.state.fixedPos} width={table_left_width} />
            <Table data={table4_data} num={4} fixedPos={this.state.fixedPos} width={table_right_width} />
          </div>
          <div className="App-Divider" style={divider_h_style}/>
          <div className="App-Divider" style={divider_v_style}/>
        </div>
      </div>
    );
  }
}

export default App;