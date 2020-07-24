import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../store/actions/authActions'

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                {
                    this.props.auth.isAuthenticate ?
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.logout
                        (this.props.history)}
                    >
                        Logout
                    </button> :
                    <Link to='/login'>
                        <button>Login</button> 
                    </Link>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Home)