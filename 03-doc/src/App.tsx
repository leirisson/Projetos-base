import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileText, Shield, Bell, PieChart } from 'lucide-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: PieChart },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Categories', href: '/categories', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Bell },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout navigation={navigation} />}>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App