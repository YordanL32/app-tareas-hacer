require('colors')
const { guardarDB, l, leerDB } = require('./helpers/guardarArchivos')
//const {mostrarMenu, pausa} = require('./helpers/mensajes')
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostarListadoTareasCheck } = require('./helpers/inquirer')
const Tarea = require('./models/Tarea')
const Tareas = require('./models/Tareas')
console.clear()
const main = async () => {

    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()
    if (tareasDB) {
        tareas.cargarTareasFormArray(tareasDB)
    }
    // await pausa()
    do {
        const option = await inquireMenu()
        //   if(opt !=='0') await pausa()
        //  console.log('ssss', option)    
        switch (option) {
            case '1':
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto()
                // console.log(tareas.listadoArr)
                break;
            case '3':
                tareas.listarPendientesCompletadas(true)
                // console.log(tareas.listadoArr)
                break;
            case '4':
                tareas.listarPendientesCompletadas(false)
                // console.log(tareas.listadoArr)
                break;
            case '5':
                const  ids  =await mostarListadoTareasCheck(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
               
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea Borrada')
                    }
                }
                break;
            default:
                break;
        }
        guardarDB(tareas.listadoArr)
        await pausa()
    } while (opt !== '0')


}
main()