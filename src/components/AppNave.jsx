import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
export default function AppNave() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countrys">Countrys</NavLink>
        </li>
        <li>
          <NavLink to="Form">Form</NavLink>
        </li>
      </ul>
    </nav>
  );
}
