import fetchJsonp from "fetch-jsonp";

export default function searchEstate(region: string, place_name: string) {
  const url: string = `${region}/api?action=search_listings&encoding=json&pretty=1${
    place_name ? `&place_name=${place_name}` : ""
  }`;
  return fetchJsonp(url)
    .then(function (response) {
      return response.json();
    })
    .catch(function (ex) {
      console.log("parsing failed", ex);
    });
}
