import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
    error: string
}

function AddUser({error}: IProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [show, setShow] = useState(false);
    const [validation, setValidation] = useState(false);


    const handleAddUser: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const data = {firstName, lastName, age, phone, email};

        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }).then(() => {
            reset();
            setShow(false);
            alert("Successfully added!");
              document.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const reset = () => {
        setFirstName('')
        setLastName('')
        setAge('')
        setPhone('')
        setEmail('')
    }

    return (
        <>
            <div className='create-btn'>
                <button disabled={error.length !== 0} onClick={() => setShow(true)} className='btn btn-outline-success'>
                    Add new user
                </button>
            </div>

            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                    reset();
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='editModal' onSubmit={handleAddUser} className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="validationServer01" className="form-label">First name</label>
                            <input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                // onMouseDown={() => setValidation(true)}
                                placeholder='Anne'
                                type="text"
                                className={"form-control " + (firstName.length === 0  && validation ? "is-invalid" : "border-success")}
                                id="validationServer01"
                                required
                            />
                                <span className="invalid-feedback">
                                    This field can not be empty
                                </span>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationServer02" className="form-label">Last name</label>
                            <input
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                // onMouseDown={() => setValidation(true)}
                                placeholder='Marie'
                                type="text"
                                className={"form-control " + (lastName.length === 0 && validation ? "is-invalid" : "border-success")}
                                id="validationServer02"
                                required
                            />
                                <span className="invalid-feedback">
                                    This field can not be empty
                                </span>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationServer03"  className="form-label">Age</label>
                            <input
                                value={age}
                                onChange={e => setAge(e.target.value)}
                                type="number"
                                // onMouseDown={() => setValidation(true)}
                                placeholder='18'
                                max={100}
                                min={18}
                                className={"form-control " + (age.length === 0 && validation ?  "is-invalid" : "border-success")}
                                id="validationServerUsername"
                                required
                            />
                                <span className="invalid-feedback">
                                        Please enter your age.
                                </span>
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="validationServerUsername" className="form-label">Phone number</label>
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                type="tel"
                                placeholder='(+992) 000-22-33-44'
                                pattern="[\(]{1}\+992[\)]{1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                // onMouseDown={() => setValidation(true)}
                                className={"form-control " + (phone.length === 0 && validation ? "is-invalid" : "border-success")}
                                id="validationServer03"
                                required
                            />
                                <span className="invalid-feedback">
                                    Please provide a valid phone number
                                </span>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="validationServer05" className="form-label">Email</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onMouseDown={() => setValidation(true)}
                                placeholder='admin@gmail.com'
                                type="email"
                                className={"form-control " + (email.length === 0 && validation ? "is-invalid" : "border-success")}
                                id="validationServer05"
                                required
                            />
                                <span className="invalid-feedback">
                                    Please provide a valid email.
                                </span>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShow(false);
                        reset();
                    }}>
                        Close
                    </Button>
                    <button form='editModal' className="btn btn-primary" type="submit">Save</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddUser;