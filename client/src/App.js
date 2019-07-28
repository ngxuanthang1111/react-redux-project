import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import './style/App.css'
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from '../src/components/ItemModal'
import {Container} from "reactstrap";
import {loadUser} from "./actions/authAction";

class App extends Component {
    //dispatch loaduer after render
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavBar/>
                    <Container>
                        <ItemModal/>
                        <ShoppingList/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;