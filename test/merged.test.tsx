import React, { createContext, useContext } from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { createMergedProvider } from '../src';

describe('react-merged-context', () => {
  it('should merge arrays', () => {
    const context = createContext([1, 2, 3]);
    const MergedProvider = createMergedProvider(context);

    const { result } = renderHook(() => useContext(context), {
      wrapper: ({ children }) => (
        <MergedProvider value={[4, 5, 6]}>{children}</MergedProvider>
      ),
    });

    expect(result.current).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should merge objects', () => {
    const context = createContext({ name: 'Bennett', age: 22 });
    const MergedProvider = createMergedProvider(context);

    const { result } = renderHook(() => useContext(context), {
      wrapper: ({ children }) => (
        <MergedProvider value={{ name: 'Bob' }}>{children}</MergedProvider>
      ),
    });

    expect(result.current).toEqual({ name: 'Bob', age: 22 });
  });
});
