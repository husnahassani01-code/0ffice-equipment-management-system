import { BsJustify, BsPersonCircle } from 'react-icons/bs';
import './header.css';

function Header({ onMenuClick, onLogout }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onLogout?.();
    };

    return (
        <header className="head">
            <div className="headContent">
                <button className="menu-button" type="button" onClick={onMenuClick} aria-label="Toggle menu">
                    <BsJustify className="icon" />
                </button>

                <div className="search">
                    <input id="inpt" type="text" placeholder="Search here..." />
                </div>

                <div className="admin">
                    <BsPersonCircle className="icon" />
                    <button type="button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
