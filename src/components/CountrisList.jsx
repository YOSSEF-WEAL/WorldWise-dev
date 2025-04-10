import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

export default function CountrisList() {
  const { cities, isLoding } = useCities();

  if (isLoding) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city bey clicking in a city on the map" />
    );

  const coutries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {coutries.map((country, i) => (
        <CountryItem country={country} key={country + i} />
      ))}
    </ul>
  );
}
