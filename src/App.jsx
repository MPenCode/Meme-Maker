import Hero from "./site/Hero";
import Gallery from "./site/Gallery";
import MemeMaker from "./site/MemeMaker";
import Lost from "./site/Lost";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/memeMaker" element={<MemeMaker />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
