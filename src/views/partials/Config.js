// configuration of each pieces
var config = {
    pieces: [ null, {
        type: 'I',
        matrix: [
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 1, 0, 0 ],
        ],
        color: 'cyan'

    }, {
        type: 'L',
        matrix: [
            [ 0, 2, 0 ],
            [ 0, 2, 0 ],
            [ 0, 2, 2 ],
        ],
        color: 'orange'
    }, {
        type: 'J',
        matrix: [
            [ 0, 3, 0 ],
            [ 0, 3, 0 ],
            [ 3, 3, 0 ],
        ],
        color: 'blue'
    }, {
        type: 'O',
        matrix: [
            [ 4, 4 ],
            [ 4, 4 ],
        ],
        color: 'yellow'
    }, {
        type: 'Z',
        matrix: [
            [ 5, 5, 0 ],
            [ 0, 5, 5 ],
            [ 0, 0, 0 ],
        ],
        color: 'red'
    }, {
        type: 'S',
        matrix: [
            [ 0, 6, 6 ],
            [ 6, 6, 0 ],
            [ 0, 0, 0 ],
        ],
        color: 'green'
    }, {
        type: 'T',
        matrix: [
            [ 0, 7, 0 ],
            [ 7, 7, 7 ],
            [ 0, 0, 0 ],
        ],
        color: 'purple'
    } ]
};

module.exports = config;
