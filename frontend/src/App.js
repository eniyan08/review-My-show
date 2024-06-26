import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout
import DefaultLayout from './layouts/Default.layout';
// Pages
import HomePage from './pages/Home.page';
import Sign_Up from './pages/Sign_Up.page';
import Login from './pages/Login.page';
import Info from './pages/Info.page';
import Movies from './pages/Movies.page'
import Tv_shows from './pages/TvShows.page';
// data provider
import { DataProvider } from './context/Data.context';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/home" element={<DefaultLayout><HomePage /></DefaultLayout>} />
          <Route path="/info/:type/:id" element={<DefaultLayout><Info /></DefaultLayout>} />
          <Route path="/movies" element={<DefaultLayout><Movies /></DefaultLayout>} />
          <Route path="/tv_shows" element={<DefaultLayout><Tv_shows /></DefaultLayout>} />

        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

