import uberLogo from './images/uber-logo.png';

function Header() {
  return (
    <header>
      <img src={uberLogo} alt="Logo do Uber" style={{ width: '200px', height: 'auto' }} />
    </header>
  );
}

export default Header;