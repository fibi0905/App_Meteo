import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonSpinner, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Forecast.css'
import IconRain from '../../asset/Icons/Rain.svg';
import IconSun from '../../asset/Icons/Sun.svg';
import {  isBrowser } from 'react-device-detect';






type Props = {
    time: any,
    precipitation:any,
    temperature:any, 
}

class Forecast extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }
 

    render() {
        return(
            <IonCard className={isBrowser ? 'ContentForecasts' : 'ContentForecasts_Mobile'}>
                <IonCardHeader className='HeaderContentForecasts'>
                    <IonCardTitle>{this.props.time}:00</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className='CardContentForecasts'>
                    <div>
                        <IonItem lines='none' >
                            <IonLabel>
                                {(this.props.precipitation) == "0" ?
                                    "Precipitazioni: Assenti"
                                    :
                                    "Precipitazioni: " + this.props.precipitation + "mm"

                                }
                            </IonLabel>
                        </IonItem>
                        <IonItem lines='none'>
                            <IonLabel >Temperatura: {this.props.temperature}°C</IonLabel>
                        </IonItem>
                    </div>
                    <div>
                        <IonIcon
                            icon={(this.props.precipitation) == "0" ?
                                IconSun
                                :
                                IconRain

                            }
                            className='IconForecasts'
                        ></IonIcon>
                    </div>

                </IonCardContent>
            </IonCard>
        );
    }
}

export default (Forecast);