const { createApp } = Vue

  createApp({
    data() {
      return {
        eventos: [],
        categorias: [],
        filtroCheck:[],
        filtrados: [],
        valorBusqueda: "",
        filtroBuscador:[],
        sinRegistros:""
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(resolve => resolve.json())
            .then(data => {
                this.eventos=data.events
                this.filtrados=this.eventos
                this.categorias= Array.from(new Set(this.eventos.map(evento => evento.category)))
                this.sinRegistros="No information was found under those search criteria"
            })
            .catch(err => err)
    },

    methods:{
        filtrarPorCajasVerificacion(){
            if(this.filtroCheck.length==0){
                return this.filtroBuscador;
            }
            return this.filtroBuscador.filter(evento => this.filtroCheck.includes(evento.category));
        },
        filtrarPorBuscador(){
            return this.eventos.filter(evento => evento.name.toLocaleLowerCase().includes(this.valorBusqueda.toLocaleLowerCase()))
        },
        filtrarCruzado(){
            this.filtroBuscador= this.filtrarPorBuscador();
            const filtroCajasVerificacion= this.filtrarPorCajasVerificacion();
            this.filtrados= filtroCajasVerificacion;
        }
    },

    beforeUpdate(){

    }

  }).mount('#app')