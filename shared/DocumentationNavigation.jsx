import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Template for a standard page on the site.
 */
export default class DocumentationNavigation extends Component {

  render(props) {

    const elements = [
      'LabeledTabs',
      'ListBox',
      'Modes',
      'Tabs'
    ];

    const mixins = [
      'AttributeMarshallingMixin',
      'ClickSelectionMixin',
      'ContentItemsMixin',
      'DefaultSlotContentMixin',
      'DirectionSelectionMixin',
      'FocusRingMixin',
      'KeyboardDirectionMixin',
      'KeyboardMixin',
      'KeyboardPagedSelectionMixin',
      'KeyboardPrefixSelectionMixin',
      'SelectedItemTextValueMixin',
      'SelectionAriaMixin',
      'SelectionInViewMixin',
      'ShadowReferencesMixin',
      'ShadowTemplateMixin',
      'SingleSelectionMixin',
      'Symbol',
      'attributes',
      'constants',
      'content',
      'defaultScrollTarget',
      'renderArrayAsElements',
      'symbols'
    ];

    return (
      <div>
        <div>Components</div>
        {linkList(elements)}
        <div>Mixins</div>
        {linkList(mixins)}
      </div>
    );
  }

}


function linkList(items) {
  const itemLinks = items.map(item => {
    return (
      <a href={`/documentation/${item}`}>{item}</a>
    );
  });
  return (
    <ul>{itemLinks}</ul>
  );
}
