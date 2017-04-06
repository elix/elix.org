import ComponentPage from './ComponentPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import ContentPage from './ContentPage';


/**
 * Map routes to components.
 */
export default {
  '/documentation': ContentPage,
  '/documentation/elements': ContentPage,
  '/documentation/mixins': ContentPage,
  '/documentation/wrappers': ContentPage,
  '/documentation/:name': ComponentPage,
  '/error': ErrorPage,
  '/': HomePage
};
