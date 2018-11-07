import React from 'react';
import pf, { Pet as PetType } from 'petfinder-client';
import { RouteComponentType, RouteComponentProps } from '@reach/router';
import { Consumer } from './SearchContext';
import Pet from './Pet';
import SearchBox from './SearchBox';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error('no API keys found!');
}

interface Props {
  searchParams: {
    location: string;
    animal: string;
    breed: string;
  };
}

interface State {
  pets: PetType[];
}

// This is a bad practices since when we bundle someone could see the key/secrets.
// For the purpose of learning, this is an acceptable risk.
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  public componentDidMount() {
    this.search();
  }

  public search = () => {
    petfinder.pet
      .find({
        output: 'full',
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets: PetType[];

        // check the data to appropriately shape it since the API is xml and a bit wonky
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        // es6 allows to use just name of var if var and value are same name.
        // Same as pets: pets
        this.setState({
          pets
        });
      });
  };

  public render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
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
              id={pet.id}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props: RouteComponentProps) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
