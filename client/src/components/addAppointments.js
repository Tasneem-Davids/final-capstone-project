import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addAppointments.css';
import add from '../images/addImage.png';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import cookies from 'js-cookie';

class Add extends Component{
    constructor(props){
        super(props)
        //Below are all the states I used for this component
        this.state={
            name:'',
            reason:'',
            duration:'',
            date:'',
            day:'',
            _id:[],
            cookie:''
        }

        this.onChange = this.onChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }

    onChange=(e)=>{//When the user adds values to the input fields
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAdd = () => {
        const {name, reason, duration, date, day, _id} = this.state//Values from state

        axios.post('/appointments/add', {name, reason, duration, date, day, _id})//Making a post request to add appointments
        .then((res) => alert(res.data.Message))
        .catch((err) => alert('Sorry, an error occured when adding your new appointment'))
    }

    componentDidMount = async() => {//Fetching the data from storage when the component mounts and setting the states of the user id and cookie
        const user = JSON.parse(window.localStorage.getItem('user'))
        const token = cookies.get('token')

        await this.setState({
            _id: user
        })

        await this.setState({
            cookie: token
        })
    }

    render(){
        return(
           <div className="content-wrapper">
               <img src={add}/>
               <div className="text-wrapper">
               <Nav className="AddNav">
               <Nav.Link href="/appointments" className="AddNavLink"><b>Appointment Book</b></Nav.Link>
               </Nav>
                <h1 className="AddHeading">Hey doc, you can add your appointments here, and view them in your "appointment book"</h1>
               <Form className="AddForm">
               <Form.Group>
               <Form.Label className="AddLabel"><b>Name of patient</b></Form.Label>
               <Form.Control type="text" name="name" onChange={this.onChange} placeholder="Charles Smith"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Reason for appointment</b></Form.Label>
               <Form.Control type="text" name="reason" onChange={this.onChange} placeholder="Flu symptoms"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Duration of appointment</b></Form.Label>
               <Form.Control type="text" name="duration" onChange={this.onChange} placeholder="10:30 a.m. - 11:30 a.m."/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Date of appointment</b></Form.Label>
               <Form.Control type="text" name="date" onChange={this.onChange} placeholder="5 Feb 2020"/>
               </Form.Group>

               <Form.Group>
               <Form.Label className="AddLabel"><b>Day of appointment</b></Form.Label>
               <Form.Control type="text" name="day" onChange={this.onChange} placeholder="Friday"/>
               </Form.Group>
               <Button variant="danger" onClick={this.onAdd} className="AddButton">Add Appointment</Button>
               </Form>
               </div>
           </div> 
        )
    }
}

export default Add