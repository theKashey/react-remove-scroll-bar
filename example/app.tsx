import * as React from 'react';
import {Component} from 'react';
import {RemoveScrollBar, fullWidthClassName} from "../src";

export interface AppState {
  counter: number;
}

const fill = (x: number, y: number) => {
  const a: number[] = [];
  for (let i = 0; i < x; ++i) {
    a.push(y)
  }
  return a;
}

export default class App extends Component <{}, AppState> {
  state: AppState = {
    counter: 1
  };

  componentDidMount() {
    setInterval(() => {
      //this.setState({counter: this.state.counter ? 0 : 1})
    }, 1000);

    setTimeout(() => {
      //this.setState({counter: this.state.counter ? 0 : 1})
    }, 1000);
  }

  render() {
    const gapMode = 'margin';
    return (
      <div>
        {this.state.counter ? <RemoveScrollBar/> : undefined}
        {/*<div style={{*/}
          {/*position: 'absolute',*/}
          {/*left: 0,*/}
          {/*right: 0,*/}
          {/*top: 0,*/}
          {/*height: '50px',*/}
          {/*backgroundColor: '#F00'*/}
        {/*}}>floating*/}
        {/*</div>*/}

        <div
          style={{
            position: 'absolute',
            overflow: 'scroll',
            left: 0,
            right: 0,
            top: '50px',
            //width: '100%',
            height: '50px',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
          // className={zeroRightClassName}
        >
          XXX
          XXX
          XXX
          {fill(1000, 1).map(x => <p>{x}****</p>)}
        </div>

        <div
          style={{
            position: 'absolute',
            overflow: 'scroll',
            left: 0,
            right: 0,
            top: '100px',
            //width: '100%',
            height: '50px',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
          // className={fullWidthClassName}
        >
          XXX
          XXX
          XXX
          {fill(1000, 1).map(x => <p>{x}****</p>)}
        </div>

        <div
          style={{
            position: 'fixed',
            overflow: 'scroll',
            left: 0,
            right: 0,
            top: '150px',
            //width: '100%',
            height: '50px',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
          className={fullWidthClassName}
        >
          XXX
          XXX
          XXX
          {fill(1000, 1).map(x => <p>{x}****</p>)}
        </div>


        <div style={{
          position: 'absolute',
          overflow: 'scroll',
          left: 0,
          right: 0,
          top: 200,
          //width: '100%',
          height: 300,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          XXX
          XXX
          XXX

          <div style={{
            position: 'absolute',
            overflow: 'scroll',
            width: 200,
            height: 200,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            ZZZ
            ZZZ
            {fill(1000, 1).map(x => <p>{x}****</p>)}
          </div>

          {fill(1000, 1).map(x => <p>{x}****</p>)}
        </div>

        {fill(1000, 1).map((x, index) => <span>{index}**** </span>)}
      </div>
    )
  }
}