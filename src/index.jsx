import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import App from './App.jsx';

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get('path');
if (redirectPath) {
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
