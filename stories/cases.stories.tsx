import React, { useState } from 'react';

import { getGapWidth, removedBarSizeVariable, RemoveScrollBar, zeroRightClassName } from '../src';

const Locker = () => {
  const [lock, setLock] = useState(false);

  return (
    <div>
      {lock && <RemoveScrollBar gapMode={'padding'} />}
      <button onClick={() => setLock(!lock)}>{lock ? 'Restore' : 'Remove'}</button>
      gap: {JSON.stringify(getGapWidth('margin'))} / {getGapWidth('padding').gap}
    </div>
  );
};

const Span = () => (
  <div style={{ background: '#EEE' }}>
    {new Array(100).fill(1).map(() => (
      <>
        --
        <br />
      </>
    ))}
  </div>
);
const Fixed = () => (
  <div>
    <div style={{ position: 'fixed', background: 'green', left: 0, top: 0, right: 0, display: 'flex' }}>
      <div>position fixed</div>
      <div style={{ flex: 1 }}>100%</div>
      <div>position fixed</div>
    </div>
    <div
      style={{ position: 'fixed', background: 'green', left: 0, top: 40, right: 0, display: 'flex' }}
      className={zeroRightClassName}
    >
      <div>position fixed+</div>
      <div style={{ flex: 1 }}>compensation</div>
      <div>+position fixed</div>
    </div>
    <div
      style={{
        position: 'fixed',
        background: 'green',
        left: 0,
        top: 20,
        right: 0,
        paddingRight: `var(${removedBarSizeVariable})`,
        display: 'flex',
      }}
    >
      <div>position fixed+</div>
      <div style={{ flex: 1 }}>compensation +padding</div>
      <div>+position fixed</div>
    </div>
  </div>
);

export const Default = () => (
  <>
    <Fixed />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Locker />
    <Locker />
    <Span />
  </>
);

export const WithScrollBarGutter = () => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
         html {
         scrollbar-gutter: stable;
         }
         body {
         padding:0;
         }
        `,
      }}
    />
    <Default />
  </>
);

export const WithBodyPaddings = () => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
         .sb-show-main.sb-show-main.sb-show-main {
         padding-top:100px;
         padding-left:100px;
         padding-right:100px;
         }
        `,
      }}
    />
    <Default />
  </>
);

export const WithBodyMargins = () => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
         .sb-show-main.sb-show-main.sb-show-main {
         margin-top:100px;
         margin-left:100px;
         margin-right:100px;
         }
        `,
      }}
    />
    <Default />
  </>
);

export const WithMarginAndPadding = () => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
         .sb-show-main.sb-show-main.sb-show-main {
         margin-top:50px;
         margin-left:50px;
         margin-right:50px;
         padding:50px;
         }
        `,
      }}
    />
    <Default />
  </>
);

export default {
  component: RemoveScrollBar,
};
