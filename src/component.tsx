import * as React from 'react';
import {styleSinglentone} from 'react-style-singleton';
import {GapMode, getGapWidth} from './utils';

export interface BodyScroll {
  noRelative?: boolean;
  noImportant?: boolean;
  gapMode?: GapMode;
}

const Style = styleSinglentone();

// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
const getStyles = (gap: number, allowRelative: boolean, gapMode: GapMode, important: string) => `
  body {
    overflow: hidden ${important};
    ${
  [
    allowRelative && `position: relative ${important};`,
    gapMode == 'margin' && `margin-right: ${gap}px ${important};`,
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

export const RemoveScrollBar: React.SFC<BodyScroll> = ({noRelative, noImportant, gapMode = 'margin'}) => {
  const gap = getGapWidth(gapMode);
  return gap
    ? <Style styles={getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : '')}/>
    : null;
};