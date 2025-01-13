//API LIB

class API {
  constructor(props) {
    this.props = props;
    this.db = props.db ?? localStorage;
  }

  set(props /*ID, ClientObj*/){
    const data = JSON.parse(this.db.clients);
    
    try {
      data[props.client.patient_id] = props.client;
      console.log(data);

      this.db.clients = JSON.stringify(data)
      console.log(this.db.clients[props.client.id])

    } catch (e) {
      return `Error Found: ${e}`;
    }
  }

  pop(props /*ID*/){
    const data = JSON.parse(this.db.clients);
    
    for(let i in data){
      console.log(data[i].patient_id)
      if(props.id === data[i].patient_id){
	try {
	  delete data[props.id]

	  this.db.clients = JSON.stringify(data)
	} catch(e) {
  	  return `Error Removing Client: ${e}`;
	}
      } //else (props.id !== data[i].patient_id)  `Client Not Found`;
    }
  }

  push(props /*ID, client*/){ //used to update
    const data = JSON.parse(this.db.clients);

    for (let i in data) {
      try{
        data[props.id] = props.client;
	console.log(data)

	this.db.clients = JSON.stringify(data)
	console.log(data)
      } catch(e) {
	return(`Bad Update: ${e}`)
      }
    }
  }

  get(){
    try {
      return JSON.parse(this.db.clients);

      //console.log(this.db.clients)
    } catch (e) {
      return `Error: ${e}`
    }
  }

}

export const init = db => { return new API({ db: db }) }
export const [ set, pop, push, get ] = [ init.set, init.pop, init.push, init.get ];

