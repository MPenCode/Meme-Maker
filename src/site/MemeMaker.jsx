import PicGallery from "../components/PicGallery";
import Format from "../components/Format";
import Meme from "../components/Meme";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MemeMaker = () => {
  return (
    <div>
      <NavBar />
      <main>
      <Format />
      <Meme />
      <PicGallery />
      </main>
      <Footer />
    </div>
  );
};

export default MemeMaker;
