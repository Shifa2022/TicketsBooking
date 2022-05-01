
import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      value:0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    let seat=event.target.value;
    
    localStorage.setItem('seats_wanted',seat)
    
   
   
  }


  componentDidMount() {
    this.setState({
      movies: [
      
        {id: '01', name: 'RRR'},
        {id: '02', name: 'RED'},
        {id: '03', name: 'LUFFY'},
        {id:'04',name:'AOT'}
      ]
    });
  }

  render () {
    const { movies } = this.state;

    let moviesList = movies.length > 0
    	&& movies.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      <div className='book'>
          <h1>Ticket Booking Platform</h1>
          <p>Pick a movie:
        <select>
          {moviesList}
        </select>
        </p>

        <form>No of Seats needed:
       <label>

          <input type="number" max={10} min={0}  onChange={this.handleChange} />
        
        </label>
        </form>
        <br></br>
        <br></br>
        <Link 
        className='route'
        to={{
               pathname:'/seats',
               state:this.state.value  
                  }} >
          Next
        </Link>
      </div>
    );
  }
}

export default Main;