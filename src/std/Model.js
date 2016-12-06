var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

module.exports = Backbone.Model.extend( {

    constructor: function () {

        // Backbone.Model( data, options )
        this.options = arguments[ 1 ] || {};

        Backbone.Model.apply( this, arguments );

    }
} );
