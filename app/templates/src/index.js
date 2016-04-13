import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './configureStore';

const store = configureStore();

const <%= appName %> = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('<%= appName %>', () => <%= appName %>);
