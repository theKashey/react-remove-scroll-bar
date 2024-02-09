import { render } from '@testing-library/react';

import React from 'react';

import { RemoveScrollBar } from '../src';

describe('RemoveScrollBar', () => {
  describe('bodyClassName', () => {
    it('should not add a className to the body by default', () => {
      render(<RemoveScrollBar />);

      // no classes applied
      expect(document.body.classList).toHaveLength(0);

      // but styles should still be applied to the body via global tag selector
      const bodyStyles = global.getComputedStyle(document.body);
      expect(bodyStyles.getPropertyValue('overflow')).toBe('hidden');
    });

    it('should add supplied className to the body when supplied', () => {
      const scopedClassName = 'scoped';
      render(<RemoveScrollBar bodyClassName={scopedClassName} />);

      // custom scope class applied
      expect(document.body.classList).toContain(scopedClassName);

      // styles should be applied to the body via scoped class
      const bodyStyles = global.getComputedStyle(document.body);
      expect(bodyStyles.getPropertyValue('overflow')).toBe('hidden');

      const scopedBody = document.querySelector(`.${scopedClassName}`);

      if (!scopedBody) {
        throw new Error('The `body` element was not correctly scoped');
      }

      const scopedBodyStyles = global.getComputedStyle(scopedBody);
      expect(scopedBodyStyles.getPropertyValue('overflow')).toBe('hidden');
    });
  });
});
