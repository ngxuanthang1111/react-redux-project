import React, {Component} from 'react';
import {
    Modal,
    Button,
    ModalBody,
    ModalHeader,
    FormGroup,
    Label,
    Form,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from "../actions/itemAction";
import {PropTypes} from "proptype";

// import {addItem} from "../actions/itemAction";


class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            // content: '',
            //description: ''
        }
    }

    static propType = {
        auth: PropTypes.bool,
        item: PropTypes.object.isRequired
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };
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

        const newItem = {
            name: this.state.name,
            content : this.state.content
        };

        //add item via addItem action
        this.props.addItem(newItem);

        //close modal
        this.toggle();
    };

    //close form
    onCancel = () => {
        this.toggle()
    };

    render() {
        return (
            <div>
                {
                    this.props.isAuthenticated ? <Button
                        color="dark"
                        onClick={this.toggle}
                        type={{marginBottom: "2rem"}}
                    >
                        Add Item
                    </Button> : ""
                }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add Item To List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='item'>Name Item</Label>
                                <Input
                                    type="text"
                                    id='item'
                                    name='name'
                                    placeholder='Enter Name Item'
                                    onChange={this.onChange}
                                />
                                <Label for='content'>Content</Label>
                                <Input
                                    type="textarea"
                                    id='content'
                                    name='content'
                                    placeholder='Your Content'
                                    onChange={this.onChange}
                                />

                                <Button
                                    color='success'
                                    style={{marginTop: "2rem"}}
                                >
                                    Add Item to List
                                </Button>
                                <Button
                                    color='success'
                                    style={{marginTop: "2rem", marginLeft: "1rem"}}
                                    onClick={this.onCancel}
                                >
                                    Cancel
                                </Button>
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
        addItem: (value) => {
            dispatch(actions.addItem(value))
        }

    }
};

const mapStateToProps = (state) => {
    return {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);