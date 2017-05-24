import { Component, h } from 'preact'; // jshint ignore:line


/**
 * Template for a standard page on the site.
 */
export default class DocumentationNavigation extends Component {

  render(props) {

    const elements = [
      'LabeledTabButton',
      'LabeledTabs',
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
      'SingleSelectionMixin'
    ];

    const helpers = [
      'attributes',
      'constants',
      'content',
      'defaultScrollTarget',
      'renderArrayAsElements',
      'Symbol',
      'symbols'
    ];

    const wrappers = [
      'TabStripWrapper'
    ];

    return (
      <nav>
        <ul>

          <DocumentationLink current={props.current} href="/documentation">Overview</DocumentationLink>

          <DocumentationLink current={props.current} isHeader="true" href="/documentation/elements">ELEMENTS</DocumentationLink>
          {linkList(elements, props.current)}

          <DocumentationLink current={props.current} isHeader="true" href="/documentation/mixins">MIXINS</DocumentationLink>
          {linkList(mixins, props.current)}

          <DocumentationLink current={props.current} isHeader="true" href="/documentation/wrappers">WRAPPERS</DocumentationLink>
          {linkList(wrappers, props.current)}

          <DocumentationLink current={props.current} isHeader="true" href="/documentation/helpers">HELPERS</DocumentationLink>
          {linkList(helpers, props.current)}

        </ul>
      </nav>
    );
  }

}


function DocumentationLink(props) {
  const currentClass = props.href === props.current ? 'current' : '';
  const headerClass = props.isHeader ? 'navHeader' : '';
  const className = `${headerClass} ${currentClass}`;
  return (
    <li class={className}>
      <a href={props.href}>{props.children}</a>
    </li>
  );
}


function linkList(items, current) {
  return items.map(item =>
    <DocumentationLink current={current} href={`/documentation/${item}`}>{item}</DocumentationLink>
  );
}
