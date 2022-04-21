var Menu = {

    preload: function(){
        //juego.stage.backgroundColor = "#FFF";
        juego.load.image("boton", "img/menu.png");
        juego.load.audio("musica", "audio/dbz.mp3");
    },

    create: function(){
        var boton = this.add.button(juego.width/2, juego.height/2, "boton", this.iniciarJuego, this);
        boton.anchor.setTo(0.5);

        musica = juego.add.audio("musica");
        musica.play("", 0, 0.2, true);
    },

    update: function(){

    },

    iniciarJuego: function(){
        juego.state.start("Juego");
    },
};