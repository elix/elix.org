import { h } from 'preact'; // jshint ignore:line
import ComponentCard from './ComponentCard';
import Header from './Header';
import PageSection from './PageSection';
import PageTemplate from './PageTemplate';


/**
 * The Home page.
 *
 * This is a variant of the usual wiki page that shows the latest links
 * instead of links based on their tags.
 */
export default class HomePage extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          url={props.url}
        >
          <PageSection class="homeSection0">
            <Header/>
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
          </PageSection>

          <PageSection class="homeSection1">
            <ComponentCard name="LabeledTabs" color="0">
              Classic tabs for Settings and other configuration
            </ComponentCard>
            <ComponentCard name="ListBox" color="1">
              Single-selection list box
            </ComponentCard>
            <ComponentCard name="Modes" color="2">
              Shows a single panel at a time
            </ComponentCard>
            <ComponentCard name="Tabs" color="3">
              Basic tabs structure for navigation and configuration
            </ComponentCard>
          </PageSection>

          <PageSection class="homeSection2">
          <h1>Overview</h1>
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
          </PageSection>

          <PageSection class="homeSection3">
            <h1>Core Principles</h1>
          </PageSection>

          <PageSection class="homeSection4">
            <h1>Getting Started</h1>
          </PageSection>

      </PageTemplate>
    );
  }

}
