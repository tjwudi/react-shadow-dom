# ReactShadowDOM

![Travis](http://img.shields.io/travis/Wildhoney/ReactShadow.svg?style=flat)
&nbsp;
![Experimental](http://img.shields.io/badge/experimental-%E2%9C%93-blue.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-orange.svg?style=flat)

* **Heroku**: [http://react-shadow.herokuapp.com/](http://react-shadow.herokuapp.com/)

![Screenshot](http://i.imgur.com/1txgnOL.png)

---

With `ReactShadow` you can apply a [Shadow DOM](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) root inside of your component. Under normal React.js conditions, your styles are written inline for style encapsulation &ndash; with `ReactShadow` your styles can now be moved into their rightful place &ndash; within CSS documents!

# Getting Started

`ReactShadow` is implemented as a mixin that you can import into your component:

```javascript
var ReadmeApp = $react.createClass({
    mixins: [ReactShadow]
});
```

From there `ReactShadow` will take over &ndash; creating a shadow root inside of your component, and importing any CSS documents defined in your `cssDocuments` property &ndash; which should be an `array`:

```javascript
var ReadmeApp = $react.createClass({
    mixins: [ReactShadow],
    cssDocuments: ['../css/Default.css']
});
```

You can specify prefix for all paths in `cssDocuments`.

```javascript
ReactShadow.cssDocumentsPrefix = '../css/';
var ReadmeApp = $react.createClass({
    mixins: [ReactShadow],
    cssDocuments: ['Default.css']  // actual path: ../css/Default.css
});
```

`cssSource` property can be used to inject CSS string. When both `cssDocuments` and `cssSource` are defined, style defined via `cssSource` will be attached after `cssDocuments` styles. Which means style defined via `cssSource` may override those defined in `cssDocuments`.

```javascript
ReactShadow.cssDocumentsPrefix = '../css/';
var ReadmeApp = $react.createClass({
    mixins: [ReactShadow],
    cssSource: 'section { background-color: green; }'
});

```

# Event Retargeting

As Shadow DOM has the concept of [Event Retargeting](http://www.w3.org/TR/shadow-dom/#event-retargeting) for encapsulation purposes, event delegation will not function correctly because all events will appear to be coming from the Shadow DOM &ndash; therefore `ReactShadow` uses the React ID for each element to dispatch the event from the original element, therefore maintaining React's event delegation implementation.

Events are therefore written in exactly the same way:

```javascript
var ReadmeApp = $react.createClass({
    render: function render() {
        return <a onClick={this.reset} title="Reset Counter">
                   Reset, Comrade!
               </a>
    }
});
```