import axios from 'axios';
import AdminSidebar from '../sideBar/AdminSidebar';
import React, { useState , useEffect} from 'react'
import { Table } from 'react-bootstrap';
export default function History() {
    const [invitations, setInvitations] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getHistory')
        .then((response) =>{
            setInvitations(response.data.invitations) ;
        })
    
      
    }, [])
    
    return (
        <div>
            <AdminSidebar/>
            <br />
            <h1>Invitations History</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {invitations.map((invitation) => (
                        <tr key={invitation.id}>
                            <td>{invitation.id}</td>
                            <td>{invitation.userSender}</td>
                            <td>{invitation.userRece}</td>
                            <td>{invitation.company}</td>
                            <td>{invitation.status}</td>
                            <td>{invitation.created_at}</td>
                            <td>{invitation.status=== "SendInvitation"  ? "Invitation est envoyer" : ""}
                            {invitation.status=== "ValidationInvitation"  ? "Profile Confirmer" : ""}
                            {invitation.status=== "cancelled"  ? "Invitation annuler par l'admin" : ""}
                   </td>
                        </tr>
                    ))}
                </tbody>
            </Table></div>
    )
}
