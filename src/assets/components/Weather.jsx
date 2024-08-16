import { useEffect, useState } from 'react';

const Weather = () => {
    // Create a state to store the weather
    const [data, setData] = useState(null);

    // Fetch the weather data from the API
    const getWeatherData = async () => {
        fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=London')
            .then(response => response.json())
            .then(data => {
                // Handle the weather data here
                setData(data);
                console.log(data);
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
    }

    // useEffect runs after the component has rendered and the DOM has been updated.
    useEffect(() => {
        getWeatherData();
    }, []);

    return (
        <div>
            <h1>Weather Component</h1>
            {/* Add your weather-related content here */}
            {data && (
                <>
                    <p>Temperature: {data.current.temp_c}°C</p>
                    <p>Condition: {data.current.condition.text}</p>
                    <p>Wind: {data.current.wind_kph} km/h</p>
                </>
            )}
        </div>
    );
};

export default Weather;