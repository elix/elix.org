import DocumentationPage from './DocumentationPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';


/**
 * Map routes to components.
 */
export default {
  '/elements/:name': DocumentationPage,
  '/error': ErrorPage,
  '/mixins/:name': DocumentationPage,
  '/': HomePage
};
