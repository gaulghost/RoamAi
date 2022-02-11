import React , {useState} from 'react';
import FetchGeo from './FetchGeoLocation';
import ErrorPrompt from './ErrorRePrompt';

const StartPage = () => {
    const [locationFound, setLocationFound] = useState(false)
    return(
        (locationFound == true)? <FetchGeo setLocationFound = {setLocationFound}/> 
        : <ErrorPrompt setLocationFound = {setLocationFound}/>
    );
}

export default StartPage;
