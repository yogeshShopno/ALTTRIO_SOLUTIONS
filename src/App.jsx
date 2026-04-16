import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Purchases from './pages/Purchases';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem("login");

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/purchases" element={<Purchases />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

