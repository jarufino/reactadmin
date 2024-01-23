import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EmployeeDetail() {
    const [employee, setEmployee] = useState([])
    const { id } = useParams()
    const navigate=useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/' + id)
            .then(result => {
                setEmployee(result.data[0])
            })
            .catch(err => console.log(err))
    }, [])
    const handleLogout=()=>{
        axios.get('http://localhost:3000/employee/logout')
        .then(result=>{
            localStorage.removeItem('valid')
            if(result.data.Status){
                navigate('/')
            }
        })
        
    }
    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Perfil do {employee.name}</h4>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center mt-3">
                <img src={`http://localhost:3000/Images/` + employee.image} className='img-fluid' alt="" />
                <div className="d-flex align-items-center flex-column mt-5">
                    <h3>Nome: {employee.name}</h3>
                    <h3>Emai: {employee.email}</h3>
                    <h3>Salário: R$ {employee.salary}</h3>
                    <div>
                        <button className="btn btn-primary me-2">Editar</button>
                        <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
