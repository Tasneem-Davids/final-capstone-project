import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './appointments.css';
import appointmentImage from '../images/appointmentPage.jpg';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import cookies from 'js-cookie';

class Appointments extends Component{
    constructor(props){
        super(props)

        this.state={
            user:[],
            cookie:'',
            appointments:[]
        }
    }

    componentDidMount = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'))//Fetch user object and cookie from storage
        const token = cookies.get('token')

        await this.setState({
            user: user
        })

        await this.setState({
            cookie: token
        })

        await axios({//Function for fetching appointments from the database and setting the appointments state
            method: 'GET',
            url: '/appointments/fetch',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response)
            this.setState({
                appointments: response.data
            })
        })
        .catch((err)=>console.log(err))
    }

    render(){
        const appointments = this.state.appointments//the appointments array in state
        //Function for making the delete request when the delete button is clicked
        const onDelete = (_id) => {
            axios.delete(`/appointments/${_id}`)//Sent the id of the appointment in params 
            .then((res)=>alert(res.data))
            .catch((err)=>alert('Sorry, appointment could not be deleted'))

            window.location.reload();
        }
        //Mapped through appointments and displayed them in a table
        const displayAppointments = appointments.map((appointment) => {
            return <tr>
                <td>{appointment.name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.duration}</td>
                <td>{appointment.date}</td>
                <td>{appointment.day}</td>
                <td><Button variant="danger" onClick={onDelete.bind(this, appointment._id)} className="DeleteButton"><b>X</b></Button></td>
                </tr>
        })

        return(
           <div className="content-wrapper">
               <img src={appointmentImage}/>
               <div className="text-wrapper">
               <Nav className="AppointmentsNav">
               <Nav.Link href="/add appointments" className="AppointmentsNavLink"><b>Add New Appointment</b></Nav.Link>
               </Nav>
                <h1 className="AppointmentsHeading">Your appointment book</h1>
                <br/>
                <h5 className="AppointmentsSubheading">You can update any appointments <Nav><Nav.Link href="/update" className="AppointmentsSubLink">right here</Nav.Link></Nav></h5>
                <Table className="AppointmentsTable">
                <thead className="AppointmentsTableHead">
                <tr>
                <th>Name of patient</th>
                <th>Reason for appointment</th>
                <th>Duration of appointment</th>
                <th>Date of appointment</th>
                <th>Day of appointment</th>
                <th className="TableRemove">Remove</th>
                </tr>
                </thead>
                <tbody>
                {displayAppointments}
                </tbody>
                </Table>
                <br/>
               </div>
           </div> 
        )
    }
}

//<Button variant="danger" className="DeleteButton"><b>Remove</b></Button>

export default Appointments