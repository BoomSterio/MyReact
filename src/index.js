import reportWebVitals from './reportWebVitals';
import state, {subscribe} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updatePostText} from './redux/state';

function renderApp(state) {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updatePostText={updatePostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
};
renderApp(state);

subscribe(renderApp);

reportWebVitals();
