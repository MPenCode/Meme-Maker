import {Link} from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Hero = () => {
return (
    <>
        <NavBar />
        <main className="text-center my-5">
            <h1 className="text-4xl font-bold">Welcome to Meme Maker</h1>
            <div className="mt-4">
                <Link to="/memeMaker" className="btn btn-primary mr-4">Make a New Meme</Link>
                <Link to="/gallery" className="btn btn-secondary">Go to Gallery</Link>
            </div>
        </main>
        <Footer />
    </>
)
}

export default Hero