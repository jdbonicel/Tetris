var Collection = require( 'std/Collection' );
var Piece = require( 'models/Piece' );



module.exports = Collection.extend( {
    model: Piece,

    url: '/pieces',

} );
