
# Gatsby Theme for Tech blogs by CódigoFacilito

![Screenshot on the UI design of the generated blog](https://i.imgur.com/zEqFaQp.png)

Bootstrap your blog with the power of Gatsby and the Gatsby Theme for Tech blogs. The theme handles all the basic functionality for you.

[Try the demo](https://blog.codigofacilito.com)

## Quick Start

Install the theme on your Gatsby project

```shell
npm install gatsby-theme-tech-blog
```

Add the theme to yout `gatsby-config.js` file:

```javascript
plugins: [`gatsby-theme-tech-blog`]
```

Whatch the magic happen.

## Features
The Gatsby Theme for Tech blogs aims to handle all the basic features you would look for in a technical blog. For now, these are the features contained in the theme:

* Transform markdown to HTML
* Automatically generates thumbs for social media
* Code highlight with Prism
* Tagging and categorization
* SEO URLs and metadata
* Pagination
* More to come

Would you like to suggest a feature? Feel free to open an issue with the **feature request** label.

## Configuration
The project looks to provide a solid foundation for you to build on top of it. These are now some of the settings you can tune up:

| Option         | What it does                                                                 |
|----------------|------------------------------------------------------------------------------|
| contentPath    | Path to search for markdown files                                            |
| navYMLPath     | Path to search for YAML file with navigation items                           |
| basePath       | This path will prefix all the paths that the blogs generate                  |
| prefixWithDate | Boolean value, when set to true, post paths will be prefixed with their date |

```javascript
plugins: [
  {
    resolve: `gatsby-theme-tech-blog`,
    options: {
      prefixWithDate: true, // Will generate paths like 2019/12/02/foo
      basePath: '/posts' // Will generate paths like /posts/2019/12/02/foo
    }
  }
],
```

Note: If you set the `basePath` value to the root path `/` you will only see the template for all the posts if you **don't have** an `index.js` file.

## UI configuration
This project uses Theme UI to build the interface, you can configure the theme based on the one that comes with the project which you can find [here](https://github.com/codigofacilito/tech-blog/blob/master/gatsby-theme-tech-blog/src/theme.js)

## Navigation configuration
The items on the nav bar are generated based on the content of the `items.yaml` file which can be found on the `navYMLPath` which defaults to `src/nav-items`.

To add a new item to the nav bar just add an item to the `items.yaml` file with the following pattern:

```yaml
- title: About
  link: /about
```

## How to contribute
First, fork the repo to your profile, then clone your fork into your local machine.

The `tech-blog` repo is a monorepo that contains both the theme project which you can find in the `gatsby-theme-tech-blog` folder and a site that you can use to test your changes to the theme, this project is found on the `site` folder.

You'll need to use `yarn` to manage the repositories, due to the monorepo configuration. To install the dependencies for both the site and the theme:

```shell
yarn workspace site install
yarn workspace gatsby-theme-tech-blog install
```

To start the `site` project which is linked to the local theme, use this command:

```shell
yarn workspace site develop
```

Once you have made your changes to the theme, submit a pull request to this repo.