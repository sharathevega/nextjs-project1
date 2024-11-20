const Navbar = () => {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="/">
            <img src="/assets/images/logo.svg" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="/">
            <img src="/assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
        {/* Additional Navbar Content */}
      </nav>
    );
  };
  
  export default Navbar;
  