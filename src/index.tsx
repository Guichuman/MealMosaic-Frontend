import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/globals.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Client from './pages/clients/Client';
import Diet from './pages/diets/Diet';
import CreateAccount from './pages/createAccount/CreateAccount';
import ResetPassword from './pages/resetPassword/ResetPassword';
import CreateDiet from './pages/createDiet/CreateDiet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Menu from './components/menu/Menu';
import styles from './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);

const Main: React.FC = () => {
  const menuItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Clientes', path: '/clients' },
    { name: 'Dietas', path: '/diets' }
  ];

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();
  const hideSidebarPaths = ['/', '/register', '/resetPassword'];
  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={styles.App}>
      {shouldShowSidebar && (
        <Menu menuItems={menuItems} isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      )}
      <div className={`${styles.content} ${isSidebarExpanded ? styles.expanded : styles.collapsed}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/diets" element={<Diet />} />
          <Route path="/createDiet" element={<CreateDiet />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Main />
  </Router>
);

export default App;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

