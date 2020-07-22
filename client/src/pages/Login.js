import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
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
        let {email, password} = this.state
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4"> Login Now </h1>
                    <form onSubmit={this.submitHandler}>
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
                        <Link to='/register'> Don't have account? Register Here </Link>
                        <button className="btn btn-primary d-block my-2">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login