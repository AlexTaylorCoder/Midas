import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useQuery } from "react-query";
import { mapUsers } from "../api";
import Markercomp from "./markercomp";
import { motion } from "framer-motion/dist/framer-motion";
import { Menu } from "../sidebar/menu";
import Heartloader from "../stylecomponents/heartloader";

const mapKey = process.env.REACT_APP_MAPS_KEY

const options = {
    clickableIcons: false,
    mapId: '63dee5ebd2923e57',
    disableDefaultUI: true,
  };

const containerStyle = {
    width: '100%',
    height: '100vh'
  };

function Mapcontainer({coords}) {

    const {isLoading,data} = useQuery("map_users",mapUsers)


    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: mapKey,
      })


    // const onLoad = useCallback((map) => (mapRef.current = map), []);


    if (isLoading) {
        return (
            <Heartloader/>
        )
    }
    const markerList = data.map(user=><Markercomp key={user.id} user={user}/>)
    return isLoaded ? (
        <>
        <Menu/>
        <motion.div id = "map-container"
        animate={{
            backgroundColor:["#000","#fff"]
        }}
        >
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
        </motion.div>
        </>
    ) : <>Loading...</>
}

export default Mapcontainer