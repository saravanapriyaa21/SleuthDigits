import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="navBar">SleuthDigits</Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/problems">Cases</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
