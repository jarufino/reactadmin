import React, { useState } from 'react'
import axios from 'axios'
import './styles.css'
import { useNavigate } from 'react-router'

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem('valid', true)
                    navigate('/employee_detail/' + result.data.id)
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className="text-warning">
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <br />
                        <input type="email" name="email" id="email" placeholder='example@example.com.br' autoComplete='off'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Senha:</strong></label>
                        <br />
                        <input type="password" name="password" id="password" placeholder='Digite sua senha' autoComplete='off'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Entre</button>
                    <br />
                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick" />
                        <label htmlFor="checkbox"><strong>Aceita nossos termos e condições?</strong></label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin
