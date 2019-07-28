import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from "proptype";
import * as actions from "../../actions/authAction"
import * as errorAction from '../../actions/errorAction'
import {Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink} from "reactstrap";

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            modal: false,
            msg: null,
        }
    }

    static propsType = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        clearError: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired
    };
    //change state modal
    toggle = () => {
        // Clear errors
        this.props.clearError();
        this.setState({
            modal: !this.state.modal
        });
    };
    //get value from input
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg: null});
            }
        }
        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    //submit login
    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        // Attempt to login
        this.props.login(user);
    };

    onCancel = () => {
        this.toggle()
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} style={{cursor: "pointer"}}>Log In</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Log In </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='email'>Email</Label>
                                <Input
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder='Enter Your Email'
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for='password'>Password</Label>
                                <Input
                                    type="password"
                                    id='password'
                                    name='password'
                                    placeholder='Enter Password'
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button
                                        color='success'
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        color='success'
                                        style={{marginLeft: "1rem"}}
                                        onClick={this.onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        login: ({email, password}) => {
            dispatch(actions.login({email, password}))
        },
        clearError: (() => {
            dispatch(errorAction.clearErrors())
        })
    }
};
const mapStateToProps = (state) => {
    return {
        error: state.error,
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);