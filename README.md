# IIGB beta website

This application is written using the [Node.js](https://nodejs.org/en/) JavaScript runtime.

<!-- toc -->

- [The purpose](#the-purpose)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Getting Started with development](#getting-started-with-development)
  * [Get the source](#get-the-source)
  * [Run the development server](#run-the-development-server)
  * [Project/File Structure](#projectfile-structure)
  * [Production build](#production-build)
  * [Environment variables](#environment-variables)
  * [Development flow](#development-flow)
  * [Testing](#testing)
- [Deployment & Release](#deployment--release)
  * [Release](#release)
    + [Rollback or Deploy a specific version](#rollback-or-deploy-a-specific-version)
  * [Deployment with/without Docker](#deployment-withwithout-docker)

<!-- tocstop -->

## The purpose

This application pulls together the modules which make up invest.gov.uk:

- IIGB-beta-structure
- IIGB-beta-content
- The website layout can be found within the src folder in this project.

## Prerequisites
In order to run the tool locally in development you'll need the following :

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads) 

## Dependencies

- [iigb-aws-helpers](https://github.com/uktrade/iigb-aws-helpers)
- [iigb-beta-content](https://github.com/uktrade/iigb-beta-content)
- [iigb-beta-structure](https://github.com/uktrade/iigb-beta-structure)

## Getting Started with development

### Get the source
Run the following from the command line to download the repository and change into the directory:

```bash
git clone git@github.com:uktrade/iigb-beta-website.git

cd iigb-beta-website
```

### Run the development server

- First install the dependencies:

```bash
npm install
```

- To run the server, type the following command in your terminal:

```
npm run dev
```

  Which will build source files and watch for changes and rebuild automatically upon changes in Sass, Javascript and HTML files.
  
  CSS and Javascript files built includes source maps for debugging when running the dev server and are not optimised for production. Check out [production build](#production-build) for instructions for building source for production.

- Then you can visit the site in the browser via http://localhost:3000 or http://dev.invest.great.gov.uk:3000

  In order to use ssl encryption to visit locally running site visit http://dev.invest.great.gov.uk:5555

  dev.invest.great.gov.uk is a special domain registered for development which points to localhost and has a valid ssl certificate to provide an encrypted environment to test and develop on, to replicate encryption related issues and act as a live-like development environment.

- Any source change triggers a build when dev server is running.

    Running `npm run dev` sets the variable `DIT_ENV` to `development` which enables watching source files and re-building(sass,js, html). 

- To reload/restart the dev server at any time type `rs` the console where app is running.


### Project/File Structure

Below snippet outlines project structure. This snippet only lists files of importance.

```
- build/              #Build destination folder
- conf/               
  - parallel.conf.js #Browserstack configuration for parallel tests
  - single.conf.js   #Browserstach configuration for a single device
- dev-ssl/            # Ssl certificate for dev.invest.great.gov.uk to be served through development server
- Dockerfile          # Docker file for build container
- lib/                # Helper libraries for building and development
- nodemon.json        # Nodemon configuration for development to watch html file changes and rebuild static html files.
- package.json        
- README.md           
- spec/               # Tests
- src/                # Source files
  - assets/
    - css             # Statically hosted 3rd party css libraries 
    - fonts           # Statically hosted font files 
    - ip-redirects.json # Maps country codes to path user should be redirected to  (e.g. en to /int/en)
    - s3-redirects.json # S3 bucket redirect configuration, uploaded to s3 on deploy
- .docker-deployer.sh   # Script to deploy by running command `npm run deploy` in docker container configured in Dockerfile

```

### Production build

- Run `npm start` to build source optimised for production and serve via http://localhost:3000

  Building code for production involves:

  - Minimising & bundling Javascript source
  - Compressing CSS output built from Sass source
  - Copying all assets (including Javascript and CSS output) under build/assets/<IIGB_BUILD>.


### Environment variables 

| Variable    | Default   | Description |
-------       |---------  |----------   |
IIGB_SEARCH   |  https://5dle4b7qu3.execute-api.eu-west-1.amazonaws.com/prod | AWS Cloud api for site search |
CMS_BRANCH    | develop | Branch to use from [iigb-beta-structure](https://github.com/uktrade/iigb-beta-structure) |
IIGB_BUILD    |             | Folder name for assets to be copied under. Unix timestamp is set as IIGB_BUILD to when [deployed](#deployment) using Docker deploy script. All references to assets linked in html output use this environment variable to link static assets (images, css, javascript, etc.)|
BASE_IIGB_URL |             | The root domain URL for the environment.


### Development flow

This application is developed using [git flow](http://nvie.com/posts/a-successful-git-branching-model/) and Github pull requests. `develop` is the main development branch and `master` is the branch for production releases.

The following prefixes are used for special branches:

- Fature branches: *feature/\<feature-description\>*
- Release branches: *release/v\<release-version\>*
- Hotfix branches: *hotfix/\<hotfix-description\>*

*Tip:* Following link shows alternative tools and installation methods for git flow:

[http://danielkummer.github.io/git-flow-cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/)

### Testing

All testing on the website is carried out using the Jasmine testing framework.

**Unit Testing**

The project contains unit tests that check the functionality of each of the templates used to build the website pages.

They can be run using:
```bash
npm run unit-tests
```

**Integration Testing**

The project contains integration tests that check the integration between the website and the backend services that support it.

They are run through the Browserstack local API against your local host. *(an internet connection is therefore required)*

The tests will start a localhost instance if one is not currently running.

They can be run using:
```bash
npm run integration-tests
```

**Accessibility Testing**

The project contains automated accessibility tests that check each of the pages in the site meet the required accessibility requirements, they are run as part of the integration testing.

They can be run using the same command as the integration testing (see above).

The pages to be tested are defined in pageData.json; each entry in the file contains the page name, the url extension fo the site (url - domain name) and a list of exclusions for the page.

The exclusions are a list of selectors that represent HTML elements that should be ignored by the accessibility tests. If there are elements in HTML shared across multiple pages (header/footer code etc) that need to be ignored, these can be added to  globalExclusions.json and will be applied to every page tested.

## Deployment & Release

Branch `develop` is continuously deployed to [staging environment](https://staging.invest.great.gov.uk/) for QA purposes. All new features are available on staging soon after the pull request is approved by a team member and feature is finished (merged in).

Branch `stable` is continuously deployed to [production environment](https://invest.great.gov.uk). When release is performed latest code is merged into into `stable` which will be deployed automatically by continous build pipeline.

### Release

To take a cut for releasing from `develop`: 

  - Run `npm release (major|minor|version)` (on any branch) with no un-committed changes. This will bump the version (major, minor or patch) and merge the release into branch `stable` to be deployed. 

  - Push `develop` ,`master` and `stable` branches:
      ```
      git push --all
      ```
  For more details of performed release steps see [release.sh](https://github.com/uktrade/iigb-aws-helpers#release.sh) utility from [iigb-aws-helpers](https://github.com/uktrade/iigb-aws-helpers).

#### Rollback or Deploy a specific version

  A release that should be deployed as [invest.great.gov.uk](https://invest.great.gov.uk/) must be the commit HEAD on branch `stable`; continous integration tool in use should be watching this branch for changes to deploy production environment. 

  Any version can be marked as stable to be deployed as [invest.great.gov.uk](https://invest.great.gov.uk/) by resetting branch `stable` to point to relevant commit.

- Use following commands to mark a release for deployment. Which is useful for rolling back to a specific version if needed

```bash
git checkout stable && \
git reset --hard v1.1.0 && \
git push -f
```

### Deployment with/without Docker

To build and deploy a branch to a target AWS S3 bucket,run `npm run deploy` or `./docker-deployer.sh` script which will perform `npm run deploy` in a docker container configured in Dockerfile.

See more details of deployment: [deploy.sh](https://github.com/uktrade/iigb-aws-helpers#deploy.sh) utility from [iigb-aws-helpers](https://github.com/uktrade/iigb-aws-helpers).

