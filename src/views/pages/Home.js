var $ = require( 'jquery' );
var View = require( 'std/View' );
var BuilderView = require( 'views/partials/Builder' );

var Template = require( 'templates/layouts/page.html' );

module.exports = View.extend( {

    template: function () {
        return _.template( Template( {
            title: 'Tetris'
        } ) );
    },

    constructor: function () {
        View.prototype.constructor.apply( this, arguments );
    },

    initialize: function () {
        View.prototype.initialize.apply( this, arguments );

        new BuilderView( {
            el: this.$( '.content' )
        } );
    }
} );
