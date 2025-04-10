import { Outlet } from "react-router-dom";
import AppNave from "./AppNave";
import Logo from "./Logo";
import styels from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styels.sidebar}>
      <Logo />
      <AppNave />

      <Outlet />

      <footer className={styels.footer}>
        <p className={styels.copyright}>
          &copy; copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
