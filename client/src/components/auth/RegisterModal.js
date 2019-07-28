import React, {Component} from 'react';
import {
    Modal,
    Button,
    ModalBody,
    ModalHeader,
    FormGroup,
    Label,
    NavLink,
    Form,
    Input,
    Alert,
} from 'reactstrap';
import {connect} from 'react-redux';
import {PropTypes} from "proptype";
import * as actions from '../../actions/authAction';
import * as errorAction from '../../actions/errorAction';


class RegisterModal extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };


    //define proptype
    static propType = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
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

    //change state toggle
    toggle = () => {
        // Clear errors
        this.props.clearError();
        this.setState({
            modal: !this.state.modal
        })
    };
    //get value form input
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;
        //create user
        const newUser = {
            name,
            email,
            password
        };
        this.props.register(newUser);
        //close modal
    };

    //close form
    onCancel = () => {
        this.toggle()
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} style={{cursor: "pointer"}}>Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register Form</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    type="text"
                                    id='name'
                                    name='name'
                                    placeholder='Enter Your Name'
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
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
                                        Register
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
        register: ({name, email, password}) => {
            dispatch(actions.register({name, email, password}))
        },
        clearError: (() => {
            dispatch(errorAction.clearErrors())
        })
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);