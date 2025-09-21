import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { AuthProvider } from './context/AuthContext.jsx';

import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Learn from './pages/Learn.jsx';
import Review from './pages/Review.jsx';

import Sidebar from './components/Sidebar.jsx';

export default function App() {
  return (
    <AuthProvider>
      <AppShell
        padding="md"
        navbar={{ width: 80 }}
      >
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </AuthProvider>
  );
}
