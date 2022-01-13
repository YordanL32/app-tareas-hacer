const Tarea = require("./Tarea")
const colors = require('colors')
class Tareas {
    _listado = {}
    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }

    constructor() {
        this._listado = {}
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }
    borrarTarea(id =''){
        if(this._listado[id]){
           delete this._listado[id] 
        }
      
    }
    cargarTareasFormArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })

    }
    listadoCompleto() {
        this.listadoArr.forEach(({ desc, completadoEn }, index) => {
            let id = colors.green(index + 1 + '.')
            let status = completadoEn == null ? 'Pendiente'.red : 'Completada'.green
            console.log(`${id} ${desc} :: ` + status)
        })

    }
    listarPendientesCompletadas(completada = true) {
        let contador  = 0
        this.listadoArr.forEach(({ desc, completadoEn }, index) => {
          //  let id = colors.green(index + 1 + '.')
            
            let status = completadoEn == null ? 'Pendiente'.red : 'Completada'.green
            if (completada) {
                if (completadoEn != null) {    
                    contador += 1                             
                    console.log(`${contador+'.'}`.green+` ${desc} :: ` + completadoEn.green)
                }
            } else {
                if (completadoEn == null) {
                    contador += 1
                    console.log(`${contador+'.'}`.green+` ${desc} :: ` + status)
                }
            }


        })


    }
    toggleCompletadas(ids = []){
        ids.forEach(id =>{
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}
module.exports = Tareas