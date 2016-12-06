var Model = require( 'std/Model' );

module.exports = Model.extend( {

    urlRoot: '/players',

    defaults: {
        pos: {
            x: 0,
            y: 0
        },
        matrix: null,
        score: 0,
    },

    getName: function () {
        return 'Player';
    }

} );
