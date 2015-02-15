(function main($react) {

    /**
     * @class ReactShadow
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ReactShadow
     */
    var AppExample = $react.createClass({

        /**
         * @property mixins
         * @type {Array}
         */
        mixins: [ReactShadow],

        /**
         * @property {array} cssDocuments
         */
        cssDocuments: ['../css/Component.css', '../css/component/First.css'],

        /**
         * @property {string} cssSource
         */
        cssSource: 'section { background-color: green; }',

        /**
         * @method getInitialState
         * @return {{refreshed: number}}
         */
        getInitialState: function getInitialState() {
            return { refreshed: 0 };
        },

        /**
         * @method componentDidMount
         * @return {void}
         */
        componentDidMount: function componentDidMount() {
            this.startInterval();
        },

        /**
         * @method startInterval
         * @return {void}
         */
        startInterval: function startInterval() {

            var interval = setInterval(function() {
                this.setState({ refreshed: this.state.refreshed + 1 });
            }.bind(this), 1000);

            this.setState({ interval: interval });

        },

        /**
         * @method reset
         * @return {void}
         */
        reset: function reset() {
            clearInterval(this.state.interval);
            this.setState({ refreshed: 0 });
            this.startInterval();
        },

        /**
         * @method render
         * @return {XML}
         */
        render: function render() {
            return <section onClick={this.reset} title="Reset Counter">
                       <h1 className="title">{this.state.refreshed}</h1>
                   </section>
        }

    });

    // Mount the node into the DOM!
    var mountNode  = document.querySelector('*[data-react-shadow="first"]');

    $react.render(<AppExample/>, mountNode);

})(window.React);