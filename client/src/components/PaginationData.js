import React, {Component, Fragment} from 'react';
import {
    ListGroup,
    Button,
    ButtonGroup,
    Col,
    Card,
    CardText,
    CardTitle,
    ModalHeader, ModalBody, Form, FormGroup, Label, Input, Modal
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {PropTypes} from "proptype";
import * as actions from '../actions/itemAction'
import Pagination from "react-js-pagination";
import '../style/Pagination.css'

class PaginationData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            elements: [],
            modal: false,
            id: '',
            name : '',
            content: ''
        };
    }

    static propType = {
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    toggle = ()=>{
        this.setState({
            modal : !this.state.modal
        })
    };
    onCancel = () => {
        this.toggle()
    };
    componentDidMount() {

        this.props.getItems();
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };
    onUpdateClick = (id) => {
        // this.props.updateItem(id);
        // let newItems = this.props.item.items;
        console.log(id);
        // console.log(this.props.updateItem(id))
    };

    /*onSubmit = (e)=>{
        e.preventDefault();
        const newItem = {
            name: this.state.name,
            content : this.state.content
        };
        //add item via addItem action
        this.props.updateItem(newItem);

        //close modal
        this.toggle();
    };*/
    //set initial state for pagination
    componentWillReceiveProps(nextProps, nextContext) {
        //get first item cho element state
        const items = nextProps.item.items;
        this.setState({
            elements: items.slice(0, 5)
        })
    }

    //Pagination for list item
    handlePageChange = (pageNumber) => {
        let item = this.props.item.items;
        const itemsCountPerPage = 5;
        let startPoint = (pageNumber - 1) * itemsCountPerPage;
        let endPoint = pageNumber * itemsCountPerPage;
        this.setState({
            activePage: startPoint,
            elements: item.slice(startPoint, endPoint)
        });
    };

    render() {
        let {elements} = this.state;
        // let {item} = this.props;
        //set quality element for pagination
        elements = elements.map(({_id, name, content}) => (
            <CSSTransition key={_id} timeout={300}>
                <Fragment>
                    <Col sm="3" className="mt-4 mb-2">
                        <Card body>
                            <CardTitle>{name}</CardTitle>
                            <CardText>{content}</CardText>
                            {this.props.isAuthenticated ?
                                <ButtonGroup>
                                    <Button
                                        className="remove-btn mr-2"
                                        color="primary"
                                        size="md"
                                        onClick={() => this.onUpdateClick(_id)}
                                    >
                                        <i className="far fa-edit"></i>
                                    </Button>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="md"
                                        onClick={() => this.onDeleteClick(_id)}
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </Button>
                                </ButtonGroup>

                                : null}
                        </Card>
                    </Col>
                </Fragment>
            </CSSTransition>
        ));
        return (
            <Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Update Item</ModalHeader>
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
                                    onClick={this.onCancel}
                                >
                                    Update
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
                <ListGroup>
                    <TransitionGroup className="shopping-list" style={{display: 'flex', flexWrap: 'wrap'}}>
                        {elements}
                    </TransitionGroup>
                </ListGroup>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={this.props.item.items.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getItems: () => dispatch(actions.getItems()),
        deleteItem: (id) => {
            dispatch(actions.deleteItem(id))
        },
        // updateItem : (id)=>{
        //     dispatch(actions.updateItem(id))
        // }
    }
};

const mapStateToProps = (state) => {
    return {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationData);