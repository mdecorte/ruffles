import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import { NsDataProvider } from './js/ns/NsDataProvider';

class Vertrektijden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            station: '',
            volgendeTrein: ''
         };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({station: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        const d = new Date();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const theTime =
        `
            ${hours > 10 ? hours : '0' + hours}:${minutes > 10 ? minutes : '0' + minutes}
        `.trim();
        const theTimeNum = theTime.split('').filter(x => x !== ':').join('');

        return NsDataProvider(`/vertrektijden?station=${this.state.station}`).then(x => {

            const nextTrainGoesTo = x[0].EindBestemming;
            const trainTime = x[0].VertrekTijd.slice(x[0].VertrekTijd.indexOf('T') + 1,x[0].VertrekTijd.lastIndexOf(':')).trim();
            const trainTimeNum = trainTime.split('').filter(x => x !== ':').join('');
            const trainLeavesIn = trainTimeNum - theTimeNum;
            console.log(theTimeNum, trainTimeNum);
            const zin = `The next train goes to ${nextTrainGoesTo} and leaves in ${trainLeavesIn} minutes.`;

            this.setState({volgendeTrein: zin});
        });
    }
    render() {
        return (
            <form className="check" formAction="vertrektijden" formMethod="get" onSubmit={this.handleSubmit}>
                <h1>Eerstvolgende trein vanaf:</h1>
                <input type="text" value={this.state.station} name="station" onChange={this.handleChange} />
                <button type="submit">Check</button>
                <p>{this.state.volgendeTrein}</p>
            </form>
        );
    }
}

class Storingen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            station: '',
            deStoringen: ''
         };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({station: event.target.value});
    }
    handleSubmit(event) {
        return NsDataProvider(`/storingen?station=${this.state.station}&unplanned=true`).then(x => {
            if (x.Ongepland[0] == undefined) {
                return this.setState({deStoringen: `Er zijn geen onverwachte storingen nabij station ${this.state.station}`});
            }
            const dit = x.Ongepland[0].Bericht;
            this.setState({deStoringen: dit});
        });
    }
    render() {
        return (
            <form className="check" formAction="storingen" formMethod="get" onSubmit={this.handleSubmit}>
                <h1>Storingen bij station:</h1>
                <input type="text" value={this.state.station} name="station" onChange={this.handleChange} />
                <button type="submit">Check</button>
                <p>{this.state.deStoringen}</p>
            </form>
        );
    }
}

class Test extends React.Component {
    render() {
        return <p>test</p>
    }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Test}/>
    <Route path="/vertrektijden" component={Vertrektijden}/>
    <Route path="/storingen" component={Storingen}/>
  </Router>
), document.getElementById('app'));
