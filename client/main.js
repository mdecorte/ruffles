import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom'
import Layout from './js/components/Layout'

class Test extends React.Component {
    render() {
        return <p>test</p> 
    }
}

ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/" component={Test}/>
            <Route path="/vertrektijden" component={Layout}/>
        </div>
    </HashRouter>
), document.getElementById('app'));
