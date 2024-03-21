import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to={"/"}>
        <img width={"250px"} margin="20px" src="blue_short.svg" alt="" />
      </NavLink>
    </nav>
  );
}
