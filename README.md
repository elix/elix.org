This is the main repo for the Elix.org site.


Prerequisites
=============
You'll need an up-to-date copy of Node installed. You can install Node from http://nodejs.org, or
you can install the Node Version Manager, nvm. See https://github.com/creationix/nvm for details.

Once Node is installed, install Yarn (which we use rather than npm):

````npm install -g yarn````

Then, once yarn is globally installed, run the following:

```yarn install```

to pick up most of the other prerequisites you need.

You will need the grunt command line tool to run various scripts in the project. You
can install it via:

```
npm install -g grunt-cli
```

Create an access key for your GitHub account by going to http://github.com, signing in,
then going to the account settings page. Click on the Applications link in the menu bar
on the left. Create an access key for use in Elix development, and copy it
to the clipboard for use below.

Finally, you will need to update your .profile or .bash_profile to include the following:

    export GITHUB_TOKEN=<Your GitHub Key>
    export ELIX_EXPRESS_PORT=<The Node.js Express server listens on this port>
    export ELIX_DEV_NGINX_PORT=<Developer Nginx port (required if running Nginx locally)>
    export ELIX_DEV_NGINX_SSL_PORT=<Developer Nginx port for SSL (required if running Nginx locally)>

Running the client locally
==========================

Elix.org is a Node.js app that can be run on a development machine
either directly or behind an Nginx proxy server. To mirror the staging and
production environments, a developer should run the application through an
Nginx proxy server, though it's possible to run the node app standalone. Among
other things, this allows you to always receive a fresh response from the server
instead of getting copies of recently-returned responses from the Nginx cache.

From the standpoint of the browser, the only difference is the port number you
provide for the application URL. See the section below, "Run the servers
locally".

Run the servers locally
=======================

On the Heroku servers in our production and staging environments, our server
applications run behind an Nginx proxy. As part of local development work, you should
test against the Nginx configuration by launching an instance of Nginx on your development
machine prior to launching the Node-based server applications. Note that you must set
each environment variable: ELIX_EXPRESS_PORT, ELIX_DEV_NGINX_PORT, and ELIX_DEV_NGINX_SSL_PORT. These must be separate
values, for example 1337, 1338, and 1339. You will use one of these port values to direct the browser
to point to either Nginx as a proxy (the value for ELIX_DEV_NGINX_PORT), or directly to
the node application (ELIX_EXPRESS_PORT).

When running under Nginx, the site is an HTTP/2 host accessible under SSL. The Nginx configuration files will
cause Nginx to route any HTTP requests to HTTPS. In order to run under Nginx, you will need to install
a self-signing certificate on your system. The script, nginx/devcert/localhost_cert.sh, will do this
for you. It needs to be run with administrator privileges:

    sudo ./localhost_cert.sh
    
This will build and install the property files to /etc/ssl/. During the process, enter *localhost* when
asked for FQDN.

To eliminate Chrome browser warnings about unsafe SSL certs, you can add your unsigned certificate as
a trusted certificate to your keychange on OS X:

    sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /etc/ssl/certs/server.crt

To start Nginx, set your current directory to the project root, and then:

```
grunt start-nginx
```

You can kill Nginx by hitting ctrl-c in your terminal window. If you detach
the script from your terminal session, you can kill Nginx with
the following:

```
grunt stop-nginx
```


Setting up Heroku
=================
There are two Heroku apps already provisioned: one for test, and another for
production. If for some reason a new Heroku app ever needs to be provisioned,
some steps are necessary:

* Set up the Heroku buildpacks
    1. heroku buildpacks:set https://github.com/componentkitchen/nginx-buildpack.git --app testelixweb|elixweb
    2. heroku buildpacks:add --index 2 https://github.com/heroku/heroku-buildpack-nodejs.git --app testelixweb|elixweb
* Set the following Heroku config vars:
    1. CK_EXPRESS_PORT (5000)
    2. GITHUB_TOKEN
    3. NODE_ENV (production or test)
    4. NODE_MODULES_CACHE (false)


Deploying to Heroku
===================

To deploy to production:

* Set up a git remote (e.g., "production") for git@heroku.com:elixweb.git.
* Push to that remote.
* Within a minute or so, the new site should be live at https://elix.org.

To deploy to testelix:

* Set up a git remote (e.g., "test") for git@heroku.com:testelixweb.git.
* You can push a test branch on your local box to the master branch on the
  test server with:

```
git push -f test <branch name>:master
```

For example, to deploy the develop branch to testelixweb:

```
git push -f test develop:master
```

* Check the results at http://test.elix.org.

Note that the force attribute, -f, is required. The testelixweb git server running on Heroku
must match your specified branch's history. We overwrite the git history with each
deployment.


Notes on building Nginx
=======================

We commit our current OS X version of Nginx to our GitHub repository, and the binary is available
within the source tree and via our Grunt scripts for running Nginx locally. We try to keep our
development version of Nginx the same as our Heroku deployment version, currently 1.9.5.
Here are instructions for building Nginx separately, such that the binary can then be committed to our source tree.

The build script can be found in the repository, https://github.com/componentkitchen/build-nginx.git. Clone
this repo locally. Then execute the script, scripts/build_nginx_osx.sh.

Finally, copy the built nginx binary to the source tree:

    cp /tmp/heroku_nginx.{XXXX}/nginx-{VERSION}/objs/nginx <your dev root>/elixweb/nginx/bin/nginx