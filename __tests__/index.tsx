import { render } from '@testing-library/react';

import React, { useState } from 'react';

import { RemoveScrollBar } from '../src';
import { lockAttribute } from '../src/component';

const renderTest = (actionName = 'toggle') => {
  const Test = () => {
    const [lock, setLock] = useState(false);

    return (
      <>
        <button onClick={() => setLock(!lock)}>{actionName}</button>
        {lock ? <RemoveScrollBar /> : null}
      </>
    );
  };

  return render(<Test />);
};

describe('RemoveScrollBar', () => {
  it('should toggle the lock attribute on mount/unmount', async () => {
    const { getByRole } = renderTest();
    const button = getByRole('button');

    expect(document.body.getAttribute(lockAttribute)).toBeNull();
    expect(window.getComputedStyle(document.body).overflow).toBe('');

    button.click();
    expect(document.body.getAttribute(lockAttribute)).toBeDefined();
    await new Promise((resolve) => setTimeout(resolve, 1));
    expect(window.getComputedStyle(document.body).overflow).toBe('hidden');

    button.click();
    expect(document.body.getAttribute(lockAttribute)).toBeNull();
    expect(window.getComputedStyle(document.body).overflow).toBe('');
  });

  it('should handle nested cases', () => {
    const t1 = renderTest('toggle1');
    const t2 = renderTest('toggle2');
    const button1 = t1.getByRole('button', { name: 'toggle1' });
    const button2 = t2.getByRole('button', { name: 'toggle2' });

    expect(document.body.getAttribute(lockAttribute)).toBeNull();

    button1.click();
    button2.click();
    expect(document.body.getAttribute(lockAttribute)).toBeDefined();

    button1.click();
    expect(document.body.getAttribute(lockAttribute)).toBeDefined();

    button2.click();
    expect(document.body.getAttribute(lockAttribute)).toBeNull();
  });
});
