import ComponentPage from './ComponentPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';


/**
 * Map routes to components.
 */
export default {
  '/elements/:name': ComponentPage,
  '/error': ErrorPage,
  '/mixins/:name': ComponentPage,
  '/': HomePage
};
