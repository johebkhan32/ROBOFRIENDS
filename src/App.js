import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../src/components/CardList';
import SearchBox from '../src/components/SearchBox';
import Scroll from '../src/components/Scroll';
import ErrorBoundary from '../src/components/ErrorBoundary';
import '../src/containers/App.css';

import { setSearchField, requestRobots } from '../src/actions';

const mapStateToProps = state => {
    return {
        searchField : state.searchRobots.searchField,
        robots : state.requestRobots.robots,
        isPending : state.requestRobots.isPending,
        error : state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return{
        onSearchChange : (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots : () => dispatch(requestRobots())
   }
}


class App extends Component {
     componentDidMount() {  
     this.props.onRequestRobots();
    }

    
    render() { 
     const { searchField, onSearchChange, robots, isPending} = this.props
     const filteredRobots = robots.filter(robots =>{
        return robots.name.toLowerCase().includes(searchField.toLowerCase());
     })

        return isPending ?
         <h1>Loading</h1>:
        
     (
        <div className = 'tc' >
        <h1 className = 'f1'>RoboFriends</h1>
            <SearchBox searchChange = {onSearchChange}/>
            <Scroll>
            <ErrorBoundary>
                <CardList robots = {filteredRobots}/>
            </ErrorBoundary>
            </Scroll>
        </div>
       );
      }
     }

export default connect(mapStateToProps, mapDispatchToProps)(App);
