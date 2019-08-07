---
sidebarDepth: 2
---

# Structure of Vuex Store

VueWpJson plugin creates few VueX store modules to store a fetched data.

## wp_config

Simple module which stores config provided by user while registering plugin/Nuxt module. There we inject whole **config object** under "config" key  
Example value:

```js
config: {
  lang: 'en',
  url: 'https://wp.mybackend.com/',
  menus: ["info", "contact"]
}
```

Creating this module was essential to make it compatibile with Nuxt.

## wp_lang

There we store website's language under "lang" key. In future, this module will be deleted because we store same data in wp_config

## wp_layouts

If we provide Vuex Store as third argument to registerPlugin - there will be stored under keys post/page:

- In case of Nuxt - "AlternativePost" or "AlternativePage" string
- In case of Vue - Custom Page/Post view component

Creating this module was essential to make it compatibile with Nuxt.

## wp_media

There we have whole response from /media Wordpress' endpoint. It will be used in next versions to provide new functionalities.

Fetched after plugin's registration.

## wp_menu

There we have our menus if we provided any in Config and on our Wordpress we have installed [this plugin](https://wordpress.org/plugins/wp-rest-api-v2-menus/)

We also provide menu component which is placed in **components/Base/BaseMenu.vue**.
It can generate an infinite **ul > li > router-link or a** structure based on **slug** sent as props. Component will search for slug in VueX store and do the job.

Fetched after plugin's registration.

## wp_meta

Here we store default website's meta data. If page does not have any it will be used as fallback.

Fetched after plugin's registration.

## wp_post

There we store our fetched posts' content. Under **post key** we have pairs like:

```js
"types": {
  "posts": {
    "my-post": {/*...*/},
  },
  "pages": {
    "my-page": {/*...*/},
  },
  "custom-post-type": {
    "my-custom-post": {/*...*/},
  }
}
```

Fetched after request post's page on frontend
