import { render } from '@testing-library/react';

import React, { useState } from 'react';

import { RemoveScrollBar } from '../src';
import { lockAttribute } from '../src/component';

const renderTest = () => {
  const Test = () => {
    const [lock, setLock] = useState(false);

    return (
      <>
        <button onClick={() => setLock(!lock)}>Toggle</button>
        {lock ? <RemoveScrollBar /> : null}
      </>
    );
  };

  return render(<Test />);
};

describe('RemoveScrollBar', () => {
  it('should toggle the lock attribute on mount/unmount', () => {
    const { getByRole } = renderTest();
    const button = getByRole('button');

    expect(document.body.getAttribute(lockAttribute)).toBeNull();

    button.click();
    expect(document.body.getAttribute(lockAttribute)).toBeDefined();

    button.click();
    expect(document.body.getAttribute(lockAttribute)).toBeNull();
  });
});
