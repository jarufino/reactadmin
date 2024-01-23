import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        salary: '',
        category_id: '',
        image: '',
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('password', employee.password);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id);
                
        axios.post('http://localhost:3000/auth/add_employee', formData)        
        .then(result => {            
                if (result.data.Status) {
                    console.log(result.data.Status)
                    navigate('/dashboard/employee')
                } else {
                    console.log(employee)
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Adicionar Funcionário</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Nome:
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Digite o nome do fucnionário"
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="example@example.com.br"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">
                            Senha:
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Digite a senha"
                            onChange={(e) =>
                                setEmployee({ ...employee, password: e.target.value }) 
                            }
                        />
                        <label htmlFor="inputSalary" className="form-label">
                            Salário:
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Digite o salário"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Endereço Completo:
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="Entre com o endereço completo"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Setor:
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map((c) => {
                                return <option key={c.id} value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">
                            Selecione uma Imagem:
                        </label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Adicionar Funcionário
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;