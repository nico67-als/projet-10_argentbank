import { Link } from 'react-router-dom'
import '../styles/NotFound.scss'

const NotFound = () => {
    return (
        <main className="main bg-dark">
            <section className="not-found">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-text">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link to="/" className="not-found-link">Back to homepage</Link>
            </section>
        </main>
    )
}

export default NotFound
