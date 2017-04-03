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
          headerTexture="/static/resources/images/homeTexture.png"
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
          <p>
            Elix and its community-driven process are currently in a pilot
            phase. These components are not ready for production use. The Elix
            core team will share more about the project road map and our plans
            for open process as those plans come together.
          </p>
        </section>

        <section class="homeSection3">
          <a name="core-principles">
            <h1>Core Principles</h1>
          </a>
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
