var app={
    inicio:function(){
        this.iniciaFastClick();
        this.iniciaBoton();
    },
    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },
    iniciaBoton:function(){
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click',this.tomarFoto);
    },
    tomarFoto:function(){
        var opciones = {
            quality: 50,
            destinationType: Camera.DestinationType.File_URI,
            targetwidth: 300,
            targetheight: 300,
            correctOrientation: true 
        };
        navigator.camera.getPicture(app.fotoTomada,app.errorAlTomarFoto,opciones);
    },
    fotoTomada:function(imageURI){
        var img = document.createElement('img');
        img.onload = function(){
            app.pintarFoto(img);
        }
        img.src=imageURI;
    },
    pintarFoto:function(img){
        var canvas= document.querySelector('#foto');
        var context = canvas.getContext('2d');
        canvas.width= img.width;
        canvas.height = img.height;
        context.drawImage(img,0,0,img.width,img.height);
    },
    errorAlTomarFoto:function(menssage){
        console.log('Fallo al tomar foto o toma cancelada' + menssage);
    }
};
//Iniciamos
if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        FastClick.attach(document.body);
        app.inicio();
    },false);
}