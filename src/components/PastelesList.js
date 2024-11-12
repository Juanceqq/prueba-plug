import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import { showAlert } from '../functions'

const PastelesList = () => {
  const url = 'http://74.208.112.10:5000/api/Catalogo/Pastel/obtener-pasteles'
  const [pasteles, setPasteles] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [operation, setOperation] = useState(1)
  const [title, setTitle] = useState('')

  useEffect(() => {
    getPasteles()
  }, [])

  const getPasteles = async () => {
    const respuesta = await axios.get(url)
    setPasteles(respuesta.data)
  }

  console.log(pasteles)

  return (
    <div className='App h-screen bg-gray-600 items-center justify-center'>
        <div className='px-4 pt-4'>
            <button>Juan</button>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio de compra
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio de venta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pasteles.map((pastel, i) => (
                            // <tr key={pastel.id}>
                            //     <td>{pastel.nombre}</td>
                            // </tr>
                            <tr key={pastel.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {pastel.nombre}
                                </th>
                                <td className="px-6 py-4">
                                    ${new Intl.NumberFormat('es-mx').format(pastel.precioCompra)}
                                </td>
                                <td className="px-6 py-4">
                                ${new Intl.NumberFormat('es-mx').format(pastel.precioVenta)}
                                </td>
                                <td className="px-6 py-4">
                                    {pastel.estado}
                                </td>
                                <td className="px-6 py-4">
                                    <div className='flex gap-4'>
                                        <button className='bg-blue-400 px-3 py-1 rounded-full'>
                                            <i className='fa-solid fa-edit text-white'></i>
                                        </button>
                                        <button className='bg-red-500 px-3 py-1 rounded-full'>
                                            <i className='fa-solid fa-trash text-white'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div></div>
    </div>
  )
}

export default PastelesList
