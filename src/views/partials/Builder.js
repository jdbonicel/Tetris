var View = require( 'std/View' );
var $ = require( 'jquery' );
var Config = require( 'views/partials/Config' );
var Template = require( 'templates/partials/builder.html' );


var Pieces = require( 'Collections/Pieces' );
var Players = require( 'Collections/Players' );

module.exports = View.extend( {

    template: function () {
        return _.template( Template() );
    },

    constructor: function () {

        //listeners
        this._onKeydown = this.onKeydown.bind( this );

        View.prototype.constructor.apply( this, arguments );
    },

    initialize: function () {
        View.prototype.initialize.apply( this, arguments );

        this.canvas = document.getElementById( 'tetris' );
        this.context = this.canvas.getContext( '2d' );
        this.context.scale( 20, 20 );

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        //create scene
        this.scene = this.createScene( 12, 20 );

        /* This setting can be differently but it's just to show you  *
         * that I can use collections and models with backbone          */
        /***************************/

        //create a collections of pieces and players
        this.piecesCollection = new Pieces;
        this.playersCollection = new Players;

        //create one piece and player with default value
        this.piecesCollection.create();
        this.playersCollection.create();

        // get the piece and the player
        this.piece = this.piecesCollection.models[ 0 ];
        this.player = this.playersCollection.models[ 0 ];
        /*******************************/

        //set the player
        this.playerReset();

        //set the score
        this.updateScore();

        //set the requestAnimationFrame
        this.update();

    },

    delegateEvents: function () {
        $( document ).on( 'keydown', this._onKeydown );
    },

    undelegateEvents: function () {
        $( document ).off( 'keydown', this._onKeydown );
    },

    onKeydown: function ( e ) {

        //left
        if ( e.keyCode === 37 ) {
            this.playerMove( -1 );
        }
        //right
        else if ( e.keyCode === 39 ) {
            this.playerMove( 1 );
        }
        //down
        else if ( e.keyCode === 40 ) {
            this.playerDrop();
        }
        //up
        else if ( e.keyCode === 38 ) {
            this.playerRotate( -1 );
        }
    },

    sceneSweep: function () {
        let rowCount = 1;
        outer: for ( let y = this.scene.length - 1; y > 0; --y ) {
            for ( let x = 0; x < this.scene[ y ].length; ++x ) {
                if ( this.scene[ y ][ x ] === 0 ) {
                    continue outer;
                }
            }

            const row = this.scene.splice( y, 1 )[ 0 ].fill( 0 );
            this.scene.unshift( row );
            ++y;

            var counter = this.player.get( 'score' ) + ( rowCount * 10 );
            this.player.set( 'score', counter );
            rowCount *= 2;
        }
    },


    // boolean
    //return true if collide
    collide: function ( scene, player ) {
        const m = player.get( 'matrix' );
        const o = player.get( 'pos' );
        for ( let y = 0; y < m.length; ++y ) {
            for ( let x = 0; x < m[ y ].length; ++x ) {
                if ( m[ y ][ x ] !== 0 &&
                    ( scene[ y + o.y ] &&
                        scene[ y + o.y ][ x + o.x ] ) !== 0 ) {
                    return true;
                }
            }
        }
        return false;
    },

    //create the Scene
    createScene: function ( w, h ) {
        const matrix = [];
        while ( h-- ) {
            matrix.push( new Array( w ).fill( 0 ) );
        }
        return matrix;
    },

    // create the piece with type like attribute
    // I,J,S,Z,T,O,L
    createPiece: function ( type ) {
        this.piece.set( {
            color: Config.pieces[ parseInt( type ) ].color,
            type: Config.pieces[ parseInt( type ) ].type,
            matrix: Config.pieces[ parseInt( type ) ].matrix
        } );
    },

    drawMatrix: function ( matrix, offset ) {
        matrix.forEach( function ( row, y ) {
            row.forEach( function ( value, x ) {

                var img = new Image();
                if ( value !== 0 ) {
                    //Add image on each block
                    img.src = '/src/images/block_' + Config.pieces[ value ].color + '.png';
                }
                this.context.drawImage( img, ( x + offset.x ), ( y + offset.y ), 1, 1 );
            }.bind( this ) );
        }.bind( this ) );
    },

    draw: function () {

        // on each frame redraw the matrix
        this.context.fillStyle = '#000';
        this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        this.drawMatrix( this.scene, {
            x: 0,
            y: 0
        } );
        this.drawMatrix( this.player.get( 'matrix' ), this.player.get( 'pos' ) );
    },

    merge: function ( scene, player ) {

        // merge the player to the scene in this way the scene have the player.matrix value saved
        player.get( 'matrix' ).forEach( ( row, y ) => {
            row.forEach( ( value, x ) => {
                if ( value !== 0 ) {
                    scene[ y + player.get( 'pos' ).y ][ x + player.get( 'pos' ).x ] = value;
                }
            } );
        } );
    },

    rotate: function ( matrix, dir ) {

        // to have a 90° rotation you need to:

        //switch the first and last column of the matrix
        for ( let y = 0; y < matrix.length; ++y ) {
            for ( let x = 0; x < y; ++x ) {
                [
                    matrix[ x ][ y ],
                    matrix[ y ][ x ],
                ] = [
                    matrix[ y ][ x ],
                    matrix[ x ][ y ],
                ];
            }
        }

        // then reverse
        matrix.reverse();
    },

    playerDrop: function () {
        this.player.get( 'pos' ).y++;
        if ( this.collide( this.scene, this.player ) ) {
            this.player.get( 'pos' ).y--;
            this.merge( this.scene, this.player );
            this.playerReset();
            this.sceneSweep();
            this.updateScore();
        }
        this.dropCounter = 0;
    },

    playerMove: function ( offset ) {
        this.player.get( 'pos' ).x += offset;
        if ( this.collide( this.scene, this.player ) ) {
            this.player.get( 'pos' ).x -= offset;
        }
    },

    playerReset: function () {

        //create a piece with random value
        const pieces = '1234567';
        this.createPiece( pieces[ pieces.length * Math.random() | 0 ] );

        //set the player
        this.player.set( 'matrix', this.piece.get( 'matrix' ) );

        //set the position
        this.player.get( 'pos' ).y = 0;
        this.player.get( 'pos' ).x = ( this.scene[ 0 ].length / 2 | 0 ) -
            ( this.player.get( 'matrix' )[ 0 ].length / 2 | 0 );

        //check if collide and set all the scen and score
        if ( this.collide( this.scene, this.player ) ) {
            this.scene.forEach( row => row.fill( 0 ) );
            this.player.set( 'score', 0 );
            this.updateScore();
        }
    },

    playerRotate: function ( dir ) {
        const pos = this.player.get( 'pos' ).x;
        let offset = 1;
        this.rotate( this.player.get( 'matrix' ), dir );
        while ( this.collide( this.scene, this.player ) ) {
            this.player.get( 'pos' ).x += offset;
            offset = -( offset + ( offset > 0 ? 1 : -1 ) );
            if ( offset > this.player.get( 'matrix' )[ 0 ].length ) {
                this.rotate( this.player.get( 'matrix' ), -dir );
                this.player.get( 'pos' ).x = pos;
                return;
            };
        };
    },

    update: function ( time = 0 ) {
        const deltaTime = time - this.lastTime;

        this.dropCounter += deltaTime;
        if ( this.dropCounter > this.dropInterval ) {
            this.playerDrop();
        }

        this.lastTime = time;

        this.draw();
        requestAnimationFrame( this.update.bind( this ) );
    },

    updateScore: function () {
        document.getElementById( 'score' ).innerText = this.player.get( 'score' );
    }


} );
