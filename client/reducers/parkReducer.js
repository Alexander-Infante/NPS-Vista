import * as types from '../constants/actionTypes.js';
import { bindActionCreators } from 'redux';
import thunk from 'redux-thunk'
import { connect } from 'react-redux';

const initialState = {
  // State for all Markers
  toggle: false,
  parksList: [],
  // State for Individual City
  showPark: false,
  fullName: '',
  description: '',
  weather: '',
  images: '',
  // Mouse Over for Info Window
  showingInfoWindow: false,
}

const parkReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.TOGGLE:
      let toggle = !state.toggle;

      return {
        ...state,
        toggle
      };

    // Display Markers in Map ---------------------------------
    case types.MARKER:

      const markerData = action.payload;

      const parksList = [];

      for (let element of markerData) {
        const markerState = {
          name: element.name,
          code: element.code,
          position: {
            lat: element.latitude,
            long: element.longitude,
          },
        }
        parksList.push(markerState);
      }


      return {
        ...state,
        parksList
      }

    // OnClick for Park Info Below -------------------------

    // get data from fetch request to manipulate our state
    // also toggle?
    case types.PARKINFO:
      const parkData = action.payload
      const fullName = parkData.fullName;
      const description = parkData.description;
      const weather = parkData.weather;
      const images = parkData.images;
      let showPark = true;

      return {
        ...state,
        fullName,
        description,
        weather,
        images,
        showPark
      }
    // Mouse Events ---------------------------------------
    case types.MOUSE_OVER:
      console.log('you have found the mouseOver reducer')

      return {
        ...state,
        showingInfoWindow: true,
      }

    case types.MOUSE_EXIT:
      console.log('you have found the mouseExit reducer')

      return {
        ...state,
        showingInfoWindow: false,
      }

    // Default Case -----------------------------------------
    default:
      return state
  }

}



export default parkReducer;