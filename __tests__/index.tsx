import { render, act } from '@testing-library/react';

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

  it('should not double-compensate when transitioning between locked components', async () => {
    const Test = () => {
      const [modal, setModal] = useState<'A' | 'B' | null>('A');

      return (
        <>
          <button onClick={() => setModal('B')}>switch</button>
          <button onClick={() => setModal(null)}>close</button>
          {modal === 'A' && <RemoveScrollBar />}
          {modal === 'B' && <RemoveScrollBar />}
        </>
      );
    };

    const { getByRole } = render(<Test />);

    // Wait for modal A's lock to take effect
    await new Promise((resolve) => setTimeout(resolve, 1));

    // Collect styles applied by the first lock
    const stylesBefore = document.querySelectorAll('style');
    const cssBeforeSwitch = Array.from(stylesBefore)
      .map((s) => s.textContent)
      .join('');

    // Switch from A to B in a single batch
    act(() => {
      getByRole('button', { name: 'switch' }).click();
    });

    await new Promise((resolve) => setTimeout(resolve, 1));

    const stylesAfter = document.querySelectorAll('style');
    const cssAfterSwitch = Array.from(stylesAfter)
      .map((s) => s.textContent)
      .join('');

    // The padding-right for body[data-scroll-locked] should remain the same
    // (not doubled by reading the lock-applied margin-right as original margin)
    const extractPaddingRight = (css: string) => {
      const match = css.match(/body\[data-scroll-locked\][^}]*padding-right:\s*(\d+)px/);

      return match ? parseInt(match[1], 10) : null;
    };

    expect(extractPaddingRight(cssAfterSwitch)).toBe(extractPaddingRight(cssBeforeSwitch));
  });
});
