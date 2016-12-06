var Model = require( 'std/Model' );

module.exports = Model.extend( {

    urlRoot: '/pieces',

    defaults: {
        color: 'cyan',
        type: 'I',
        matrix: [
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
        ]
    },

    getName: function () {
        return 'Piece';
    }

} );
