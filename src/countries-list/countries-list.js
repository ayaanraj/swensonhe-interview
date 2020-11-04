import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

@inject(HttpClient)
export class CountriesList {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.allCountriesList = null;
    this.selectedCountry = null;
    this.previousIndex = 0;
  }

  // Aurelia life cycle method.
  bind() {
    this.getCountriesList();
  }

  getCountriesList() {
    this.httpClient.get("https://restcountries.eu/rest/v2/all").then((data) => {
      this.allCountriesList = JSON.parse(data.response);
      setTimeout(() => {
        this.countryClicked(this.allCountriesList[0], 0);
      }, 100);
    });
  }

  countryClicked(country, index) {
    this.selectedCountry = country;
    document.getElementById(this.previousIndex).classList.remove("active");
    document.getElementById(index).classList.add("active");
    this.previousIndex = index;
  }
}
