const { createApp } = Vue

  createApp({
    data() {
      return {
        datos: null,
        parametro: null,
        idEvento: null,
        evento: null
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(resolve => resolve.json())
            .then(data => {
                this.datos=data
                this.parametro= location.search;
                let urlParametro= new URLSearchParams(this.parametro);
                this.idEvento=urlParametro.get("parametro")
                this.evento=data.events.find(evento => evento._id == this.idEvento);
            })
            .catch(err => err)
    }

  }).mount('#app')