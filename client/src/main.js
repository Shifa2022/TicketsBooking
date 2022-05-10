
import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css'

// const [movie, setMovie] = useState([]);
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList:[],
      // value:0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    let seat=event.target.value;
    localStorage.setItem('seats_wanted',seat)   
  }


  handleMovie(event) {
    this.setState({value: event.target.value});
    
 
    let movie=event.target.value;
    // let moviename=event.target.name;
    // console.error(moviename)
  
    localStorage.setItem('movie_selected',movie)
    // localStorage.setItem('moviename_selected',moviename)

      
  }
  
  // getMovie = async () => {
  //   try{
  //     const res = await fetch("http://127.0.0.1:5000/movies");
  //     const data = await res.json();
  //     setMovie(data.movies);
  //   }catch(error){
  //     console.log(error) 
  //   }
  // };


  async componentDidMount() {
    // const [movie, setMovie] = useState([]);
    // let movies = [];
   const res= await fetch("http://127.0.0.1:5000/movies");
   const data=await res.json();
  //  movies = data.results.map((movie) => {
  //   return movie
// });
    //     .then(response => {
    //         return response.json();
    //     }).then(data => {
    //     movies = data.results.map((movie) => {
    //         return movie
    //     });
        console.log(data);
        this.setState({
            moviesList: data.movies
        });
        console.log(this.state.moviesList)
    // });
}
render () {
  // const  moviesList  = this.state;
  //console.log(this.state.moviesList)
let movies = this.state.moviesList;
        let optionItems = movies.map((movie) =>
                <option value={movie.id} >{movie.name}</option>
            );

        return (
      <>
          {/* <Main state={this.state} /> */}
          <div className='book'>
            <div>
            <p>Pick a movie:
              <select onChange={this.handleMovie}>
                {optionItems}
                {/* {optionItems.map(movie => <div>{movie.name}</div>)} */}

              </select>
              </p>
            </div>

            <form>No of Seats needed:
              <label>

                <input type="number" max={10} min={0} onChange={this.handleChange} />

              </label>
            </form>
            <br></br>
            <br></br>
            <Link
              className='route'
              to={{
                pathname: '/seats',
                state: this.state.value
              }}>
              Next
            </Link>
          </div>
      </>
      );
    }
  }       
    
  export default Main;
    