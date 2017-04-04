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
        <ul>

          <NavHeader current={props.current} href="elements">ELEMENTS</NavHeader>
          {linkList(elements, props.current)}

          <NavHeader current={props.current} href="mixins">MIXINS</NavHeader>
          {linkList(mixins, props.current)}

          <NavHeader current={props.current} href="wrappers">WRAPPERS</NavHeader>
          {linkList(wrappers, props.current)}

        </ul>
      </nav>
    );
  }

}


function NavHeader(props) {
  const isCurrent = props.href === props.current;
  const className = `navHeader ${isCurrent ? 'current' : ''}`;
  return (
    <li class={className}>
      <a href={props.href}>{props.children}</a>
    </li>
  );
}


function linkList(items, current) {
  return items.map(item => {
    const isCurrent = item === current;
    const className = isCurrent ? 'current' : '';
    return (
      <li class={className}>
        <a href={`/documentation/${item}`}>{item}</a>
      </li>
    );
  });
}
