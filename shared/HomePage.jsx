import { Component, h } from 'preact'; // jshint ignore:line
import ComponentCard from './ComponentCard';
import PageTemplate from './PageTemplate';


/**
 * The Home page.
 *
 */
export default class HomePage extends Component {

  render(props) {

    const sideNavigation = (
      <nav>
        <ul>
          <li><a href="#components">Components</a></li>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#core-principles">Core Principles</a></li>
          <li><a href="#getting-started">Getting Started</a></li>
        </ul>
      </nav>
    );

    return (
      <PageTemplate
          headerTexture="/static/images/homeTexture.png"
          request={props.request}
          sideNavigation={sideNavigation}
        >
        <section class="homeSection0">
          <h1 class="tagline">
              web community project for<br/>
            high-quality web components
          </h1>
          <p class="blurb">
            Elix is a community-driven collection of high-quality web components
            for common user interface patterns such as lists, menus, dialogs,
            carousels, and so on. The modular nature of web components let you
            easily incorporate them into your web apps, and their standard
            definition ensures good results across all mainstream browsers.
          </p>
        </section>

        <section class="homeSection1">
          <a name="components"></a>
          <ComponentCard name="LabeledTabButton" color="0">
            A generic tab button with a text label
          </ComponentCard>
          <ComponentCard name="LabeledTabs" color="1">
            Classic tabs for Settings and other configuration
          </ComponentCard>
          <ComponentCard name="ListBox" color="2">
            Single-selection list box
          </ComponentCard>
          <ComponentCard name="Modes" color="3">
            Shows a single panel at a time
          </ComponentCard>
          <ComponentCard name="Tabs" color="1">
            Basic tabs structure for navigation and configuration
          </ComponentCard>
          <ComponentCard name="TabStrip" color="3">
            A strip of tab buttons
          </ComponentCard>
        </section>

        <section class="homeSection2">
          <a name="overview">
            <h1>Overview</h1>
          </a>
          <p>
            Most applications make use of common, general-purpose user interface
            patterns such lists, menus, dialogs, carousels, and so on. Such
            patterns can be efficiently implemented and packaged as web
            components. Their modular nature lets you easily incorporate web
            components into your web application, and their standard definition
            ensures good results across browsers.
          </p>
          <p>
            This arrangement permits a beneficial economy of scale, as common
            patterns only have to be implemented once. But that is not to say
            that it’s easy to develop general-purpose user interface patterns as
            solid components. To the contrary, implementing even simple patterns
            with a very high degree of quality can entail substantial
            complexity.
          </p>
          <p>
            For that reason, the Elix project believes that implementing
            high-quality, general-purpose components is best done as a community
            effort. This spreads the cost of creating the components across
            organizations, and ensures that the resulting components satisfy a
            broad range of concerns and can be used in many contexts.
          </p>
        </section>

        <section class="homeSection3">
          <a name="core-principles">
            <h1>Core Principles</h1>
          </a>
          <ul>
            <li>
              <strong>Usability excellence.</strong>&nbsp;
              All components are designed with the experience of the end user in
              mind. Each component tries to provide the best implementation
              possible of a very common user interface pattern. The components
              try to provide a great user experience by default, freeing you
              from having to worry about small details, and letting you focus on
              your application’s core value. Elix includes universal access in
              its definition of usability excellence: our components should
              provide a great experience to all users regardless of temporary or
              permanent handicaps.
            </li>
            <li>
              <strong>As good as HTML elements.</strong>&nbsp;
              These components are measured against the <a
              href="https://github.com/webcomponents/gold-standard/wiki">Gold
              Standard checklist for web components</a>, which uses the built-in
              HTML elements as the quality bar to which web components should
              aspire. These components should work predictably and reliably in a
              wide variety of contexts and with good performance.
            </li>
            <li>
              <strong>Good building blocks.</strong>&nbsp;
              The project's components are designed to be used as-is, without
              requiring customization or further coding. But no design can meet
              every situation. (There is no One Carousel to Rule Them All.) So
              these components are factored into parts that you can readily
              recombine to create solid components to meet your needs.
              Composition is generally preferred over class inheritance as a
              means of aggregating behavior; see the elix-mixins package for
              details.
            </li>
            <li>
              <strong>Use the platform.</strong>&nbsp;
              These components are generally written as "close to the metal" as
              is possible while still allowing code to be shared across
              components. These components are not built upon a monolithic
              framework, nor is any shared runtime required to use them. By
              virtue of being web components, these elements can be used with
              any front-end framework.
            </li>
            <li>
              <strong>Maximize the audience of potential contributors.</strong>&nbsp;
              Designing components that appeal to a broad audience requires
              accepting contributions from a broad audience. For that to happen,
              we can’t rely on complex, project-specific abstractions or
              techniques. We try to write the component code to be as plain as
              possible, with the least amount of declarative, framework-style
              magic. In practice, that means that clear, verbose code is often
              prefered over tight but inscrutable code. For example, we’re
              willing to tolerate a certain degree of boilerplate code if that
              makes it easier for you to understand the code or step through it
              when you’re debugging your own application. If you’re able to
              write a simple web component in plain JavaScript, a minimal
              learning curve should allow to you to understand — and contribute
              to — Elix code.
            </li>
            <li>
              <strong>Well-documented.</strong>&nbsp;
              We do our best to document not only the public API of each
              component and mixin, but also the underlying intention and design
              principles. We try to document <em>why</em> something is the way
              it is in order to make the best use of a potential contributor’s
              time.
            </li>
            <li>
              <strong>Provide a minimalist, themeable appearance.</strong>&nbsp;
              These components are meant to fit unobtrusively into your
              application, and so come with a bare minimum of styling. They can
              be styled with CSS to achieve more distinctive visual effects or
              branding to blend seamlessly with your application’s own style.
            </li>
            <li>
              <strong>Work on all mainstream browsers.</strong>&nbsp;
              This includes the latest versions of Apple Safari and Mobile
              Safari, Google Chrome and Chrome for Android, Microsoft Edge and
              Internet Explorer 11, and Mozilla Firefox. The older browsers,
              notably IE 11, require the use of the web component v1 polyfills.
            </li>
            <li>
              <strong>Open process.</strong>&nbsp;
              The process that drives the project
              is as important to use as the code artifacts. We strive to
              incorporate feedback from a general web audience, while at the
              same time imposing just enough structure to keep the project
              moving forward at a consistent pace in a consistent direction.
            </li>
          </ul>
        </section>

        <section class="homeSection4">
          <a name="getting-started">
            <h1>Getting Started</h1>
          </a>
        </section>

      </PageTemplate>
    );
  }

}
