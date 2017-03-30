/**
 * Return a promise for the HTML for the markdown docs for the component with
 * the given name.
 */
export default function(componentName) {
  // TODO
  // For now, the promise just immediately resolves to a simple string.
  return Promise.resolve(`<p>Documentation for ${componentName} goes here...</p>`);
}
