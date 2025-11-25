import './Footer.css';

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <p>&copy; 2025 MoviesForMe. All rights reserved.</p>
                <div className="footer-social">
                    <a href="#facebook" aria-label="Facebook">📘</a>
                    <a href="#twitter" aria-label="Twitter">🐦</a>
                    <a href="#instagram" aria-label="Instagram">📷</a>
                    <a href="#youtube" aria-label="YouTube">📺</a>
                </div>
            </div>
        </div>
    );
}