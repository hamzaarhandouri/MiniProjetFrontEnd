import axios from 'axios';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link ,useHistory} from 'react-router-dom';

function Sidebar() {
  const handleLogout = () => {

      localStorage.removeItem('type');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      history.push('/');
      window.location.reload();
   
  }
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/ProfileEmployee');
    window.location.reload();
  };


  return (
    <div>
      <Navbar bg="light" expand="lg" className="d-flex align-items h-100">
        <Navbar.Brand href="/Employee">Emplyee Space</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items">
            <Link to="/Employee" className="nav-link">Dashboard</Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <Button onClick={handleButtonClick}> Profilzs</Button>
              <Link to="/ProfileEmployee" className="dropdown-item">Profile</Link>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
      </Navbar>
    </div>
  );
}

export default Sidebar;