---
title: "How to create a technical blog with Gatsby"
tags: ["gatsby","react","javascript"]
date: 2019-10-09
author: 
  name: Uriel
  email: uriel@codigofacilito.com
---

Add the following to your `gatsby-config.js` file:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-tech-blog`,
      options: {
        prefixWithDate: false,
        basePath: '/'
      }
    }
  ],
}
```