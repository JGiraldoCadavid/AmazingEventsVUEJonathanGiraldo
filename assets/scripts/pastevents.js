const { createApp } = Vue

  createApp({
    data() {
      return {
        eventos: [],
        eventosPasados: [],
        categorias: [],
        filtroCheck:[],
        filtrados: [],
        valorBusqueda: "",
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(resolve => resolve.json())
            .then(data => {
                this.eventos=data.events
                this.eventosPasados=this.eventos.filter(evento => data.currentDate>evento.date)
                this.filtrados=this.eventosPasados
                this.categorias= Array.from(new Set(this.eventosPasados.map(evento => evento.category)))    
            })
            .catch(err => err)
    },

    methods:{
        filtrarPorCajasVerificacion(eventosFiltroBuscador){
            if(this.filtroCheck.length==0){
                return eventosFiltroBuscador;
            }
            return eventosFiltroBuscador.filter(evento => this.filtroCheck.includes(evento.category));
        },
        filtrarPorBuscador(){
            return this.eventosPasados.filter(evento => evento.name.toLocaleLowerCase().includes(this.valorBusqueda.toLocaleLowerCase()))
        },

        filtrarCruzado(){
            const filtroBuscador= this.filtrarPorBuscador();
            const filtroCajasVerificacion= this.filtrarPorCajasVerificacion(filtroBuscador);
            this.filtrados= filtroCajasVerificacion;
        }

    }

  }).mount('#app')