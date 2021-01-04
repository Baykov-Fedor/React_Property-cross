import React, { useState } from 'react'
import searchEstate from './search.utils'
import './search-form.styles.scss'

const countries: { [keys: string]: string } = {
  Australia: 'https://api.nestoria.com.au',
  Brasil: 'https://api.nestoria.com.br',
  Deutschland: 'https://api.nestoria.de',
  España: 'https://api.nestoria.es',
  France: 'https://api.nestoria.fr',
  India: 'https://api.nestoria.in',
  Italia: 'https://api.nestoria.it',
  Mexico: 'https://api.nestoria.mx',
  UK: 'https://api.nestoria.co.uk',
}

function SearchForm() {
  const countriesNew: { [key: string]: string } = countries
  const [searchInput, setSearchInput] = useState('')
  const [region, setRegion] = useState('Australia')
  const [apiResponse, setApiResponse] = useState('')

  const handleSearch = (evt: any) => {
    const { value }: { value: string } = evt.target
    setSearchInput(value)
  }

  const handleRegion = (evt: any) => {
    const { value }: { value: string } = evt.target
    setRegion(value)
  }

  const submitForm = async (evt: any) => {
    evt.preventDefault()
    let regionURL: string = countriesNew[region]
    await searchEstate(regionURL, searchInput).then((data) => setApiResponse(data.response))
    console.log(apiResponse)
  }

  return (
    <form className="search-form" onSubmit={submitForm}>
      <label htmlFor="selectCountry">
        Select Country:
        <select id="selectCountry" onChange={handleRegion} name="region" value={region}>
          {Object.keys(countries).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Type in place, post code, tube station, etc."
        onChange={handleSearch}
        value={searchInput}
        name="searchInput"
      />
      <input type="submit" />
    </form>
  )
}

export default SearchForm
