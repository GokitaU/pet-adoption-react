import React from 'react';
import ReactDOM from 'react-dom';
import pf from 'petfinder-client';
import Pet from './Pet.jsx';

//This is a bad practices since when we bundle someone could see the key/secrets.
// For the purpose of learning, this is an acceptable risk.
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  componentDidMount() {
    const promise = petfinder.breed.list({ animal: 'dog' });

    promise.then(console.log, console.error);
  }

  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        <Pet name="Luna" animal="dog" breed="Havenese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
