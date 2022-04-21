var PIECE_WIDTH = 200,
    PIECE_HEIGHT = 200,
    BOARD_COLS,
    BOARD_ROWS;

var piecesGroup,
    piecesAmount,
    shuffledIndexArray = [];

var musica;

var Juego = {

preload: function() {
         juego.load.spritesheet("background", "img/puzzle1.jpg", PIECE_WIDTH, PIECE_HEIGHT);
    },

create: function() {
        prepareBoard();
    },

};

function prepareBoard() {

    var piecesIndex = 0,
        i, j,
        piece;

    BOARD_COLS = Math.floor(juego.world.width / PIECE_WIDTH);
    BOARD_ROWS = Math.floor(juego.world.height / PIECE_HEIGHT);

    piecesAmount = BOARD_COLS * BOARD_ROWS;

    shuffledIndexArray = createShuffledIndexArray();

    piecesGroup = juego.add.group();

    for (i = 0; i < BOARD_ROWS; i++)
    {
        for (j = 0; j < BOARD_COLS; j++)
        {
            if (shuffledIndexArray[piecesIndex]) {
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
            }
            else { //Posición inicial de la pieza negra
                piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
                piece.black = true;
            }
            piece.name = 'piece' + i.toString() + 'x' + j.toString();
            piece.currentIndex = piecesIndex;
            piece.destIndex = shuffledIndexArray[piecesIndex];
            piece.inputEnabled = true;
            piece.events.onInputDown.add(selectPiece, this);
            piece.posX = j;
            piece.posY = i;
            piecesIndex++;
        }
    }

}

function selectPiece(piece) {

    var blackPiece = canMove(piece);

    //Si hay una pieza negra vecina
    if (blackPiece) {
        movePiece(piece, blackPiece);
    }

}

function canMove(piece) {

    var foundBlackElem = false;

    piecesGroup.children.forEach(function(element) {
        if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
            element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
            element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
            element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
            foundBlackElem = element;
            return;
        }
    });

    return foundBlackElem;
}

function movePiece(piece, blackPiece) {

    var tmpPiece = {
        posX: piece.posX,
        posY: piece.posY,
        currentIndex: piece.currentIndex
    };

    juego.add.tween(piece).to({x: blackPiece.posX * PIECE_WIDTH, y: blackPiece.posY * PIECE_HEIGHT}, 300, Phaser.Easing.Linear.None, true);

    //Cambio de lugar de piece y blackPiece
    piece.posX = blackPiece.posX;
    piece.posY = blackPiece.posY;
    piece.currentIndex = blackPiece.currentIndex;
    piece.name ='piece' + piece.posX.toString() + 'x' + piece.posY.toString();

    //piece es el nuevo negro
    blackPiece.posX = tmpPiece.posX;
    blackPiece.posY = tmpPiece.posY;
    blackPiece.currentIndex = tmpPiece.currentIndex;
    blackPiece.name ='piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

    //Después de cada movimiento, verifica si el rompecabezas está completo
    checkIfFinished();
}

function checkIfFinished() {

    var isFinished = true;

    piecesGroup.children.forEach(function(element) {
        if (element.currentIndex !== element.destIndex) {
            isFinished = false;
            return;
        }
    });

    if (isFinished) {
        showFinishedText();
    }

}

function showFinishedText() {

    var style = { font: "30px Century Gothic", fill: "#000", align: "center"};

    var text = juego.add.text(juego.world.centerX, juego.world.centerY, "¡Felicidades guerrero Z \nLo lograste!", style);

    text.anchor.set(0.5);

}

function createShuffledIndexArray() {

    var indexArray = [];

    for (var i = 0; i < piecesAmount; i++)
    {
        indexArray.push(i);
    }

    return shuffle(indexArray);

}

function shuffle(array) {

    var counter = array.length,
        temp,
        index;

    while (counter > 0)
    {
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
    
}