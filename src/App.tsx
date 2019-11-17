import * as React from 'react';
import {Table, Header} from './components';
import {csv} from './static/index';
import 'bootstrap/dist/css/bootstrap.css'
import './App.scss';

interface MouseWheelEvent extends MouseEvent {
  wheelDeltaX: number;
  wheelDeltaY: number;
}
interface Position {
  x: number;
  y: number;
}
interface State {
  fixedPos: Position;
  size: Position;
  tablePos1: Position;
  tablePos2: Position;
  tablePos3: Position;
  tablePos4: Position;
}

class App extends React.Component<{}, State> {
  cell: { H: number; W: number; };
  tableDom1: HTMLElement;
  tableDom3: HTMLElement;
  tableDom4: HTMLElement;
  parseData: string[][];
  tableData1: string[][];
  tableData2: string[][];
  tableData3: string[][];
  tableData4: string[][];
  
  constructor(props: {}) {
    super(props);
    this.state = {
      fixedPos: {x: 5, y: 10},
      size: {x: 0, y: 0},
      tablePos1: {x: 0, y: 0},
      tablePos2: {x: 0, y: 0},
      tablePos3: {x: 0, y: 0},
      tablePos4: {x: 0, y: 0}
    };
    this.setFixedPos = this.setFixedPos.bind(this);
    this.scrollHorizontal = this.scrollHorizontal.bind(this);
    this.scrollVertical = this.scrollVertical.bind(this);
    
    this.cell = {H: 34, W: 100}; //셀의 크기
  }
  componentDidMount() {
    const {x, y} = this.state.fixedPos;
    this.parseData = csv.split('\n').map(o => o.split(','));
    this.tableData1 = this.parseData.slice(0, y).map(o => o.slice(x));
    this.tableData2 = this.parseData.slice(0, y).map(o => o.slice(0, x));
    this.tableData3 = this.parseData.slice(y).map(o => o.slice(0, x));
    this.tableData4 = this.parseData.slice(y).map(o => o.slice(x));

    this.setState({size: {x: this.parseData[0].length, y: this.parseData.length}});

    this.tableDom1 = document.getElementById('table_wrapper_1');
    this.tableDom3 = document.getElementById('table_wrapper_3');
    this.tableDom4 = document.getElementById('table_wrapper_4');

    let prevEventTime = 0;
    document.addEventListener('mousewheel', (e: MouseWheelEvent) => {
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

  scrollHorizontal(dx: number) {
    const way = (dx < 0) ? -1 : 1; //오른쪽 스크롤 : -1, 왼쪽 스크롤 : 1

    //오른쪽 스크롤 - 왼쪽으로 더 못감
    if (dx < 0 && this.state.tablePos1.x+1*way < (this.state.size.x - this.state.fixedPos.x)*(-1) + 1) return;

    //왼쪽 스크롤 - 오른쪽으로 더 못감
    if (dx > 0 && this.state.tablePos1.x+1*way > 0) return;

    //가로 움직임의 경우 1,4분면 이동
    this.tableDom1.style.transform = `translateX(${(this.state.tablePos1.x+1*way)*this.cell.W}px)`;
    this.setState({tablePos1: {x: this.state.tablePos1.x+1*way, y: this.state.tablePos1.y}});

    this.tableDom4.style.transform = `translate(${(this.state.tablePos4.x+1*way)*this.cell.W}px, ${this.state.tablePos4.y*this.cell.H}px)`;
    this.setState({tablePos4: {x: this.state.tablePos4.x+1*way, y: this.state.tablePos4.y}});
  }

  scrollVertical(dy: number) {
    const way = (dy < 0) ? -1 : 1; //아래쪽 스크롤 : -1, 위쪽 스크롤 : 1

    //아래쪽 스크롤 - 위로 더 못감
    if (dy < 0 && this.state.tablePos3.y+1*way < (this.state.size.y - this.state.fixedPos.y)*(-1) + 1) return;

    //위쪽 스크롤 - 아래쪽으로 더 못감
    if (dy > 0 && this.state.tablePos3.y+1*way > 0) return;

    //세로 움직임의 경우 3,4분면 이동
    this.tableDom3.style.transform = `translateY(${(this.state.tablePos3.y+1*way)*this.cell.H}px)`;
    this.setState({tablePos3: {x: this.state.tablePos3.x, y: this.state.tablePos3.y+1*way}});

    this.tableDom4.style.transform = `translate(${this.state.tablePos4.x*this.cell.W}px, ${(this.state.tablePos4.y+1*way)*this.cell.H}px)`;
    this.setState({tablePos4: {x: this.state.tablePos4.x, y: this.state.tablePos4.y+1*way}});
  }

  setFixedPos(o: Position) {
    if (0 < o.y && o.y < this.state.size.y && o.y % 1 === 0 &&
        0 < o.x && o.x < this.state.size.x && o.x % 1 === 0) {
        this.setState({fixedPos: o});
    } else {
      alert("입력 값이 유효하지 않습니다.");
    }
  }
  shouldComponentUpdate(nextProps: {}, nextState: State) {
    if (nextState.fixedPos.x === this.state.fixedPos.x &&
        nextState.fixedPos.y === this.state.fixedPos.y &&
        nextState.size.x === this.state.size.x &&
        nextState.size.y === this.state.size.y) {
      return false;
    }
    const {x, y} = nextState.fixedPos;
    this.tableData1 = this.parseData.slice(0, y).map(o => o.slice(x));
    this.tableData2 = this.parseData.slice(0, y).map(o => o.slice(0, x));
    this.tableData3 = this.parseData.slice(y).map(o => o.slice(0, x));
    this.tableData4 = this.parseData.slice(y).map(o => o.slice(x));
    return true;
  }
  render() {
    const wrapperWidth = `${(this.state.size.x + 1) * this.cell.W}px`; // 전체 테이블의 가로길이
    const tableLeftWidth = `${(this.state.fixedPos.x + 1)*this.cell.W}px`; //왼쪽 테이블의 가로 길이
    const tableRightWidth = `${(this.state.size.x - this.state.fixedPos.x)*this.cell.W}px`; //오른쪽 테이블의 가로길이
    const dividerHStyle = {width: "100%", top: `${this.state.fixedPos.y*this.cell.H-2}px`}; //수평선
    const dividerVStyle = {left: `${(this.state.fixedPos.x+1)*this.cell.W-2}px`, height: `${this.state.size.y*this.cell.H}px`}; //수직선

    return (
      <div className="App">
        <Header submitValue={this.setFixedPos} />
        <div className="App-TableArea">
          <div className="App-Upper" style={{width: wrapperWidth}}>
            <Table data={this.tableData2} num={2} fixedPos={this.state.fixedPos} width={tableLeftWidth} />
            <Table data={this.tableData1} num={1} fixedPos={this.state.fixedPos} width={tableRightWidth} />
          </div>
          <div className="App-Lower" style={{width: wrapperWidth}}>
            <Table data={this.tableData3} num={3} fixedPos={this.state.fixedPos} width={tableLeftWidth} />
            <Table data={this.tableData4} num={4} fixedPos={this.state.fixedPos} width={tableRightWidth} />
          </div>
          <div className="App-Divider" style={dividerHStyle}/>
          <div className="App-Divider" style={dividerVStyle}/>
        </div>
      </div>
    );
  }
}

export default App;