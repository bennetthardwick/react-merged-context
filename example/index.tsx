import 'react-app-polyfill/ie11';
import React, { createContext, useContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { createMergedProvider } from '../.';

interface Command {
  name: string;
  run(): void;
}

// The default commands that will be used to create the context.
// Down the tree, these can be appended to by using a "merged context provider".
const DEFAULT_COMMANDS: Command[] = [
  {
    name: 'Say Hello',
    run: () => window.alert('Hello!'),
  },
  {
    name: 'Say Goodbye',
    run: () => window.alert('Goodbye!'),
  },
];

// Create the "CommandContext" using the default commands.
const CommandContext = createContext(DEFAULT_COMMANDS);

// Use "createMergedProvider" to create the "CommandProvider" - a context provider
// that will merge it's input with it's parent context.
const CommandProvider = createMergedProvider(CommandContext);

// The command menu command will show all the commands inside the context, and will
// let you run them.
const CommandMenu = () => {
  const commands = useContext(CommandContext);

  return (
    <div style={{ border: 'solid 2px', borderRadius: 4, padding: 8 }}>
      <h3 style={{ marginTop: 0 }}>Commands</h3>
      <ul>
        {commands.map(({ name, run }) => (
          <li key={name}>
            {name}
            <button onClick={run}>Run</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// The home component shows only the default commands, since it doesn't have a context provider overriding it.
const Home = () => (
  <div>
    <h2>Home</h2>
    <p>
      The home page has a command menu with all the commands that can be run.
    </p>
    <CommandMenu />
  </div>
);

// The Settings component uses the merged context provider to append some options to the
// command menu.
const Settings = () => {
  const [setting, setSetting] = useState<'one' | 'two' | 'three'>();

  const settingsCommands = useMemo(
    () => [
      {
        name: 'Set setting to one',
        run: () => setSetting('one'),
      },
      {
        name: 'Set setting to two',
        run: () => setSetting('two'),
      },
      {
        name: 'Set setting to three',
        run: () => setSetting('three'),
      },
      // Optionally add another command in, depending on whether the setting is set.
      ...(setting
        ? [{ name: 'Unselect setting', run: () => setSetting(undefined) }]
        : []),
    ],
    [setting]
  );

  return (
    <div>
      <h2>Settings</h2>
      <p>
        The settings page also has a command menu. It's got all the commands
        from the previous page, but adds a few as well.
      </p>
      {setting && <div>Selected setting: {setting}</div>}
      <CommandProvider value={settingsCommands}>
        <CommandMenu />
      </CommandProvider>
    </div>
  );
};

// The thin settings component shows how you can overwrite the parent context so that
// only the appended items are used.
const ThinSettings = () => (
  <CommandContext.Provider value={useMemo(() => [], [])}>
    <p>
      Here we've set the parent context to be an empty array, so only the added
      entries are shown.
    </p>
    <div style={{ border: 'solid 2px', borderRadius: 4, padding: 8 }}>
      <Settings />
    </div>
  </CommandContext.Provider>
);

const App = () => {
  const [area, setArea] = useState<'home' | 'settings' | 'thin-settings'>(
    'home'
  );

  return (
    <div>
      <button onClick={() => setArea('home')}>Home</button>
      <button onClick={() => setArea('settings')}>Settings</button>
      <button onClick={() => setArea('thin-settings')}>Thin Settings</button>
      {area === 'home' ? (
        <Home />
      ) : area === 'settings' ? (
        <Settings />
      ) : (
        <ThinSettings />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
