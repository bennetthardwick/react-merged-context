# react-merged-context

A simple library for creating a context provider that merges together all the provided values.

Check it out in action at [react-merged-context.netlify.app](https://react-merged-context.netlify.app/).

## Installation

This package lives in [npm](https://www.npmjs.com/get-npm). To install the latest stable version, run the following command:

```bash
npm install react-merged-context
```

Or if you're using [yarn](https://classic.yarnpkg.com/en/docs/install/):

```bash
yarn add react-merged-context
```

## Usage

You can create a merged context provider by passing your context to the `createMergedProvider` method.
This will return a "merged context provider" which you can use 

```ts
import { createContext } from 'react';
import { createMergedProvider } from 'react-merged-context';

const MyContext = createContext({ name: 'Sarah' })
const MyContextProvider = createMergedProvider(MyContext);

const element = <MyContextProvider value={...}>
...
</MyContextProvider>;
```

### Getting the value

Since `createMergedProvider` just creates a "Provider" component, you can retrieve the value from the context using the normal methods - either through `Context.Consumer` or `useContext`.

### Objects

Merged context providers can be used to apply a diff to the context.

```ts
import { createContext } from 'react';
import { createMergedProvider } from 'react-merged-context';

const MyContext = createContext({ name: 'Bennett', age: 22 })
const MyContextProvider = createMergedProvider(MyContext);

const element = <MyContextProvider value={{ name: 'Sarah' }}>
  <MyContext.Consumer>
    ({ name, age }) => {
      // `name` is 'Sarah' but `age` is still 22
    }
  </MyContext.Consumer>
</MyContextProvider>;
```

### Arrays

Merged context providers can be used to apply a diff to the context.

```ts
import { createContext } from 'react';
import { createMergedProvider } from 'react-merged-context';

const MyContext = createContext([ 1, 2, 3 ])
const MyContextProvider = createMergedProvider(MyContext);

const element = <MyContextProvider value={[ 4, 5, 6 ]}>
  <MyContext.Consumer>
    (values) => {
      // values is [ 1, 2, 3, 4, 5, 6 ]
    }
  </MyContext.Consumer>
</MyContextProvider>;
```

### Resetting with React context providers

If you don't want the values to be merged, you can use normal contexts.

```ts
import { createContext } from 'react';
import { createMergedProvider } from 'react-merged-context';

const MyContext = createContext([ 1, 2, 3 ])
const MyContextProvider = createMergedProvider(MyContext);

const element = <MyContext.Provider value={[]}>
  <MyContextProvider value={[ 4, 5, 6 ]}>
    <MyContext.Consumer>
      (values) => {
        // values is [ 4, 5, 6 ]
      }
    </MyContext.Consumer>
  </MyContextProvider>;
</MyContext.Provider>
```

## Example

You can view the example live at [react-merged-context.netlify.app](https://react-merged-context.netlify.app/).

To run the example locally:
1. navigate to `example/`
2. install the dependencies by running `yarn`
3. run `yarn start` to start the dev server
4. navigate to `localhost:1234`

## License

react-merged-context is [MIT Licensed](https://github.com/bennetthardwick/react-merged-context/blob/master/LICENSE).
