import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/companies">
            Companies
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/employees">
            Employees
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
