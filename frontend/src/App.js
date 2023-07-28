import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CapturePage from './pages/CapturePage';
import Navbar from './components/Navbar';
import GalleryRoute from './components/GalleryRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={< CapturePage />} />
          <Route path='/signup' element={< SignUpPage />} />
          <Route path='/signin' element={< SignInPage />} />
          <Route path='/capture' element={< CapturePage />} />
          <Route path='/gallery' element={<GalleryRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
