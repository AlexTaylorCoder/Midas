import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { mapUsers } from "../api";
import Markercomp from "./markercomp";

const mapKey = process.env.REACT_APP_MAPS_KEY

const options = {
    clickableIcons: false,
    mapId: '63dee5ebd2923e57',
    disableDefaultUI: true,
  };

const containerStyle = {
    width: '1000px',
    height: '1000px'
  };

function Mapcontainer({coords}) {

    const {isLoading,data} = useQuery("map_users",mapUsers)


    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: mapKey,
      })


    // const onLoad = useCallback((map) => (mapRef.current = map), []);


    if (isLoading) {
        return (
            <span>Loading...</span>
        )
    }
    const markerList = data.map(user=><Markercomp key={user.id} user={user}/>)
    return isLoaded ? (
        <div id = "map-container">
            <GoogleMap
                options={options}
                mapContainerStyle={containerStyle}
                center={coords}
                zoom={10}
                // onLoad={onLoad}
                // onUnmount={onUnmount}
            >
            {markerList}
            </GoogleMap>
        </div>
    ) : <>Loading...</>
}

export default Mapcontainer