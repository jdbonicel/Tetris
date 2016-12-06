var Collection = require( 'std/Collection' );
var Player = require( 'models/Player' );



module.exports = Collection.extend( {
    model: Player,

    url: '/players',

} );
