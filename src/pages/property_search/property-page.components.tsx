import React from "react";
import SearchForm from "../../components/search-form/search-form.component";

class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-page">
        <h1>
          Use the form below to search for houses to buy. You can search by
          place-name, postcode.
        </h1>
        <SearchForm />
      </div>
    );
  }
}

export default SearchPage;
