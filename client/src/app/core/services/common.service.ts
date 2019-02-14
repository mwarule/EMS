import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var require: any;
const countryList = require('../../../assets/json/country.json');
const stateList = require('../../../assets/json/state.json');
const cityList = require('../../../assets/json/city.json');
const skillsList = require('../../../assets/json/skills.json');
const designationsList = require('../../../assets/json/designations.json');

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {
  }

  getSkills() {
    return skillsList;
  }

  getDesignations(){
    return designationsList;
  }

  getCountryById(id) {
    return this._findEntry(countryList, id);
  }

  getStateById(id) {
    return this._findEntry(stateList, id);
  }

  getCityById(id) {
    return this._findEntry(cityList, id);
  }

  getStatesOfCountry(countryId) {
    const states = stateList.filter(function (value, index) {
      return value.country_id === countryId;
    });
    return states.sort(this.compare);
  }

  getCitiesOfState(stateId) {
    const cities = cityList.filter(function (value, index) {
      return value.state_id === stateId;
    });
    return cities.sort(this.compare);
  }

  getAllCountries() {
    return countryList;
  }

  getCountryByName(name) {
    const country = countryList.find(function (value, index) {
      return value.name === name;
    });
    return country;
  }

  getStateByName(name) {
    const state = stateList.find(function (value, index) {
      return value.name === name;
    });
    return state;
  }

  getCityByName(name) {
    const city = cityList.find(function (value, index) {
      return value.name === name;
    });
    return city;
  }


  _findEntry(source, id) {
    if (!isNaN(id) && source != null) {
      const idx = source.findIndex((c, i) => c.id === id);
      return (idx !== -1) ? source[idx] : '';
    } else {
      return '';
    }
  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}
