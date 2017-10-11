import { Component, h } from 'preact'; // jshint ignore:line


export default class AppShell extends Component {

  render(props) {

    const titleBar =
      props.titleBar ||
      (props.title && `${props.title} - Elix`) ||
      'Elix - Quality Web Components';
      
    const staticPath = `/static/${props.request.app.locals.build}`;

    return (
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>{titleBar}</title>
          <script src="/demos/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>
          <script src="/demos/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
          <script src="/build/demos.min.js"></script>
          <link rel="shortcut icon" href={`${staticPath}/images/favicon.png`}/>
          <link rel="stylesheet" href={`${staticPath}/main.css`}/>
        </head>
        <body>
          <div id="root">
            {props.children}
          </div>
          <script dangerouslySetInnerHTML={{__html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          
            ga('create', 'UA-97553012-1', 'auto');
            ga('send', 'pageview');`}} charSet="UTF-8"/>
        </body>
      </html>
    );
  }

}
