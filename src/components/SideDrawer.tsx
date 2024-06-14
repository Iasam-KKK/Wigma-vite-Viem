 
import { Link, useLocation } from 'react-router-dom';

const SideDrawer = () => {
  const location = useLocation();

  return (
    <div className="side-drawer open">
      <div className="drawer-header">
        <h2>Marvin</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/tokenlist"
              className={location.pathname === '/dashboard/tokenlist' ? 'active' : ''}
            >
              Token List
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/addtoken"
              className={location.pathname === '/dashboard/addtoken' ? 'active' : ''}
            >
              Add Token
            </Link>
        

          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideDrawer;