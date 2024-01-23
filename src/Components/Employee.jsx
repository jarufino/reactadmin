import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Employee() {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.timeLog(err))
  }, [])
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        }else{
          alert(result.data.Error)
        }
      })
  }
  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Funcionários</h3>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-success'>Adicionar Funcionário</Link>
      <div className="mt-3">
        <table className='table'>
          <thead>
            <tr>
              <th>Nome:</th>
              <th>Imagem:</th>
              <th>Email:</th>
              <th>Endereço:</th>
              <th>Salário:</th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><img src={`http://localhost:3000/Images/` + e.image} className='employee_image' /></td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link to={'/dashboard/edit_employee/' + e.id} className='btn btn-info btn-sm me-2'>Editar</Link>
                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>Excluir</button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
