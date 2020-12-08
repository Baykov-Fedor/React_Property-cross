import React, { useState } from "react";
import * as countries from "./regions.data.json";

import "./search-form.styles.scss";

function SearchForm() {
  let countriesNew: { [key: string]: string } = countries;
  let [searchInput, setSearchInput] = useState("");
  let [region, setRegion] = useState("");

  const handleChange = (evt: any) => {
    const value: string = evt.target.value;
    const name: string = evt.target.name;
    switch (name) {
      case "searchInput":
        setSearchInput(value);
      case "region":
        setRegion(countriesNew[value]);
      default:
        return;
    }
  };

  let submitForm = async (evt: any) => {
    evt.preventDefault();
    let url: string = `${region}/api?action=echo&encoding=json&place_name=${searchInput}`;
    let response: any = await fetch(url);
    if (response.ok) {
      let json: JSON = await response.json();
      console.log(json);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  };

  return (
    <form className="search-form" onSubmit={submitForm}>
      <label htmlFor="selectCountry">Select Country:</label>
      <select id="selectCountry" onChange={handleChange} name="region">
        {Object.keys(countries).map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Type in place, post code, tube station, etc."
        onChange={handleChange}
        value={searchInput}
        name="searchInput"
      ></input>
      <input type="submit"></input>
    </form>
  );
}

export default SearchForm;
