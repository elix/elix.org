import ComponentPage from './ComponentPage';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import MarkdownPage from './MarkdownPage';


/**
 * Map routes to components.
 */
export default {
  '/documentation': MarkdownPage,
  '/documentation/mixins': MarkdownPage,
  '/documentation/:name': ComponentPage,
  '/error': ErrorPage,
  '/': HomePage
};
