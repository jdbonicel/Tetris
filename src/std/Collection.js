var _ = require( 'lodash' );
var Backbone = require( 'backbone' );

module.exports = Backbone.Collection.extend( {

    constructor: function () {

        // Backbone.Collection( data, options )
        this.options = arguments[ 1 ] || {};

        Backbone.Collection.apply( this, arguments );

    },

    at: function ( index ) {
        if ( index < 0 ) {
            return undefined;
        } else {
            return Backbone.Collection.prototype.at.call( this, index );
        }
    }

} );
