import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import PaginationData from './PaginationData';
import Spinner from './Spinner';
import {PropTypes} from "proptype";

class ShoppingList extends Component {
  static propType = {
        item: PropTypes.object.isRequired
    };

    render() {
        const {item} = this.props;
        return (
            <Container>
                {item.loading ? <Spinner/> : null}
                <PaginationData/>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
});
export default connect(mapStateToProps, null)(ShoppingList);