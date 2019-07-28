import React, {Component, Fragment} from 'react';
import ReactLoading from 'react-loading';
import {connect} from 'react-redux';
import {PropTypes} from "proptype";

class Spinner extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         isSpinner : true
    //     }
    // }
    static propType ={
        isLoading: PropTypes.bool
    };

    render() {
        return (
            <Fragment>
                <div style={{display: "flex" , justifyContent: "center"}}>
                    <ReactLoading type="spinningBubbles" color="blue" height={'10%'} width={'10%'}/>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        isLoading : state.item.loading
    }
};
export default connect(mapStateToProps, null)(Spinner);