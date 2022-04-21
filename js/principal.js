var juego = new Phaser.Game(800, 800, Phaser.CANVAS, "bloque_juego");

juego.state.add("Menu", Menu);
juego.state.add("Juego", Juego);

juego.state.start("Menu");