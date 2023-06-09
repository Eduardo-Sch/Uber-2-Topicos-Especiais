import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/cadastros">Clientes</NavLink>
          <NavLink to="/motoristas">Motoristas</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
