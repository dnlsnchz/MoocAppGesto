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
            targetWidht: 300,
            targetHeight: 300,
            correctOrientation: true 
        };
        navigator.camera.getPicture(app.fotoTomada,app.errorAlTomarFoto,opciones);
    },
    fotoTomada:function(imageURI){
        var image = document.querySelector('#foto');
        image.src=imageURI;
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