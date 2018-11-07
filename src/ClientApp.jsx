import React from 'preact-compat';
import { hydrate } from 'preact-compat';
import App from './App.jsx';

hydrate(<App />, document.getElementById('root'));
