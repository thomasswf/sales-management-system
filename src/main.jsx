import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const dummyUser = {
  name: 'Local Tester',
  email: 'test@local.dev',
  avatar: '/default-avatar.png', // optional if you use avatars
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App user={dummyUser} isLoggedIn={true} />
  </StrictMode>,
);
