import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
// import Test from './util/Test'; DEBUG

ReactDOM.render(<App />, document.getElementById('root')); // change back to <App />
registerServiceWorker();
