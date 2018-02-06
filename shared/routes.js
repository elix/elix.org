import ComponentPage from './ComponentPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import ContentPage from './ContentPage';
import VersionPage from './VersionPage';


/**
 * Map routes to components.
 */
export default {
  '/documentation': ContentPage,
  '/documentation/elements': ContentPage,
  '/documentation/helpers': ContentPage,
  '/documentation/mixins': ContentPage,
  '/documentation/:name': ComponentPage,
  '/error': ErrorPage,
  '/version': VersionPage,
  '/': HomePage
};
