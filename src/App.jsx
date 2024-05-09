import { useEffect, useState } from "react";
import axios from "axios";
import Weathercard from "./Weathercard";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const generateData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            Key: `dd44e5c19a2a4ebfa48135338240403`,
            q: search,
          },
        }
      );
      const ans = await res.data;
      if (Object.keys(ans).length > 0) {
        setData(ans);
        setResult(true);
      }
      console.log(ans);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="parent">
          <input
            type="text"
            placeholder="Enter city name"
            value={search}
            onChange={handleChange}
          />
          <button onClick={generateData}>Submit</button>
        </div>

        {loading ? <p>Loading data...</p> : ""}
        {result ? (
          <div className="weather-cards">
            <Weathercard
              des={data.current["temp_c"]}
              name="Temperature"
              unit='°C'
            />
            <Weathercard
              des={data.current.humidity}
              name="Humidity"
              unit='%'
            />
            <Weathercard
              des={data.current.condition.text}
              name="Condition"
            />
            <Weathercard
              des={data.current["wind_kph"]}
              name="Wind Speed"
              unit='kph'
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
