# LabeledTabs

`LabeledTabs` is a specialized [Tabs](Tabs) instance that presents simple tab buttons with text labels. This can be used in the common case where the tab buttons present a simple text label, such as in a Settings UI.

[Tab buttons can positioned and aligned](/demos/labeledTabs.html)

The text labels are drawn from the `aria-label` attribute of the corresponding tab panels. Typical example:

    <elix-labeled-tabs>
      <div aria-label="General">General settings</div>
      <div aria-label="Accounts">Account settings</div>
      <div aria-label="Junk mail">Junk mail settings</div>
      <div aria-label="Signatures">Signature settings</div>
    </elix-labeled-tabs>

`LabeledTabs` is simply a subclass of `Tabs` that fills the default content of `tabButtons` slot with a collection of [LabeledTabButton](LabeledTabButton) instances. It creates one `LabeledTabButton` for each panel, and sets the `textContent` of the button to the `aria-label` attribute of the corresponding panel.

Like the `Tabs` component it derives from, `LabeledTabs` is designed to comply as closely as possible with the accessibility recommendations for [WAI-ARIA Authoring Practices for Tabs](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel). `LabeledTabs` assigns a default ARIA role of `tab` to the tab buttons.

If you'd like to customize the appearance of the tab buttons, use the `Tabs` component directly.

The `LabeledTabs` class is registered as element `<elix-labeled-tabs>`.
