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
      'TabStrip'
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
      <nav>
        <div class="navHeader">ELEMENTS</div>
        {linkList(elements, props.current)}
        <div class="navHeader">MIXINS</div>
        {linkList(mixins, props.current)}
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
