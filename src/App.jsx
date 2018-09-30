import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';

class App extends React.Component {
  handleTitleClick() {
    alert('you clicked the title');
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
