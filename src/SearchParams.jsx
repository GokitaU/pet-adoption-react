import React from 'preact-compat';
import SearchBox from './SearchBox.jsx';
import { navigate } from 'preact-router';

class SearchParams extends React.Component {
  handleSearchSubmit() {
    navigate('/');
  }

  render() {
    return (
      <div className="search-route">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default SearchParams;
