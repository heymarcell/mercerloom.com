import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import Home from './components/Home';
import Team from './pages/Team';
import Portfolio from './pages/Portfolio';
import Work from './pages/Work';
import StartProject from './pages/StartProject';

export default function App() {
  // Initialize dynamic favicon
  useDynamicFavicon();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/start-project" element={<StartProject />} />
      </Routes>
    </Router>
  );
}
