//Imports============================================================

//import { createApp as create } from 'petite-vue';
import { createApp as create} from 'https://unpkg.com/petite-vue?module';
import { init, set, pop, push, get as res } from './modules/api.js';

//===================================================================

//variables==========================================================

const db = localStorage.clients;
const api = init();
window.api = api;

//==================================================================

//console.log(api.get())

//conf==============================================================

const rest = props => {
  return {
    db: props.db,
    current_id: props.current_id,
    result: null,
    clients: [],

    setClient() {
      api.set({ client: {
        patient_name: this.$refs.patient_name.value,
	patient_id: this.$refs.patient_id.value,
	concern_noconcern: this.$refs.concern_noconcern.value,
	reported_to: this.$refs.reported_to.value,
	ed_training: this.$refs.ed_training.value
      }})

      console.debug(this.clients)
    },

    popClient() {
      pop({ id: current_id })
    },

    pushClient() {
      push({
        id: $refs.patient_id.textContent,
	client: {
	  patient_name: this.$refs.patient_name.value,
	  patient_id: this.$refs.patient_id.value,
	  concern_noconcern: this.$refs.concern_noconcern.value,
	  reported_to: this.$refs.reported_to.value,
	  ed_training: this.$refs.ed_training.value
	}
      })
    },

    getClients() {
      //console.log(api.get())
      const data = api.get();
      
      if (data !== '{}') {
        for(let client in data) {
	  if(data[client].patient_id.length != 0 ){
            this.clients.push(data[client])
	  }
	  console.log(data[client].patient_id.length)
	  console.table(this.clients)
        }
      }else return ;
    },

    printTable() {
      this.result = this.$refs.result.innerHTML;
      let doc = window.open('', '_blank', 'width=800,height=600')

      let style = `
        body {
	  display: flex;
	  justify-content: space-evenly;
	}

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        th, td {
          border: 1px solid black;
          padding: 10px;
          text-align: left;
        }

        th {
          /*background-color: #f4f4f4;*/
          font-weight: bold;
          text-align: center;
        }

        td {
          text-align: center;
        }

        tr:nth-child(even) {
          /*background-color: #f9f9f9*/;
        }

        td {
          text-align: left;
        }
      `

      doc.document.write(`
        <!doctype HTML>
	<html>
	  <head>
	    <title>Printed File</title>

            <style>${style}</style>
	  </head>

	  <body>

	    <main>
	      <section>

	        <article>
		  ${this.result}
		</article>

	      </section>
	    </main>

	  </body>
	</html>
      `);
     
      doc.window.print();
    }
  }
}

//==================================================================

//init==============================================================

create({
  rest
}).mount()

//==================================================================

//load==============================================================

window.onload = () => {
  console.log("initializing...");
  !db ? localStorage.setItem('clients', '{}') : console.debug('all done');
}

//==================================================================
