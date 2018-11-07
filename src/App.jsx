import React from 'react';
import { Router } from '@reach/router';
import pf from 'petfinder-client';
import Results from './Results.jsx';
import Details from './Details';
import SearchParams from './SearchParams.jsx';
// import Loadable from 'react-loadable';
import { Provider } from './SearchContext.jsx';
import NavBar from './NavBar.jsx';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// //Define loadable components for code-splitting
// //TODO: Refactor as higher order component
// const LoadableDetails = Loadable({
//   loader: () => import('./Details'),
//   loading() {
//     return <h1>loading split out code</h1>;
//   }
// });

// const LoadableResults = Loadable({
//   loader: () => import('./Results'),
//   loading() {
//     return <h1>loading split out code</h1>;
//   }
// });

// const LoadableSearchParams = Loadable({
//   loader: () => import('./SearchParams'),
//   loading() {
//     return <h1>loading split out code</h1>;
//   }
// });

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
            {/* <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" /> */}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
