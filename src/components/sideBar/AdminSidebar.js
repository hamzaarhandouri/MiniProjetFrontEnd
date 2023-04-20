import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';

function Sidebar() {
  const handleLogout = () => {
    // Handle logout logic here
  }
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/AdminProfile');
  };


  return (
    <div>
      <Navbar bg="light" expand="lg" className="d-flex align-items h-100">
        <Navbar.Brand href="/dashboard">Mini Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/History" className="nav-link">Historique des invitation</Link>

          </Nav>
        </Navbar.Collapse>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <Button onClick={handleButtonClick}> Profilzs</Button>
              <Link to="/AdminProfile" className="dropdown-item">Profile</Link>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
      </Navbar>
    </div>
  );
}

export default Sidebar;