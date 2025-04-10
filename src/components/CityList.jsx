import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoding } = useCities();

  if (isLoding) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city bey clicking in a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
