import React , {useState} from 'react';
import RealTimeGeoLocation from './RealTimeGeoLocation';
import ErrorPrompt from './ErrorRePrompt';

const StartPage = () => {
    const [locationFound, setLocationFound] = useState(false)
    return(
        (locationFound == true)? <RealTimeGeoLocation setLocationFound = {setLocationFound}/> 
        : <ErrorPrompt setLocationFound = {setLocationFound}/>
    );
}

export default StartPage;
