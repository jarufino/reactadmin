import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigate=useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === 'admin') {
                        navigate('/dashboard')
                    } else {
                        navigate('/employee_detail/' + result.data.id)
                    }
                } else {
                    navigate('/')
                }
            }).catch(err => console.log(err))

    }, [])
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage fundo_start">
            <div className="p-3 rounded w-25 border loginForm">
                <h2>Entrar como:</h2>
                <div>
                    <div className='d-flex justify-content-between mt-3 mb-2'>
                        <button type="button" className='btn btn-primary' onClick={() =>{navigate('/employee_login')}}>Funcionário</button>
                        <button type="button" className='btn btn-secondary' onClick={() =>{navigate('/adminlogin')}}>Administrador</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Start
