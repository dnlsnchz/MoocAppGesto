var app = {
    model: {
      "notas":  [{"titulo": "Compra Pan", "contenido": "Oferta en la panederia de la escuela"}]
    },

    inicio: function(){
        this.iniciaFastClick();
        this.iniciaBotones();
        this.refrescaLista();
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaBotones: function(){
        var salvar = document.querySelector('#salvar');
        var anadir = document.querySelector('#anadir');

        anadir.addEventListener('click', this.mostrarEditor, false);
        salvar.addEventListener('click', this.salvarNota, false);
    },

    mostrarEditor: function(){
        document.getElementById('titulo').value='';
        document.getElementById('comentario').value='';
        document.getElementById('note-editor').style.display='block';
        document.getElementById('titulo').focus();
    },

    salvarNota:function(){
        app.construirNota();
        app.ocultarEditor();
        app.refrescaLista();
    },

    refrescaLista: function(){
        var div = document.getElementById('notes-list');
        div.innerHTML = this.anadirNotasLista();
    },

    anadirNotasLista: function(){
        var notas = this.model.notas;
        var notasDivs = '';
        for (var i in notas){
            var titulo = notas[i].titulo;
            notasDivs = notasDivs + this.anadirNota(i,titulo);
        }
        return notasDivs;
    },

    anadirNota: function(id, titulo){
        return "<div class= 'note-item' id= 'notas["+id+"]' >" + titulo + "</div>";
    },

    construirNota: function(){
        var notas = app.model.notas;
        notas.push({'titulo': app.extraerTitulo() , 'contenido': app.extraerComentario()});
    },

    extraerTitulo: function(){
        return document.getElementById('titulo').value;
    },

    extraerComentario: function(){
        return document.getElementById('comentario').value ;
    },

    ocultarEditor:function(){
        document.getElementById('note-editor').style.display='none';
    }
}

//Iniciamos
if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        app.inicio();
    },false);
}