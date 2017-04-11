# Wrappers

Elix includes "wrapper" mixins that contribute visual elements to a component's
template. This approach allows a web component's template to be constructed from
pieces.

This is an application of the [functional mixins](mixins) concept to the
template that will populate a component's Shadow DOM subtree with visual
elements. Like all mixins, a wrapper accepts a class and returns a new class. In
the case of a wrapper, it returns a new class whose template incorporates the
base class' template.

As an example, [TabStripWrapper](TabStripWrapper) adds a [TabStrip](TabStrip) to
a base element's template and wires their selection states together. Suppose
we want to add tabs to a simple single-selection component. The component uses
[ShadowTemplateMixin](ShadowTemplateMixin) to define a basic template with a
single `div` holding a default `slot`:

    class SimpleElement extends
        SingleSelectionMixin(ShadowTemplateMixin(HTMLElement))) {
      get [symbols.template]() {
        return `
          <!-- Defined by SimpleElement -->
          <div id="simpleContainer">
            <slot></slot>
          </div>
        `;
      }
    }

We can then create a new component that adds a `TabStrip` to the above by
applying `TabStripWrapper`:

    class ElementWithTabs extends TabStripWrapper(SimpleElement) {}
    customElements.define('element-with-tabs', DivWithTabs);

As its core, `TabStripWrapper` defines its template as incorporating the
template of its base class (here, `SimpleElement`):

    const TabStripWrapper = (base) => class TabStripWrap extends base {      
      ...
      get [symbols.template]() {
        let baseTemplate = super[symbols.template] || '';
        if (baseTemplate instanceof HTMLTemplateElement) {
          baseTemplate = baseTemplate.innerHTML; // Downgrade to string.
        }
        return `
          <elix-tab-strip id="tabStrip">
            <slot name="tabButtons"></slot>
          </elix-tab-strip>

          ${baseTemplate}
        `;
      }
    }

When `TabStripWrapper` is applied, it will wrap the simple template above, so
the final class will contain a template with the contents of the `SimpleElement`
template alongside a `TabStrip` instance. The final template will look like:

    <element-with-tabs>
      #shadow-root
        <TabStrip>
          <slot name="tabButtons"></slot>
        </TabStrip>

        <!-- Defined by SimpleElement -->
        <div id="simpleContainer">
          <slot></slot>
        </div>
    </element-with-tabs>

As shown above, a component using `TabStripWrapper` gains a slot called
`tabButtons`. Child elements assigned to that slot will be appear inside the
`TabStrip`.

In this example, `TabStripWrapper` doesn't just add elements to the template,
it also wires the selection state of the tab strip to the selection state of
the overall component.

This wrapper approach allows a `TabStrip` to be applied to many kinds of
components. In a simple case, `TabStripWrapper` is used by [Tabs](Tabs) to wrap
a `TabStrip` around a [Modes](Modes) instance. `Modes` is a basic component that
just shows its selected item and hides everything else. That is, in fact, the
typical behavior of tabs: clicking a tab selects the corresponding tab panel and
hides the other panels.

The immediate visual showing and hiding of `Modes` however, may not be
sufficient for you, which is why `TabStripWrapper` exists. If you wish to
provide visual or interactive tab-switching effects more complex than the
instantaneous transition offered by `Modes`, you can create a component of your
own that styles/renders the tab panels, and then add tabs to it with
`TabStripWrapper`.
