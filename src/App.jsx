import React from 'react';
import ReactDOM from 'react-dom';
import Pet from './Pet';

class App extends React.Component {
  handleTitleClick() {
    alert('you clicked the title');
  }

  render() {
    return React.createElement('div', { id: 'root' }, [
      React.createElement('h1', { onClick: this.handleTitleClick }, 'Adopt Me'),
      React.createElement(Pet, {
        name: 'Luna',
        animal: 'Dog',
        breed: 'havenese'
      }),
      React.createElement(Pet, {
        name: 'Pepper',
        animal: 'Bird',
        breed: 'cockatiel'
      }),
      React.createElement(Pet, {
        name: 'Doink',
        animal: 'Cat',
        breed: 'mixed'
      })
    ]);
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
