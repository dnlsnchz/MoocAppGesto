var app = {
    inicio: function(){
        DIAMETRO_BOLA = 50;
        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;
        console.log(alto);
        console.log(ancho);
        app.vigilaSensores();
        app.iniciaJuego();
    },

    iniciaJuego: function(){
        function preload(){
            game.stage.backgroundColor = '#f27d0c';
            game.load.image('bola','assets/bola.png')
        }

        function create(){
            game.add.sprite(app.inicioX(),app.inicioY(),'bola');
        }

        var estados = {preload: preload, create: create};
        var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
    },

    inicioX : function(){
        return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
    },

    inicioY: function(){
        return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA);
    },

    numeroAleatorioHasta: function(limite){
        return Math.floor(Math.random() * limite);
    },

    vigilaSensores: function(){
        function onError(){
            console.log('onError');
        }

        function onSuccess(datosAceleracion){
            app.detectarAgitacion(datosAceleracion);
        }

        navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 1000});
    },

    detectarAgitacion: function(datosAceleracion){
        agitacionX = datosAceleracion.x > 10;
        agitacionY = datosAceleracion.y > 10;

        if (agitacionX || agitacionY){
            console.log('agitado')
        }
    }
};
//Iniciamos
if ('addEventListener' in document){
    document.addEventListener('deviceready',function(){
        app.inicio();
    },false)
}