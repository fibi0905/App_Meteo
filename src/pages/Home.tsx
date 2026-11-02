import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonSpinner, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import HomeHeaderIconMeteo from '../asset/Icons/Meteo.svg';
import {isBrowser } from 'react-device-detect';
import { Geolocation } from '@capacitor/geolocation';
import Forecast from './components/Forecast';





type Props = {
  cosnt: any,
}

type State = {
  openWeatherForecasts: boolean,
  startingState: boolean,

  weatherForecastsNextDay: boolean,
  weatherForecastsPresentDay: boolean,

  loding: boolean;

  selectPlaceMode: boolean,
  selectPlace: boolean,

  notLocality: boolean,

  classOpactyND: {
    opacity: string,
  },
  classOpactyPD: {
    opacity: string,
  },

  weatherData: {
    precipitation: string[];
    temperature: string[];
  },

}

class Home extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      openWeatherForecasts: false, //false
      startingState: true, //true

      weatherForecastsNextDay: false, //false
      weatherForecastsPresentDay: true,//true

      loding: false, //false

      selectPlaceMode: false,//false
      selectPlace: true,//true


      notLocality: false,//false

      classOpactyND: {
        opacity: "0.5",
      },

      classOpactyPD: {
        opacity: "1",
      },

      weatherData: {
        precipitation: ['-1'],
        temperature: ['4444'],
      },


    }
  }


  placeRef = React.createRef<HTMLIonInputElement>()
  dayRef = React.createRef<HTMLIonTitleElement>()




  async letMeteo(automatic: boolean) {  
    let lat, lon;
    let place: string | number | null | undefined;

    if (automatic) {

      try {
        if (isBrowser) {
          
          this.setState({
            startingState: false,
            loding: true
          });

          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          lat = position.coords.latitude;
          lon = position.coords.longitude;
          console.log("\tNot mobile\nlongitudine: " + lon + "\nlatitudine: " + lat);
        }
        else {
          this.setState({
            startingState: false,
            loding: true
          });

          const coordinates = await Geolocation.getCurrentPosition();

          lat = coordinates.coords.latitude;
          lon = coordinates.coords.longitude;

          console.log("\tmobile\nlongitudine: " + lon + "\nlatitudine: " + lat);
        }
        const response = await fetch('https://geocode.maps.co/reverse?lat=' + lat + '&lon=' + lon + '&api_key=6590050dd9fd0738879881krs798a25');
        const data = await response.json();
        place = data.address.suburb;
        console.log(place);
      } catch (error) {
        console.log('Errore:', error);
      }



    }
    else {
      if (this.placeRef.current) {
        place = this.placeRef.current.value;
        if (place != '') {
          console.log(place);
          this.setState({
            startingState: false,
            loding: true
          });
        }
        else {
          console.log("località non passata ");
          this.setState({ notLocality: true });
          return;
        }
      }

      try {

        const response = await fetch('https://geocode.maps.co/search?q=' + place + '/italy&api_key=6590050dd9fd0738879881krs798a25');
        const data = await response.json();
        lat = data[0].lat;
        lon = data[0].lon
        console.log("longitudine: " + lon + "\nlatitudine: " + lat);

      }
      catch (error) {
        console.log('Errore:', error);
      }


    }

    let giorno, mese, anno;

    if (this.state.weatherForecastsNextDay) {
      const oggi = new Date();
      const domani = new Date(oggi.getTime() + 24 * 60 * 60 * 1000);
      giorno = domani.getDate().toString().padStart(2, "0");
      mese = (domani.getMonth() + 1).toString().padStart(2, "0");
      anno = domani.getFullYear();

    } 
    else {
      const oggi = new Date();
      giorno = oggi.getDate().toString().padStart(2, "0");
      mese = (oggi.getMonth() + 1).toString().padStart(2, "0");
      anno = oggi.getFullYear();
    }

    console.log(`${anno}-${mese}-${giorno}`);

    const URL = 'https://api.open-meteo.com/v1/gfs?latitude=' + lat + '&longitude=' + lon + '&hourly=temperature_2m,precipitation&start_date=' + `${anno}-${mese}-${giorno}` + '&end_date=' + `${anno}-${mese}-${giorno}`

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        // Estrae l'array delle precipitazioni dai dati
        const arrPrecipitation = data.hourly.precipitation;
        const arrTemperature = data.hourly.temperature_2m
        
        const rangeTemperature = arrTemperature.slice(7,19);
        const rangePrecipitation = arrPrecipitation.slice(7,19);

        this.setState({
          weatherData: {
            precipitation: rangePrecipitation,
            temperature: rangeTemperature,
          },
        })


        if (this.dayRef.current) {
          if (this.state.weatherForecastsNextDay) {
            this.dayRef.current.innerHTML = "Domani a " + place;
          }
          else {
            this.dayRef.current.innerHTML = "Oggi a " + place;
          }
        }
        else {
          console.log("error");
        }


      })
      .catch(
        error => console.log('Errore:', error)
        //Creare pagina d'erorre
      );

    this.setState({
      loding: false,
      openWeatherForecasts: true,
    });

  }

  render() {
    return (
      <IonPage>
        <IonHeader mode='ios' className='HomeHeader'>
          <IonIcon className='HomeHeader-divIcon' icon={HomeHeaderIconMeteo}></IonIcon>
          <IonTitle className='HomeHeader-divTitle'>Meteo</IonTitle>
        </IonHeader>

        {/* previsini meteo generate */}
        {this.state.openWeatherForecasts &&
          <>
            <IonContent className='HomeContent' fullscreen={true} scrollY={false}>
              <IonGrid style={{ "height": "106%" }}>
                <IonRow className='HomeContent-openWeatherForecasts-RowWeatherForecasts'>

                <IonContent className='HomeContent-openWeatherForecasts-Card' >

                  <IonTitle ref={this.dayRef} className='HomeContent-openWeatherForecasts-CardTitle'></IonTitle>


                  {this.state.weatherData.precipitation.map((precipitation,index)=>(
                    <Forecast
                      key={index}
                      time={index+7}
                      precipitation={precipitation}
                      temperature={this.state.weatherData.temperature[index]}
                    />
                  ))}
                                      

                </IonContent>

                </IonRow>
              </IonGrid>
            </IonContent>
            <footer style={{ "height": "6%" }}>
              <div className='HomeFooter-startingState-div'>
                <IonButton shape='round' className='HomeContent-openWeatherForecasts-button'
                  onClick={() => {
                    this.setState({ openWeatherForecasts: false, startingState: true });
                  }}
                >
                  <IonLabel className='HomeContent-buttonLabel'>chiudi</IonLabel>
                </IonButton>
              </div>

            </footer>

          </>
        }
        {/* infinity reload */}
        {this.state.loding &&
          <IonContent className='HomeContent' fullscreen={true} scrollY={false}>
            <div className='Homeloading-div'>
              <IonSpinner className='Homeloading-spinner' ></IonSpinner>
            </div>
          </IonContent>
        }

        {/* prima di generazione */}
        {this.state.startingState &&
          <>
            <IonContent>
              <IonGrid style={{ height: "100%" }}>

                <IonRow className='HomeGrid-startingState-Row'>
                  <IonCard className='HomeGrid-startingState-Card'>
                    <IonCardHeader>
                      <IonCardTitle className='HomeGrid-startingState-CardTitle'>Scegliere il giorno: </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div
                        style={this.state.classOpactyPD}
                        className='HomeGrid-startingState-div'
                        onClick={() => {
                          this.setState({
                            weatherForecastsNextDay: false,
                            weatherForecastsPresentDay: true,
                            classOpactyND: {
                              opacity: "0.5",
                            },
                            classOpactyPD: {
                              opacity: "1",
                            },
                          });
                        }}
                      >
                        <IonLabel className='HomeGrid-startingState-Label'>Oggi</IonLabel>
                        <IonCheckbox
                          style={this.state.classOpactyPD}
                          mode='ios'
                          checked={this.state.weatherForecastsPresentDay}
                          disabled={this.state.weatherForecastsPresentDay}
                        ></IonCheckbox>
                      </div>
                      <div
                        style={this.state.classOpactyND}

                        className='HomeGrid-startingState-div ND'
                        onClick={() => {

                          this.setState({
                            weatherForecastsPresentDay: false,
                            weatherForecastsNextDay: true,
                            classOpactyPD: {
                              opacity: "0.5",
                            },
                            classOpactyND: {
                              opacity: "1",
                            },
                          });
                        }}
                      >
                        <IonLabel className='HomeGrid-startingState-Label'>Domani</IonLabel>
                        <IonCheckbox
                          style={this.state.classOpactyND}
                          mode='ios'
                          checked={this.state.weatherForecastsNextDay}
                          disabled={this.state.weatherForecastsNextDay}

                        ></IonCheckbox>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonRow>


                <IonRow className='HomeGrid-startingState-Row'>
                  <IonCard className='HomeGrid-startingState-Card' id='CardPlace'>
                    <IonCardHeader>
                      <IonCardTitle className='HomeGrid-startingState-CardTitle'>Scegliere il luogo: </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div

                        className='HomeGrid-startingState-div'
                        onClick={() => {

                          this.setState({
                            selectPlaceMode: !this.state.selectPlaceMode,
                            selectPlace: !this.state.selectPlace,
                          });

                        }}
                      >
                        <IonLabel className='HomeGrid-startingState-Label'>Automatico</IonLabel>
                        <IonCheckbox
                          mode='ios'
                          checked={this.state.selectPlaceMode}
                        ></IonCheckbox>
                      </div>
                      <div
                        onClick={() => {
                          this.setState({ notLocality: false });

                        }}
                        className={
                          `HomeGrid-startingState-divDrop 
                          ${this.state.selectPlace ? 'open' : ''} 
                            ${this.state.notLocality ? 'helptxt' : ''}`
                        }

                      >

                        <IonLabel style={{ paddingRight: "20px" }} className='HomeGrid-startingState-Label'>Località: </IonLabel>
                        <IonInput
                          helperText='Località non inserita!!'
                          className='HomeGrid-startingState-Input'
                          ref={this.placeRef}
                          mode='ios'
                          clearOnEdit={true}
                        >
                        </IonInput >

                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonRow>


              </IonGrid>
            </IonContent>

            <footer style={{ "height": "6%" }}>
              <div className='HomeFooter-startingState-div'>
                <IonButton shape='round' className='HomeFooter-startingState-divButton'
                  onClick={() => {
                    this.letMeteo(this.state.selectPlaceMode);
                  }}
                >
                  <IonLabel className='HomeContent-buttonLabel'>Genera Previsioni</IonLabel>
                </IonButton>
              </div>
            </footer>

          </>
        }
      </IonPage>
    );
  }

}


export default (Home);
