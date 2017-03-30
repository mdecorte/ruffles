import React from 'react';

import {NsDataProvider} from '../ns/NsDataProvider';
import TrainCard from './TrainCard';

export default class Vertrektijden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trains: [],
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
        const theTime = `
            ${hours > 10
            ? hours
            : '0' + hours}:${minutes > 10
                ? minutes
                : '0' + minutes}
        `.trim();
        const theTimeNum = theTime.split('').filter(x => x !== ':').join('');

        return NsDataProvider(`/vertrektijden?station=${this.state.station}`).then(x => {
            const nextTrainGoesTo = x[0].EindBestemming;
            const trainTime = x[0].VertrekTijd.slice(x[0].VertrekTijd.indexOf('T') + 1, x[0].VertrekTijd.lastIndexOf(':')).trim();
            const trainTimeNum = trainTime.split('').filter(x => x !== ':').join('');
            const trainLeavesIn = trainTimeNum - theTimeNum;
            // debugger;
            const zin = `The next train goes to ${nextTrainGoesTo} and leaves in ${trainLeavesIn} minutes.`;

            this.setState({trains: x});
            this.setState({volgendeTrein: zin});
        });
    }
    render() {
        const {title} = this.props;
        return (
            <div>
                <form className="check" formAction="vertrektijden" formMethod="get" onSubmit={this.handleSubmit}>
                    <h1>{title}</h1>
                    <input type="text" value={this.state.station} name="station" onChange={this.handleChange}/>
                    <button type="submit">Check</button>
                    <p>{this.state.volgendeTrein}</p>
                </form>
                {this.state.trains.map((train, i) => <TrainCard train={train} key={i}/>)}
            </div>
        );
    }
}
