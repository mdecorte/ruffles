import React from 'react';
import {NsDataProvider} from '../ns/NsDataProvider';

export default class Storingen extends React.Component {
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
                <input type="text" value={this.state.station} name="station" onChange={this.handleChange}/>
                <button type="submit">Check</button>
                <p>{this.state.deStoringen}</p>
            </form>
        );
    }
}
