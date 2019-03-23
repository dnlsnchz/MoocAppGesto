var app={
    inicio:function(){
        this.iniciaBotones();
        this.iniciaFastClick();
        this.iniciaHammer();
    },
    iniciaFastClick:function(){
        FastClick.attach(document.body);
    },
    iniciaBotones:function(){
        var botonClaro = document.querySelector('#claro');
        var botonOscuro = document.querySelector('#oscuro');
        botonClaro.addEventListener('click',this.ponloClaro,false) ;
        botonOscuro.addEventListener('click',app.ponloOscuro,false);
    },
    iniciaHammer:function(){
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);

        hammertime.get('pinch').set({enable:true});
        hammertime.get('rotate').set({enable:true});
        //tap doubletap pan swipe pinch rotate
        hammertime.on('tap doubletap swipe rotate',function(ev){
            document.querySelector('#info').innerHTML=ev.type+'!';
        });
    },
    ponloClaro:function(){
        document.body.className='claro';
    },
    ponloOscuro:function(){
        document.body.className='oscuro';
    },
};
/*Cuando hay fastclick: Inicio*/
if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        FastClick.attach(document.body);
        app.inicio();
    },false);
}
/*Cuando hay fastclick: Fin*/

/*Cuando no hay fastclick: Inicio*/
//app.inicio();
/*Cuando no hay fastclick: Fin*/