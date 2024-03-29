import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCategory() {
    const [category, setCategory] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }                
            }, [])
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-25 border'>
                <h2>Adicionar Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Categoria:</strong></label>
                        <input type="text" name='category' placeholder='Entre com a categoria' onChange={(e) => setCategory(e.target.value)} className='form-control rounded' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Adicione Categoria</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory
