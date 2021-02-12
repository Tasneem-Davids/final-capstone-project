import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './updatePage.css';
import update from '../images/updatePage.jpg';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import cookies from 'js-cookie';
import axios from 'axios';

class Update extends Component{
    constructor(props){
        super(props)

        this.state={
            search: '',
            user: [],
            cookie: '',
            appointments: [],
            name: '',
            reason: '',
            duration: '',
            date: '',
            day: '',
            toBeChanged: '',
            newValue: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    onChange = (e) => {//To set the states when a user enters info in the input fields
       this.setState({
        [e.target.name]: e.target.value
       })
    }

    onUpdate = async() => {//Function for sending a request to update a document/appointment
        const {name, reason, duration, date, day, toBeChanged, newValue} = this.state //Calling the properties in state
        //making the update request usingthe put method
        axios.put('/appointments/update', {name, reason, duration, date, day, toBeChanged, newValue})
        .then((res) => alert(res.data.Message))
        .catch((err) => console.log(err))

        await window.location.reload()
    }

    componentDidMount = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'))//Fetch user object and cookie from storage
        const token = cookies.get('token')

        await this.setState({//setting the states of user and cookie
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
        const {appointments} = this.state

        const displaySearchResult = appointments.map((appointment) => {//Here I use the appointments array and the search in state to search for a specific patient
            const {search} = this.state

            if(appointment.name === search){//If the name of a patient matches the name in the search state it displays a table with the patients information
                return <Table className="UpdateTable">
                <thead>
                <th>Name</th>
                <th>Reason</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Day</th>
                </thead>
                <tbody>
                <tr>
                    <td>{appointment.name}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.duration}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.day}</td>
                </tr>
                </tbody>
                </Table>
            }
        })

        return(
           <div className="content-wrapper">
               <img src={update}/>
               <div className="text-wrapper">
               <Nav className="UpdateNav">
               <Nav.Link href="/appointments" className="UpdateNavLink"><b>Back To Appointment Book</b></Nav.Link>
               </Nav>
                <h1 className="UpdateHeading">Want to make some changes to an appointment? You can add all the appointment's details in the form to the left, and change any aspect of the appointment, in the form to the right</h1>
                <h5 className="SearchHeading">Here you can search for the patient by name to get all details of their appointment, as well as view changes</h5>
                <Form className="SearchForm">
                <Form.Control type="text" name="search" onChange={this.onChange}  placeholder="Charles Smith"/>
                </Form>
                {displaySearchResult}{/*Here I display the search result*/}
                <br/>
               <Form className="UpdateForm">
               <Form.Group>
               <Form.Label className="UpdateLabel"><b>Name</b></Form.Label>
               <Form.Control type="text" name="name" onChange={this.onChange} placeholder="Charles Smith"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="UpdateLabel"><b>Reason</b></Form.Label>
               <Form.Control type="text" name="reason" onChange={this.onChange} placeholder="Flu symptoms"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="UpdateLabel"><b>Duration</b></Form.Label>
               <Form.Control type="text" name="duration" onChange={this.onChange} placeholder="10:30 a.m. - 11:30 a.m."/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="UpdateLabel"><b>Date</b></Form.Label>
               <Form.Control type="text" name="date" onChange={this.onChange} placeholder="5 Feb 2020"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="UpdateLabel"><b>Day</b></Form.Label>
               <Form.Control type="text" name="day" onChange={this.onChange} placeholder="Friday"/>
               </Form.Group>
               
               </Form>
               <Form className="SecUpdateForm">
               <Form.Group>
               <Form.Label className="SecUpdateLabel"><b>Aspect to be changed</b></Form.Label>
               <Form.Control type="text" name="toBeChanged" onChange={this.onChange} placeholder="e.g. date (please use lowercase)"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="SecUpdateLabel"><b>New value</b></Form.Label>
               <Form.Control type="text" name="newValue" onChange={this.onChange} placeholder="e.g. 11:30 a.m. - 12:30 a.m."/>
               </Form.Group>
               <Button variant="danger" onClick={this.onUpdate} className="UpdateButton">Update Appointment</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default Update