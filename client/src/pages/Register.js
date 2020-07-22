import React from 'react'
import { Link } from 'react-router-dom'

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault();
    }

    render() {
        let {name, email, password, confirmPassword, error} = this.state
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4"> Register Now </h1>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                id="name"
                                value={name}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your confirmPassword"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <Link to='/login'> Already have account? Login Here </Link>
                        <button className="btn btn-primary d-block my-2">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register