import './Header.css';

export default function Header() {
    return (
        <div className="header-container">
            <div className="left-side">
                <h1>MoviesForMe</h1>
            </div>
            <div className="right-side">
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Movies</a></li>
                        <li><a href="#contact">Recommendations</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}