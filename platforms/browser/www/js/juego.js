var app = {
    inicio: function(){
        DIAMETRO_BOLA = 50;
        
        velocidadX=0;
        velocidadY=0;

        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;

        app.vigilaSensores();
        app.iniciaJuego();
    },

    iniciaJuego: function(){
        function preload(){
            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            game.stage.backgroundColor = '#f27d0c';
            game.load.image('bola','assets/bola.png')
        }

        function create(){
            bola = game.add.sprite(app.inicioX(),app.inicioY(),'bola');
            game.physics.arcade.enable(bola);

        }
        
        function update(){
            bola.body.velocity.y = (velocidadY * 300);
            bola.body.velocity.x = (velocidadX * -300);
        }

        var estados = {preload: preload, create: create, update: update};
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
            app.registrarDireccion(datosAceleracion);
        }

        navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 10});
    },

    detectarAgitacion: function(datosAceleracion){
        agitacionX = datosAceleracion.x > 10;
        agitacionY = datosAceleracion.y > 10;

        if (agitacionX || agitacionY){
            setTimeout(app.recomienza, 1000);
        }
    },

    recomienza: function(){
        document.location.reload(true);
    },

    registrarDireccion: function(datosAceleracion){
        velocidadX = datosAceleracion.x;
        velocidadY = datosAceleracion.y;
    }
};
//Iniciamos
if ('addEventListener' in document){
    document.addEventListener('deviceready',function(){
        app.inicio();
    },false)
}