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
                        <li><a href="./RecomendationsComponent.tsx">Inicio</a></li>
                        <li><a href="#about">Películas</a></li>
                        <li><a href="./SearchResultsComponent.tsx">Recomendaciones</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}