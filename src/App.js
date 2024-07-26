import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import HomePage from './pages/HomePage';
// import AboutPage from '.pages/AboutPage';
// import NotFoundPage from '.pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          
          {/* Redirect to default page or handle 404 */}
          {/* <Route path="/404" element={<NotFoundPage />} /> */}
          <Route path="*" element={<Navigate to="/" />} /> This sets the default route
        </Routes>
      </div>
    </Router>
  );
}

export default App;
