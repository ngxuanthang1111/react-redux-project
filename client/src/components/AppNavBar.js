import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout'
import {connect} from 'react-redux';
import {PropTypes} from "proptype";

class AppNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    static propType = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLink = (
            <Fragment>
                <NavItem>
                     <span className='navbar-text mb-3'>
                         <strong>{user ? `Welcome ${user.email}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );
        const guestLink = (
            <Fragment>
                <NavItem>
                    <LoginModal/>
                </NavItem>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href='/'>React & Redux</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLink : guestLink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};


export default connect(mapStateToProps, null)(AppNavBar);