import React, { useState } from 'react';

import { getGapWidth, RemoveScrollBar, zeroRightClassName } from '../src';

const Locker = () => {
  const [lock, setLock] = useState(false);

  return (
    <div>
      {lock && <RemoveScrollBar />}
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
      <div style={{ flex: 1 }} />
      <div>position fixed</div>
    </div>
    <div
      style={{ position: 'fixed', background: 'green', left: 0, top: 20, right: 0, display: 'flex' }}
      className={zeroRightClassName}
    >
      <div>position fixed+</div>
      <div style={{ flex: 1 }} />
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

export default {
  component: RemoveScrollBar,
};
