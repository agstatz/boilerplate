/**
 * index.tsx
 * 
 * Index file (primary js/ts file)
 * everything flows through here
 * 
 * @author Ashton Statz
 */
import React from 'react';
import ReactDOM from 'react-dom';

// CSS imports
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component imports
import App from './App';
import ThemeContextWrapper from './styles/ThemeContextWrapper';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <ThemeContextWrapper>
        <React.StrictMode>
            <App />
        </React.StrictMode>{' '}
    </ThemeContextWrapper>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
