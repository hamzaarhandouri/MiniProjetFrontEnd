import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import AdminSidebar from '../sideBar/AdminSidebar';
import AdminBar from '../sideBar/AdminBar';
import CompanyModal from './CompanyModal';
import EmployeModal from './EmployeModal';
import EditCompanyModal from './EditCompanyModal';
import EditEmployeeModal from './EditEmployeeModal';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaInvision, FaTimes, FaCheck } from 'react-icons/fa';

function Dashboard() {
    const [companies, setCompanies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");
    const [allowed, setAllowed] = useState(true);

    const history = useHistory();


    useEffect(() => {
        if (!localStorage.getItem('id')) {
            history.push('/');
            window.location.reload();
                  }
        axios.get(`http://127.0.0.1:8000/api/getuser/${localStorage.getItem('id')}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((response) => {

                if (response.data.user.type !== "administrateur") {
                    history.push('/');
                    window.location.reload();
                }

            })
        // Fetch data from API or database
        // and set companies and employees state variables
        axios.get('http://127.0.0.1:8000/api/index',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((response) => {
                setCompanies(response.data.data);
                axios.get('http://127.0.0.1:8000/api/indexusers',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                      }
                    })
                    .then((response) => {
                        setEmployees(response.data.data);
                        console.log(response.data.data);
                    })
            })
    }, []);

    const [showModalCompany, setShowModalCompany] = useState(false);
    const [showModalEmployee, setShowModalEmployee] = useState(false);
    const [showEditModalCompany, setShowEditModalCompany] = useState({});
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [showEditModalEmployee, setShowEditModalEmployee] = useState({});
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryEmployee, setSearchQueryEmployee] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortDesc, setSortDesc] = useState(false);
    const [sortByEmployee, setSortByEmployee] = useState("name");
    const [sortDescByEmployee, setSortDescByEmployee] = useState(false);

    const handleCloseModalCompany = () => setShowModalCompany(false);
    const handleShowModalCompany = () => setShowModalCompany(true);

    const handleCloseModalEmployee = () => setShowModalEmployee(false);
    const handleShowModalEmployee = () => setShowModalEmployee(true);

    const handleCloseEditModalCompany = (id) => setShowEditModalCompany((prev) => ({ ...prev, [id]: false }));;
    const handleShowEditModalCompany = (id) => { setShowEditModalCompany((prev) => ({ ...prev, [id]: true })); setSelectedCompanyId(id); }

    const handleCloseEditModalEmployee = (id) => setShowEditModalEmployee((prev) => ({ ...prev, [id]: false }));;
    const handleShowEditModalEmployee = (id) => { setShowEditModalEmployee((prev) => ({ ...prev, [id]: true })); setSelectedEmployeeId(id); }


    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchInputChangeEmployee = (event) => {
        setSearchQueryEmployee(event.target.value);
    };
    const handleSort = (column) => {
        if (sortBy === column) {
          setSortDesc(!sortDesc);
        } else {
          setSortBy(column);
          setSortDesc(false);
        }
      };

      const handleSortEmployee = (column) => {
        if (sortByEmployee === column) {
            setSortDescByEmployee(!sortDescByEmployee);
        } else {
            setSortByEmployee(column);
            setSortDescByEmployee(false);
        }
      };

    const filteredCompanies = companies
    .filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const columnA = a[sortBy];
      const columnB = b[sortBy];
      if (columnA < columnB) {
        return sortDesc ? 1 : -1;
      }
      if (columnA > columnB) {
        return sortDesc ? -1 : 1;
      }
      return 0;
    });

    const filteredEmployee = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchQueryEmployee.toLowerCase())
    )
    .sort((a, b) => {
      const columnA = a[sortByEmployee];
      const columnB = b[sortByEmployee];
      if (columnA < columnB) {
        return sortDescByEmployee ? 1 : -1;
      }
      if (columnA > columnB) {
        return sortDescByEmployee ? -1 : 1;
      }
      return 0;
    });
  


    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, newCompany]);
    };
    const handleAddEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
    };

    function handleEditCompany(updatedData, id) {

        setCompanies((prev) =>
            prev.map((company) => {
                if (company.id === id) {
                    return { ...company, ...updatedData[id - 1] };
                } else {
                    return company;
                }
            })
        );
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/deleteCompany/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((response) => {
                console.log(response); if (response.data.status === 403) {
                    setShowAlert(true);
                    setAlertVariant("danger");
                    setAlertMessage("is not possible to delete this company containing more than one employee");
                }
            });
    }


    const sendInvitation = (idRece, company) => {
        const fd = new FormData;
        fd.append('status', 'SendInvitation');
        fd.append('userRece_id', idRece);
        fd.append('userSender_id', localStorage.getItem('id'));
        fd.append('company_id', company);
        axios.post(`http://127.0.0.1:8000/api/CreateInvitation`, fd,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((response) => {
                setEmployees(response.data.data);
            })
    }

    const cancelInvitation = (invitation) => {
        axios.post('http://127.0.0.1:8000/api/cancelInvitation', invitation,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((response) => {
                // console.log("response: " , response);
                setEmployees(response.data.data);
            })
    }
    return (
        <div>
            <AdminSidebar />
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <h2>Dashboard</h2>
            <Container maxWidth="lg" className="bg-light mt-3 p-2 mb-3">
                <Row>
                    <Col>
                        <h2>Companies</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button variant="primary" onClick={handleShowModalCompany}>Add company</Button>
                    </Col>
                </Row>
                <CompanyModal onAddCompany={handleAddCompany} show={showModalCompany} handleClose={handleCloseModalCompany} />

            </Container>
            <div className="table-wrapper">

                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by name"
                />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={() => handleSort("name")}>
              Name {sortBy === "name" && (sortDesc ? "▼" : "▲")}
            </th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.address}</td>
                                <td>{company.city}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <Button className="btn btn-sm btn-primary mx-1" onClick={() => handleShowEditModalCompany(company.id)}> <FaEdit />
                                        </Button>
                                        <EditCompanyModal onEditcompany={handleEditCompany} id={company.id} show={showEditModalCompany[company.id]} handleClose={() => handleCloseEditModalCompany(company.id)} />


                                        <button className="btn btn-sm btn-danger mx-1" onClick={() => handleDelete(company.id)}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="table-wrapper">
                <Container maxWidth="lg" className="bg-light mt-3 p-2 mb-3">
                    <Row>
                        <Col>
                            <h2>Employees</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleShowModalEmployee}>Add Employee</Button>
                        </Col>
                    </Row>
                    <EmployeModal onAddEmployee={handleAddEmployee} company={companies} showEmployee={showModalEmployee} handleCloseEmployee={handleCloseModalEmployee} />
                </Container>
                <input
                    type="text"
                    value={searchQueryEmployee}
                    onChange={handleSearchInputChangeEmployee}
                    placeholder="Search by name Employee"
                />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={() => handleSortEmployee("name")}>
              Name {sortByEmployee === "name" && (sortDescByEmployee ? "▼" : "▲")}
            </th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployee.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.type}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.company_name}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        {
                                        employee.type === "normal" ?  (employee.invitation === null || employee.invitation.status === "cancelled" ? (<button className="btn btn-sm btn-primary mx-1" onClick={() => { sendInvitation(employee.id, employee.company_id) }}><FaInvision /></button>)
                                            : (employee.invitation.status === "ValidationInvitation" ? <button className="btn btn-sm btn-success mx-1" ><FaCheck /></button> : <button className="btn btn-sm btn-danger mx-1" onClick={() => { cancelInvitation(employee.invitation) }}><FaTimes /></button>)) : "" 
                                        }
                                        <button className="btn btn-sm btn-danger mx-1"><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>)

        </div>
    );
}

export default Dashboard;
