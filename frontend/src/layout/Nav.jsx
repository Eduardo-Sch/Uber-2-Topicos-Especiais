import { NavLink } from 'react-router-dom';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/cadastros">Area de Cadastros</NavLink></li>
        <li><NavLink to="/corridas">Area de Corridas</NavLink></li>
        <li><NavLink to="/sobre">Sobre</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;