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
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#peliculas">Películas</a></li>
                        <li><a href="#busqueda">Búsqueda</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}