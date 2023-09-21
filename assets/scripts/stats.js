const { createApp } = Vue

  createApp({
    data() {
      return {
        eventos:[],
        datos:[],
        eventosFuturos:[],
        eventosPasados:[],
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(resolve => resolve.json())
            .then(data => {
                this.eventos=data.events
                this.datos=data
                this.eventosFuturos=this.eventos.filter(evento => this.datos.currentDate<evento.date)
                this.eventosPasados=this.eventos.filter(evento => this.datos.currentDate>evento.date)   
            })
            .catch(err => err)
    },

    methods:{
        calcularEstadisticasEventos(eventos) {
            let categorias = Array.from(new Set(eventos.map(evento => evento.category)));
                
            let ganancias = categorias.map(categoria => {
                let eventosCategoria = eventos.filter(evento => evento.category == categoria);
                return eventosCategoria.reduce((acumulador, evento) => acumulador + (evento.price * (evento.assistance || evento.estimate)), 0);
            });
              
            let totAsistenciaEstimado = categorias.map(categoria => {
                let eventosCategoria = eventos.filter(evento => evento.category == categoria);
                return eventosCategoria.reduce((acumulador, evento) => acumulador + (evento.assistance || evento.estimate), 0);
            });
              
            let capacidadTotal = categorias.map(categoria => {
                let eventosCategoria = eventos.filter(evento => evento.category == categoria);
                return eventosCategoria.reduce((acumulador, evento) => acumulador + evento.capacity, 0);
            });
            
            let porcAsistenciaEstimado = totAsistenciaEstimado.map((asistenciaEstimado, indice) => ((asistenciaEstimado / capacidadTotal[indice]) * 100).toFixed(2));
            
            return [categorias, ganancias, porcAsistenciaEstimado]
        },
        calcularValoresPrimerTabla(){
            let arrayPorcAsistencias = this.eventosPasados.map(evento => [evento.name, ((evento.assistance / evento.capacity) * 100).toFixed(2)]).sort((evento1,evento2)=>evento2[1] - evento1[1])
            let menorAsistencia= arrayPorcAsistencias[arrayPorcAsistencias.length-1]
            let mayorAsistencia= arrayPorcAsistencias[0]
            let mayorAforo= this.eventos.map(evento => [evento.name, evento.capacity]).sort((evento1,evento2)=>evento2[1] - evento1[1])[0];
          
            return [mayorAsistencia, menorAsistencia, mayorAforo]
            
        },
    },
  }).mount('#app')