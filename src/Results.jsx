import React from 'react';
import pf from 'petfinder-client';
import Pet from './Pet.jsx';

//This is a bad practices since when we bundle someone could see the key/secrets.
// For the purpose of learning, this is an acceptable risk.
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: 'full', location: 'Seattle, WA' })
      .then(data => {
        let pets;

        //check the data to appropriately shape it since the API is xml and a bit wonky
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        //es6 allows to use just name of var if var and value are same name.
        //Same as pets: pets
        this.setState({
          pets
        });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ');
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              breed={breed}
              name={pet.name}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
