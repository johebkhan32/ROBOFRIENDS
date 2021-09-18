import React, {Component} from 'react';
import CardList from '../src/components/CardList';
import SearchBox from '../src/components/SearchBox';
import Scroll from '../src/components/Scroll';
import ErrorBoundary from '../src/components/ErrorBoundary';
import '../src/containers/App.css';


class App extends Component {
    constructor() {
        super()
        this.state = { 
            robots : [],
            searchfield : ''

        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {this.setState({robots : users})});
    }

    onSearchChange = (event) => {
        this.setState({searchfield : event.target.value })
     
     }

    
    render() { 
      
     const {robots, searchfield} = this.state
     const filteredRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchfield.toLowerCase());
     })

        return !robots.length ?
         <h1>Loading</h1>:
        
     (
        <div className = 'tc' >
        <h1 className = 'f1'>RoboFriends</h1>
            <SearchBox searchChange = {this.onSearchChange}/>
            <Scroll>
            <ErrorBoundary>
                <CardList robots = {filteredRobots}/>
            </ErrorBoundary>
            </Scroll>
        </div>
       );
      }
     }

export default App;
