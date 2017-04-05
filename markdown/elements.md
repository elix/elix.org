# Elements

Lorem ipsum dolor sit amet.

All mixin strategies wrestle with how to order mixin property/method effects and
avoid naming conflicts. Common solutions involve destructively modifying a
target object's prototype, or generating property/method wrappers to broker name
mixin property/method invocations. Those solutions can create brittle solutions
which are hard to debug, maintain, or extend.


    // Define three mixins.
    const ClickSelectionMixin = base => class ClickSelection extends base {...}
    const SingleSelectionMixin = base => class SingleSelection extends base {...}
    const SelectionClassMixin = base => class SelectionClass extends base {...}

    // Apply the mixins.
    class TestElement extends
        ClickSelectionMixin(SelectionClassMixin(SingleSelectionMixin(HTMLElement))) {}
    customElements.define('test-element', TestElement);


In contrast, this proposal calls for functional mixins to extend the JavaScript
prototype chain. This has the immediate benefit of leveraging a standard,
performant, and well-documented feature of the JavaScript language.
Additional benefits.