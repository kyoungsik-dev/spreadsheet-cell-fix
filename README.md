
# 스프레드시트 셀고정 기능 만들기

> 구글 스프레드시트에 있는 셀 고정 기능을 동일하게 구현

### 기술 스택
React, Typescript, Babel, Webpack, SASS

### 폴더 구조
```sh
src
├─components
│  ├─Cell
│  │      Cell.tsx
│  │      Cell.scss
│  │      index.tsx
│  ├─Header
│  ├─Row
│  ├─Table
│  └─index.tsx
├─static
│  └─     index.tsx
├─App.tsx
├─App.scss
└─index.js
```

- `App.tsx`를 제외한 모든 컴포넌트는 `components` 디렉토리에 배치하였습니다.
- Dan Abramov의 가이드에 따라 각 React 컴포넌트를 Presentational 과 Container 컴포넌트로 구분하여 배치하는 경우가 많으나, 본 프로젝트에서는 Data Fetch 등의 효과가 없고 컴포넌트 수가 많지 않아 한 디렉토리에 모두 포함시켰습니다.
- 각 컴포넌트들은 자신의 이름과 동일한 디렉토리를 다시 만들어 그 안에 배치시켰고, `/components/index.tsx`파일을 통해 모든 컴포넌트들을 export 하였습니다.
- SVG 아이콘과 스프레드시트 데이터 등 정적인 파일은 별도로 `static` 폴더를 만들어 위치시켰습니다.

### 셀고정 기능의 동작
- 셀 고정은 (1,1)부터 고정할 점의 위치인 (R, C)까지의 모든 셀을 고정시키고, 이외의 영역에 대해서만 스크롤이 가능하도록 구현되어야 했습니다.
- (R, C) 점을 기준으로 전체 테이블을 사분면으로 나누었습니다.
- 테이블을 그리기 위한  `Table` 컴포넌트 4개를 이용해 1~4분면을 표시하도록 했습니다.
- 마우스 스크롤 이벤트에 따라 각 사분면이 스크롤 되도록 하였습니다.
	- 좌/우 가로 스크롤의 경우엔 1,4사분면만이 움직입니다.
	- 상/하 세로 스크롤의 경우엔 3,4사분면만이 움직입니다.
	- 각 사분면의 DOM에 이벤트리스너를 붙이고, `transform` 속성을 통해 움직임을 조정했습니다.
	- 단시간에 지나치게 많은 이벤트가 쌓이는 것을 방지하기 위해, 이전 이벤트와의 interval이 70ms 을 넘는 경우에만 동작하도록 하였습니다.
- (R, C)의 위치값은 `App.tsx` 에서 state로 관리하였으며, 입력값의 Validation을 체크하여 alert를 띄웠습니다.
	- R 또는 C의 값이 전체 테이블의 범위에 속해있지 않거나, 소수점인 경우에는 유효하지 않습니다.