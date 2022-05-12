
import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css'

// const [movie, setMovie] = useState([]);
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList:[],
      theatreList:[],
      ShowList:[]
      // value:0,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleMovie = this.handleMovie.bind(this);
    // this.handleMovie = this.handleMovie.bind(this);
  }

  handleChange(event) {
    // this.setState({value: event.target.value});
    let seat=event.target.value;
    localStorage.setItem('seats_wanted',seat)   
  }


  handleMovie(event) {
    // this.setState({value: event.target.value});
    // this.setState({key: event.target.key});
    
    let movie=JSON.parse(event.target.value);
 
    let moviename=movie.name;
    let movieid = movie.id;
  
  
    localStorage.setItem('movie_name',moviename)
    localStorage.setItem('movie_id',movieid)   
  }

  handleTheatre(event) {
    // this.setState({value: event.target.value});
    // this.setState({key: event.target.key});
    
    let theatre=JSON.parse(event.target.value);
 
    let theatrename=theatre.tname;
    let theatreid = theatre.id;
  
  
    localStorage.setItem('theatre_name',theatrename)
    localStorage.setItem('theatre_id',theatreid)   
  }

  handleTime(event) {
    // this.setState({value: event.target.value});
    // this.setState({key: event.target.key});
    
    let show=JSON.parse(event.target.value);
 
    let showtime=show.time;
    let showid = show.id;
  
  
    localStorage.setItem('show_time',showtime)
    localStorage.setItem('show_id',showid)   
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
   const res1= await fetch("http://127.0.0.1:5000/movies");
   const data=await res1.json();
   const res2=await fetch("http://127.0.0.1:5000/theatre");
   const data1=await res2.json();
   const res3=await fetch("http://127.0.0.1:5000/show");
   const data3=await res3.json();
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
        console.log(data1);
        console.log(data3);
        this.setState({
            moviesList: data.movies,
            theatreList: data1.theatre,
            ShowList:data3.show
        });
        console.log(this.state.moviesList)
        console.log(this.state.theatreList)
        console.log(this.state.ShowList)
        
        // list(map(lambda z: list(filter(None,z)),moviesList.name))
        // localStorage.setItem("movie_name",JSON.stringify(object))
    // });
}


render () {
  // const  moviesList  = this.state;
  //console.log(this.state.moviesList)
      let movies = this.state.moviesList;
      

        let optionItems = movies.map((movie) =>
        
              
                <option className='option' value={JSON.stringify(movie)}>{movie.name}</option>
            );

            let theatre = this.state.theatreList;
      

            let optiontheatre = theatre.map((theatres) =>
            
                  
                    <option value={JSON.stringify(theatres)}>{theatres.tname}</option>
                );

                let show = this.state.ShowList;
      

                let optionshow = show.map((shows) =>
                
                      
                        <option className='option' value={JSON.stringify(shows)}>{shows.time}</option>
                    );
            

        return (
      <>
          {/* <Main state={this.state} /> */}
          <div class="container">
          <div className='book'>
            <div>
            <p className='font'>Pick a movie:
              <select onChange={this.handleMovie} >
                {optionItems}
                {/* {optionItems.map(movie => <div>{movie.name}</div>)} */} 
              </select>
              </p>

              <p className='font'>Pick a Theatre:
              <select onChange={this.handleTheatre} >
                {optiontheatre}
                {/* {optionItems.map(movie => <div>{movie.name}</div>)} */} 
              </select>
              </p>


              <p className='font'>Pick a Time:
              <select onChange={this.handleTime} >
                {optionshow}
                {/* {optionItems.map(movie => <div>{movie.name}</div>)} */} 
              </select>
              </p>
            </div>
    
         

            <form className='form_class'>No of Seats needed:
              <label>

                <input type="number" max={10} min={0} onChange={this.handleChange}  className="arrow"/>

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
          </div>
      </>
      );
    }
  }       
    
  export default Main;
    