import React, { useState } from "react";
import * as countries from "./regions.data.json";
// import { CallbackRegistry } from "./request.utils.js";

import "./search-form.styles.scss";

let CallbackRegistry = {} as any;

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
    const answer: any = scriptRequest(
      url,
      (data) => data,
      (url: string) => alert("Ошибка при запросе " + url)
    );
    console.log(answer);
    // const response: any = await fetch(url, { mode: "no-cors" });
    // if (response.ok) {
    //   const json: JSON = await response.json();
    //   console.log(json);
    // } else {
    //   alert(`Ошибка HTTP: ${response.status}`);
    // }
  };

  const scriptRequest = (
    url: string,
    onSuccess: (data: any) => any,
    onError: (url: string) => any
  ) => {
    const script: HTMLScriptElement = document.createElement("script");
    let scriptOk: boolean = false;
    url += "&callback=CallbackRegistry.onDataLoad";

    CallbackRegistry.onDataLoad = (data: any) => {
      scriptOk = true;
      delete CallbackRegistry.onDataLoad;
      onSuccess(data);
    };

    function checkCallback() {
      if (scriptOk) return;
      delete CallbackRegistry.onDataLoad;
      onError(url);
    }

    script.onload = script.onerror = checkCallback;
    script.src = url;
    document.head.appendChild(script);
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
