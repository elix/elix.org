import DocumentationPage from './DocumentationPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';


/**
 * Map routes to components.
 */
export default {
  '/documentation/:name': DocumentationPage,
  '/error': ErrorPage,
  '/': HomePage
};
