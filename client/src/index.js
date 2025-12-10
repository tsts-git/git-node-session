import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';  // וודא שהנתיב נכון
import App from './App';
import { BasketProvider } from './contexts/BasketContext'; // הוספת ייבוא
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // או כל theme אחר
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BasketProvider>  הוספת ה-Provider של סל הקניות */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </BasketProvider> */}
    </Provider>
  </React.StrictMode>
);
