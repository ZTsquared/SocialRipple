import { Link } from "react-router-dom";

export default function FootBar() {

  return (
    <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="btn btn-success">
            Homepage!
        </Link>
        </nav>
    </footer>
  )
}
