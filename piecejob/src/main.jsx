import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import store from './components/redux/store'; 
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from 'notistack';


ReactDOM.createRoot(document.getElementById('root')).render(

  <SnackbarProvider maxSnack={3}>
    <Provider store={store}> 
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  </SnackbarProvider>

);
