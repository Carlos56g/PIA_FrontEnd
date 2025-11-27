import './Header.css';

export default function Header() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="header-container">
            <div className="left-side">
                <h1>MoviesForMe</h1>
            </div>
            <div className="right-side">
                <nav>
                    <ul>
                        <li>
                            <button 
                                onClick={scrollToTop}
                                className="nav-button"
                            >
                                Inicio
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('recommendations-section')}
                                className="nav-button"
                            >
                                Películas
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('search-section')}
                                className="nav-button"
                            >
                                Búsqueda
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}