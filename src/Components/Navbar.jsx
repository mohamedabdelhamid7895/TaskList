import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav >
            <ul style={{ listStyle: 'none' }} >
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
