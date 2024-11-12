import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { showAlert } from '../functions'

const PastelesList = () => {
  const url = 'http://74.208.112.10:5000/api/Catalogo/Pastel/obtener-pasteles'
  const [pasteles, setPasteles] = useState([])
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [precioCompra, setPrecioCompra] = useState('')
  const [precioVenta, setPrecioVenta] = useState('')
  const [operation, setOperation] = useState(1)
  const [title, setTitle] = useState('')

  useEffect(() => {
    getPasteles()
  }, [])

  const getPasteles = async () => {
    const respuesta = await axios.get(url)
    setPasteles(respuesta.data)
  }

  const openModal = (op, id, nombre, precioCompra, precioVenta) => {
    setId('')
    setNombre('')
    setPrecioCompra('')
    setPrecioVenta('')
    setOperation(op)
    if(op === 1){
      setTitle('Registrar pastel')
    }
    else if(op === 2){
      setTitle('Editar pastel')
      setId(id)
      setNombre(nombre)
      setPrecioCompra(precioCompra)
      setPrecioVenta(precioVenta)
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus()
    },500)
  }

  const crearPastel = async(id, nombre, preciocompra, precioVenta) => {
    if(operation === 1){
      await axios({method: 'POST', url:'http://74.208.112.10:5000/api/Catalogo/Pastel/guardar-pastel', data:{nombre: nombre, precioCompra: preciocompra, precioVenta: precioVenta }}).then(function(respuesta){
        var tipo = respuesta.data[0]
        var msj = respuesta.data[1]
        showAlert(msj, tipo)
        if(tipo === 'success'){
          document.getElementById('btnCerrar').click()
          getPasteles()
        }
      })
      .catch(function(error){
        showAlert('Error en solicitud', 'error')
        console.log(error)
      })
    }
    else if (operation === 2){
      await axios({method: 'POST', url:'http://74.208.112.10:5000/api/Catalogo/Pastel/guardar-pastel', data:{id:id, nombre: nombre, precioCompra: preciocompra, precioVenta: precioVenta }}).then(function(respuesta){
        var tipo = respuesta.data[0]
        var msj = respuesta.data[1]
        showAlert(msj, tipo)
        if(tipo === 'success'){
          document.getElementById('btnCerrar').click()
          getPasteles()
        }
      })
      .catch(function(error){
        showAlert('Error en solicitud', 'error')
        console.log(error)
      })
    }
  }

  const deleteCake = async(id, parametros) => {
    await axios({method:'DELETE', url:'http://74.208.112.10:5000/api/Catalogo/Pastel/eliminar-pastel/'+ id, data:parametros}).then(function(respuesta){
      var tipo = respuesta.data[0]
      var msj = respuesta.data[1]
      showAlert(msj, tipo)
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click()
        getPasteles()
      }
    })
    .catch(function(error){
      showAlert('Error en solicitud', 'error')
      console.log(error)
    })
  }

  const deletePastel = async(id, name) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title:'Estás seguro de eliminar ' + name + '?',
      icon:'question',
      text: 'No podrás dar marcha atras',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        setId(id)
        deleteCake(id, name)
      }
      else{
        showAlert('El producto NO se eliminó', 'info')
      }
    })
  }

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio de compra</th>
                    <th>Precio de venta</th>
                    {/* <th>Estado</th> */}
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {pasteles.map((pastel, i) => (
                    <tr key={pastel.id}>
                      <td>{pastel.nombre}</td>
                      <td>${new Intl.NumberFormat('es-mx').format(pastel.precioCompra)}</td>
                      <td>${new Intl.NumberFormat('es-mx').format(pastel.precioVenta)}</td>
                      {/* <td>{pastel.habilitado}</td> */}
                      <td>
                        <button onClick={() => openModal(2, pastel.id, pastel.nombre, pastel.precioCompra, pastel.precioVenta )} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={() => deletePastel(pastel.id, pastel.name)} className='btn btn-danger'>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id='modalProducts' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button id='btnCerrar' type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-cake'></i>
                </span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
              </div>

              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-dollar'></i>
                </span>
                <input type='text' id='compra' className='form-control' placeholder='Precio de compra' value={precioCompra} onChange={(e) => setPrecioCompra(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-dollar'></i>
                </span>
                <input type='text' id='venta' className='form-control' placeholder='Precio de venta' value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => crearPastel(id, nombre, precioCompra, precioVenta)} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastelesList
