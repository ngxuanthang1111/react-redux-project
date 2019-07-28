import React, {Component} from 'react';
import * as actions from '../../actions/authAction';
import {connect} from 'react-redux';
import {NavLink} from "reactstrap";
import {PropTypes} from "proptype";
class Logout extends Component {

    static propType = {
        logout : PropTypes.func.isRequired
    };

    render() {
        return (
            <React.Fragment>
                <NavLink onClick={this.props.logout} style={{cursor: "pointer"}}>Log out</NavLink>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps= (dispatch,action)=>{
    return{
        logout: ()=>{
            dispatch(actions.logout())
        }
    }
};

export default connect(null, mapDispatchToProps)(Logout);