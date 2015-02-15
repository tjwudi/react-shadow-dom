(function main($window, $document) {

    "use strict";


    /**
     * @module ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    $window.ReactShadow = {

        /**
         * @property shadowRoot
         * @type {Object}
         */
        shadowRoot: {},

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function() {

            // Wrap the current DOM node in a script element.
            var scriptElement = $document.createElement('script');
            this.getDOMNode().parentNode.appendChild(scriptElement);
            scriptElement.appendChild(this.getDOMNode());

            // Create shadow root for the visible component.
            var shadowRoot      = this.shadowRoot = this.getDOMNode().parentNode.parentNode.createShadowRoot(),
                templateElement = $document.createElement('template');

            // Obtain the HTML from the component's `render` method.
            templateElement.content.appendChild(this.getDOMNode().cloneNode(true));

            // Attach CSS
            if (this.cssDocuments) {
                this.attachCSSDocuments(templateElement);
            }
            if (this.cssSource) {
                this.attachCSSSource(templateElement);
            }

            // Append the template node's content to our component.
            var clone = $document.importNode(templateElement.content, true);
            shadowRoot.appendChild(clone);
            this.interceptEvents();

        },

        /**
         * @method interceptEvents
         * @return {void}
         */
        interceptEvents: function() {

            /**
             * @method redirectEvent
             * @param event {Object}
             * @return {Function}
             */
            var redirectEvent = function(event) {

                event.stopPropagation();
                event.preventDefault();

                var targetId = event.target.getAttribute('data-reactid'),
                    element = $document.querySelector('*[data-reactid="' + targetId + '"]');

                var customEvent = $document.createEvent('Events');
                customEvent.initEvent(event.type, true, false );
                element.dispatchEvent(customEvent);

            };

            // List of all events that should be intercepted and re-routed.
            var eventsList = ['click', 'dblclick', 'mouseup', 'mouseout', 'mouseover', 'mousedown', 'mouseenter',
                'mouseleave', 'contextmenu'];

            eventsList.forEach(function forEach(eventName) {
                this.shadowRoot.addEventListener(eventName, redirectEvent);
            }.bind(this));

        },

        /**
         * @method componentDidUpdate
         * @return {void}
         */
        componentDidUpdate: function() {

            var containerElement = this.shadowRoot.querySelector(':not(style)');
            containerElement.innerHTML = '';

            var domNode    = this.getDOMNode(),
                children   = domNode.children,
                childCount = children.length;

            for (var index = 0; index < childCount; index++) {
                containerElement.appendChild(domNode.children[index].cloneNode(true));
            }

        },


        /**
         * @method createStyle
         * @param  {HTMLElement} element
         * @param  {string} styleContent Content style for given element
         * @return {HTMLElement}              
         */
        createStyle: function(element, styleContent) {
            // Construct the HTML for the external stylesheets.
            var styleElement = $document.createElement('style');
            styleElement.innerHTML = styleContent;
            element.content.appendChild(styleElement);
            return element;
        },


        /**
         * @method attachCSSSource
         * @param  {HTMLElement} element
         * @return {HTMLElement}      
         */
        attachCSSSource: function(element) {
            this.createStyle(element, this.cssSource);
        },


        /**
         * @method attachCSSDocuments
         * @param element {HTMLElement}
         * @return {HTMLElement}
         */
        attachCSSDocuments: function(element) {
            var cssDocumentsPrefix = '',
                that = this;
            if (typeof this.cssDocumentsPrefix === 'string') {
                cssDocumentsPrefix = this.cssDocumentsPrefix;
            }
            this.cssDocuments.forEach(function forEach(cssDocument) {
                var styleContent = '@import "' + cssDocumentsPrefix + cssDocument + '"';
                that.createStyle(element, styleContent);
            });
            return element;
        }

    };

})(window, window.document);