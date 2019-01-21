import * as React from 'react';
import {styleSinglentone} from 'react-style-singleton';
import {GapMode, GapOffset, getGapWidth, zeroGap} from './utils';

export interface BodyScroll {
  noRelative?: boolean;
  noImportant?: boolean;
  gapMode?: GapMode;
  dynamic?: boolean;
}

export interface BodyState {
  gap: GapOffset;
};

const Style = styleSinglentone();

// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
const getStyles = ({left, top, right, gap}: GapOffset, allowRelative: boolean, gapMode: GapMode = 'margin', important: string) => `
  body {
    overflow: hidden ${important};
    ${
  [
    allowRelative && `position: relative ${important};`,
    gapMode == 'margin' && `
    padding-left: ${left}px;
    padding-top: ${top}px;
    padding-right: ${right}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${gap}px ${important};
    `,
    gapMode == 'padding' && `padding-right: ${gap}px ${important};`,
  ].filter(Boolean).join('')
  }
  }
  
  .right-scroll-bar-position {
    right: ${gap}px ${important};
  }
  
  .width-before-scroll-bar {
    margin-right: ${gap}px ${important};
  }
  
  .right-scroll-bar-position .right-scroll-bar-position {
    right: 0 ${important};
  }
  
  .width-before-scroll-bar .width-before-scroll-bar {
    margin-right: 0 ${important};
  }
`;

export const zeroRightClassName = 'right-scroll-bar-position';
export const fullWidthClassName = 'width-before-scroll-bar';

export class RemoveScrollBar extends React.Component<BodyScroll, BodyState> {
  state = {
    gap: getGapWidth(this.props.gapMode)
  };

  componentDidMount() {
    const gap = getGapWidth(this.props.gapMode);
    if (gap !== this.state.gap) {
      this.setState({
        gap
      })
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  componentDidUpdate() {
    if (!this.state.gap) {
      const gap = getGapWidth(this.props.gapMode);
      if (gap !== this.state.gap) {
        this.setState({gap})
      }
    }
  }

  onResize = () => {
    this.forceUpdate();
    if (this.state.gap && this.props.dynamic) {
      if (window.innerHeight > document.body.offsetHeight) {
        // reset state to re-evaluate
        this.setState({gap: zeroGap})
      }
    }
  };

  render() {
    const {noRelative, noImportant, gapMode = 'margin'} = this.props;
    const {gap} = this.state;

    return gap.gap
      ? <Style styles={getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : '')}/>
      : null;
  }
}