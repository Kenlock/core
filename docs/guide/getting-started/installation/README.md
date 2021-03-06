# Installation

<br>

## Vue.js

<br>

Go to your app's main directory and run:

```
npm install @vue-wordpress/core
```

or

```
yarn add @vue-wordpress/core
```

Go to your app's main.js/main.ts file, import the module catalog and register it:

```javascript
import Vue from "vue";
import store from "./store";
import Wordpress from "@vue-wordpress/core";

Vue.use(Wordpress, {
  url: "https://your-wordpress-url.com/",
  lang: "en",
  menus: ["main-menu", "footer-menu"],
  store
});
```

### url

Rest API URL

### lang

language of the website (two letter label)

### menus

There are a few possibilities with menu.
However, you must remember to install [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/) because by default, menus are not accessible on API.

- If you want to fetch each wordpress' menu.  
  You do not even need to put **menus** key inside config object. It is default setting.

- If you want fetch only certain menus. You should provide slugs as value. It can be string for one menu, and array of strings for few arrays.

```js
menus: "my-slug";
// OR
menus: ["my-slug", "other-menu", "diffrent"];
```

- If you want to disable fetching menus (one request less). You should set **menus** to false

```js
menus: false;
```

### requestPrefix

If you want to add prefix to each request - e.g. language prefix, you can set this attribute. It is optional. Example:

```
requestPrefix: 'en'
```

The result would be `/en/wp-json/wp/v2/pages`.

### Store

Store is an instance of Vuex Store 

That is all. Now you can use VueWpJson module!

### Optional parameters

#### titleTemplate

You can set global title template for your meta titles.
Example:
title = "My title"
titleTemplate = "%s - YuCom"

In result, as title we will see: "My title - YuCom".

<br>

## Nuxt.js

<br>

Go to your app's main directory and run:

```
npm install @vue-wordpress/nuxt
```

or

```
yarn add @vue-wordpress/nuxt
```

Create Vuex Store in your application if it does not exist. You can do it by creating **index.js** file in **store directory** and put there content like:

```js
export const state = () => ({});

export const mutations = {};

export const actions = {};
```

Open **nuxt.config.js** and add **@vue-wordpress/nuxt** in modules. You also have to provide config. There are 2 possible approach.  
First one:

```js
modules: [
  [
    "@vue-wordpress/nuxt",
    {
      url: "https://wp.mysite.com/",
      lang: "en",
      store: true
    }
  ]
];
```

Second one:

```js
modules: [
  '@vue-wordpress/nuxt'
],
wpJson: {
  url: 'https://wp.mysite.com/',
  lang: 'en',
  store: true
}
```

As we cannot access Store from nuxt.config.js we have to set it as **true**. Our module will do the job an inject them other way.

Inside **build** in **transpile** we have to tell Nuxt to transpile **Vue Wp Json core module**.

```js
build: {
  transpile: ["@vue-wordpress/core"];
}
```

That is all. Now you can use NuxtWpJson module!
<br>

## Vue Storefront

<br>

Go to your theme's main directory and run:

<br>

```
npm install @vue-wordpress/core
```

or

```
yarn add @vue-wordpress/core
```

<br>

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

<br>

```
cd ../vue-storefront/src/modules;
git submodule add https://github.com/new-fantastic/vsf-wp-json.git;
```

<br>

This will create a Git Submodule for your `vue-storefront` repository. Thanks to that you will be able pull for new updates :)

<br>

After that, add module to modules/index.js:

<br>

```ts
import { WpJson } from "./vsf-wp-json";

//...

export const registerModules: VueStorefrontModule[] = [
  // ...
  WpJson
  // ...
];
```

<br>

Open config file, then at the end of main object add:

<br>

```json
"wordpressCms": {
  "url": "https://your-wordpress-url.com/",
  "lang": "en",
  "menus": ["for-buyers", "footer"]
}
```

<br>
