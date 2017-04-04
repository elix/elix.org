import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Template for a standard page on the site.
 */
export default class DocumentationNavigation extends Component {

  render(props) {

    const elements = [
      'LabeledTabs',
      'LabeledTabButton',
      'ListBox',
      'Modes',
      'Tabs',
      'TabStrip',
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

    const wrappers = [
      'TabStripWrapper'
    ];

    return (
      <nav>
        <a class="navHeader" href="elements">ELEMENTS</a>
        {linkList(elements, props.current)}
        <a class="navHeader" href="mixins">MIXINS</a>
        {linkList(mixins, props.current)}
        <a class="navHeader" href="wrappers">WRAPPERS</a>
        {linkList(wrappers, props.current)}
      </nav>
    );
  }

}


function linkList(items, current) {
  const itemLinks = items.map(item => {
    const className = item === current ? 'current' : '';
    return (
      <li class={className}>
        <a href={`/documentation/${item}`}>{item}</a>
      </li>
    );
  });
  return (
    <ul>{itemLinks}</ul>
  );
}
