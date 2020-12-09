import React, { useState } from "react";
import fetchJsonp from "fetch-jsonp";
import * as countries from "./regions.data.json";

import "./search-form.styles.scss";

function SearchForm() {
  const countriesNew: { [key: string]: string } = countries;
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("");

  const handleChange = (evt: any) => {
    const { value, name }: { value: string; name: string } = evt.target;
    switch (name) {
      case "searchInput":
        setSearchInput(value);
        break;
      case "region":
        setRegion(countriesNew[value]);
        break;
      default:
        return;
    }
  };

  const submitForm = async (evt: any) => {
    evt.preventDefault();
    const url: string = `${region}/api?action=search_listings&encoding=json&pretty=1${
      searchInput ? `&place_name=${searchInput}` : ""
    }`;
    fetchJsonp(url, {
      jsonpCallbackFunction: "search_results",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log("parsed json", json);
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });
  };

  return (
    <form className="search-form" onSubmit={submitForm}>
      <label htmlFor="selectCountry">
        Select Country:
        <select id="selectCountry" onChange={handleChange} name="region">
          {Object.keys(countries).map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Type in place, post code, tube station, etc."
        onChange={handleChange}
        value={searchInput}
        name="searchInput"
      />
      <input type="submit" />
    </form>
  );
}

export default SearchForm;
