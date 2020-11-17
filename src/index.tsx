import React, { Context, FC, ProviderProps, useContext, useMemo } from 'react';

export type MergedProviderProps<T> = ProviderProps<
  T extends any[] ? T : Partial<T>
>;

/**
 * Create a React Context provider that passes through the parent context's
 * peforming a shallow merge of the provided fields.
 *
 * If the context contains an array the arrays will be concat together.
 * If the context contains an object the values with be merged similar to Object.assign.
 *
 * ## Array Example
 *
 * ```ts
 * const myContext = React.createContext([ 1, 2 ]);
 * const MyContextProvider = createMergedProvider(myContext);
 *
 * <MyContextProvider value={[ 3, 4 ]}>
 *      // In here the context value is [ 1, 2, 3, 4 ]
 * </MyContextProvider>
 * ```
 *
 * ## Object Example
 *
 * ```ts
 * const myContext = React.createContext({ name: 'Bennett', age: 22 });
 * const MyContextProvider = createMergedProvider(myContext);
 *
 * <MyContextProvider value={{ name: 'Bob' }}>
 *      // In here the context value is { name: 'Bob', age: 22 }
 * </MyContextProvider>
 * ```
 *
 * @param context The created context to create a merged provider for
 * @returns a component that will act as the context provider
 */
export function createMergedProvider<T>(
  context: Context<T>
): FC<MergedProviderProps<T>> {
  return function Provider({ value, children }) {
    // Get the parent value from the first context up the tree.
    // When this is the top context provider it'll be the context's default value.
    const parentValue = useContext(context);
    return (
      <context.Provider
        value={useMemo(() => {
          // When the context value is an array both the parent and the current value
          // need to be arrays.
          if (Array.isArray(parentValue) && Array.isArray(value)) {
            // I can't see a simple way to not have to cast these like this.
            return ([...parentValue, ...value] as any) as T;
          } else {
            return { ...parentValue, ...value };
          }
        }, [parentValue, value])}
      >
        {children}
      </context.Provider>
    );
  };
}
