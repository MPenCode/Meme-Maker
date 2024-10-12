import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import MemeGallery from "../components/MemeGallery.jsx";

const Gallery = () => {
  return (
    <>
      <NavBar />
        <main>
      <MemeGallery />
        </main>
      <Footer />
    </>
  );
};

export default Gallery;
