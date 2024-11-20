const Sidebar = () => {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="#" className="nav-link">
              <div className="nav-profile-image">
                <img src="/assets/images/faces/face1.jpg" alt="profile" />
                <span className="login-status online"></span>
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">David Grey. H</span>
                <span className="text-secondary text-small">Project Manager</span>
              </div>
            </a>
          </li>
          {/* Sidebar Menu Items */}
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;
  