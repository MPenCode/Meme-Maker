import { Link } from 'react-router-dom';

const Lost = () => {
    return (
        <main className="flex flex-col items-center justify-center h-screen  bg-base-100">
            <div className="text-3xl font-bold mb-4">I believe you are Lost</div>
            <Link to="/" className="btn btn-primary">
                Wanna come back?
            </Link>
        </main>
    );
};

export default Lost;