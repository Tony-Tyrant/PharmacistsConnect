import React, { useEffect } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import pinIcon from '../images/pin.png';

import { useLang } from "../Contexts/LangContext";
import { InfoWindow } from '@react-google-maps/api';
import { useInfo } from "../Contexts/InfoContext";

const containerStyle = {
    width: '100%',
    height: '100%'
};
const InfoWindowTitle = styled.p`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
`;
const InfoWindowBody = styled.p`
    font-size: 14px;
    color: #607D8B;
    margin-bottom: 8px;
`;

const Map = ({ stores }) => {
    const [lang] = useLang();
    const [infoLocation, setInfoLocation] = useInfo(); // {Latitude, Longtitude, Name?, Address?, Phone?}
    const storeName = lang === 'zh' ? infoLocation?.Name_zh : lang === 'en' ? infoLocation?.Name_en : '';
    const storeAddress = lang === 'zh' ? infoLocation?.Address_zh : lang === 'en' ? infoLocation?.Address_en : '';

        return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_APIKEY}
        >
            <GoogleMap
                zoom={infoLocation ? 16 : 11}
                center={infoLocation ? { lat: infoLocation.Latitude, lng: infoLocation.Longtitude } : { lat: 22.302711, lng: 114.177216 }}
                onClick={() => setInfoLocation(null)}
                mapContainerStyle={containerStyle}>
                {
                    stores.map((e, i) => {
                        return <MarkerItem key={i}
                            store={e}
                            setInfoLocation={setInfoLocation}
                        />
                    })
                }
                {
                    (storeName || storeAddress) &&
                    <InfoWindow
                        position={{ lat: infoLocation.Latitude, lng: infoLocation.Longtitude }}
                        onCloseClick={null}
                    >
                        <>
                            <InfoWindowTitle>{storeName}</InfoWindowTitle>
                            <InfoWindowBody>{storeAddress}</InfoWindowBody>
                            <InfoWindowBody>{infoLocation.Phone}</InfoWindowBody>
                        </>
                    </InfoWindow>
                }
            </GoogleMap>
        </LoadScript>
    );
}

const MarkerItem = ({ store, setInfoLocation }) => {
    const lng = store.Longtitude;
    const lat = store.Latitude;
    return <Marker
        position={{ lat, lng }}
        icon={pinIcon}
        onClick={() => setInfoLocation(store)}
    />;
}

export default Map;

// export default compose(
//     withProps({
//         googleMapURL:
//             "https://maps.googleapis.com/maps/api/js?key=AIzaSyCG8qbqqbfG08pAv7s7mZ0Cia_PwHXnb24&v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ flex: 2 }} />,
//         mapElement: <div style={{ height: `100%` }} />
//     }),
//     withStateHandlers(() => ({
//         isOpen: false,
//     }), {
//         onToggleOpen: ({ isOpen }) => () => ({
//             isOpen: !isOpen,
//         })
//     }),
//     withScriptjs,
//     withGoogleMap
// )(Map);