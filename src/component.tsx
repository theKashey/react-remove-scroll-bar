import * as React from 'react';
import { styleSingleton } from 'react-style-singleton';

import { fullWidthClassName, zeroRightClassName, noScrollbarsClassName, removedBarSizeVariable } from './constants';
import { GapMode, GapOffset, getGapWidth } from './utils';

export interface BodyScroll {
  noRelative?: boolean;
  noImportant?: boolean;
  gapMode?: GapMode;
}

const Style = styleSingleton();

// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
const getStyles = (
  { right, gap, gutterCanBeRemoved }: GapOffset,
  allowRelative: boolean,
  gapMode: GapMode = 'margin',
  important: string
) => `
  .${noScrollbarsClassName} {
   overflow: hidden ${important};
   padding-right: ${gap}px ${important};
  }
  html {
    scrollbar-gutter: auto !important;
  }
  body {
    overflow: hidden ${important};
    overscroll-behavior: contain;
    ${
      gutterCanBeRemoved
        ? [
            allowRelative && `position: relative ${important};`,
            gapMode === 'margin' && `margin-right: ${gap + right}px ${important};`,
            gapMode === 'padding' && `padding-right: ${gap + right}px ${important};`,
          ]
            .filter(Boolean)
            .join('')
        : ''
    }
  }
  
  .${zeroRightClassName} {
    right: ${gap}px ${important};
  }
  
  .${fullWidthClassName} {
    margin-right: ${gap}px ${important};
  }
  
  .${zeroRightClassName} .${zeroRightClassName} {
    right: 0 ${important};
  }
  
  .${fullWidthClassName} .${fullWidthClassName} {
    margin-right: 0 ${important};
  }
  
  body {
    ${removedBarSizeVariable}: ${gap}px;
  }
`;

/**
 * Removes page scrollbar and blocks page scroll when mounted
 */
export const RemoveScrollBar: React.FC<BodyScroll> = (props) => {
  const { noRelative, noImportant, gapMode = 'margin' } = props;
  /*
   gap will be measured on every component mount
   however it will be used only by the "first" invocation
   due to singleton nature of <Style
   */
  const gap = React.useMemo(() => getGapWidth(gapMode), [gapMode]);

  return <Style styles={getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '')} />;
};
