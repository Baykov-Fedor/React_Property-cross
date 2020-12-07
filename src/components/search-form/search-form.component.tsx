import React from "react";

import "./search-form.styles.scss";

function SearchForm(props) {
  let countries = {
    Australia: "https://api.nestoria.com.au",
    Brasil: "https://api.nestoria.com.br",
    Deutschland: "https://api.nestoria.de",
    España: "https://api.nestoria.es",
    France: "https://api.nestoria.fr",
    India: "https://api.nestoria.in",
    Italia: "https://api.nestoria.it",
    Mexico: "https://api.nestoria.mx",
    UK: "https://api.nestoria.co.uk",
  };
  return (
    <div className="search-form">
      <form name="searchForm">
        <label htmlFor="selectCountry">Select Country:</label>
        <select id="selectCountry">
          {Object.keys(countries).map((item, idx) => (
            <option key={idx} value={idx}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Type in place, post code, tube station, etc."
        ></input>
      </form>
    </div>
  );
}

export default SearchForm;
