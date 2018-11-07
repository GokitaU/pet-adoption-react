import React from 'react';
import { PetMedia, PetPhoto } from 'petfinder-client';

// Defining typescript types
interface Props {
  media: PetMedia;
}

interface State {
  active: number;
  photos: PetPhoto[];
}

class Carousel extends React.Component<Props, State> {
  public state = {
    photos: [] as PetPhoto[],
    active: 0
  };

  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    return { photos };
  }

  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    // ensure the event target is an HTMLElement
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: Number(event.target.dataset.index)
      });
    }
  };

  public render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo: PetPhoto, index) => (
            // Doing this for speed of dev. We should refactor img to be within a button
            // and add click handler to button

            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
