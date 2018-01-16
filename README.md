This is the main repo for the Elix.org site.


Prerequisites
=============
You'll need an up-to-date copy of Node installed. You can install Node from http://nodejs.org, or
you can install the Node Version Manager, nvm. See https://github.com/creationix/nvm for details.

Once Node is installed, run the following:

````
npm install
npm run start
````

Point your browser to localhost:8080.

Note that the project is automatically built after the dependencies are
installed. If you make changes to the project, you'll need to run the
following to see changes:

````
npm run build
npm run start
````

You can also run the watch command to look for file changes:

````
npm run watch
````

If you install a more recent version of the Elix dependency, you can rebuild
the API documentation by running:

````
npm run buildDocs
````
