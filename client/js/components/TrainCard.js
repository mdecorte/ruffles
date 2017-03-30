import React from 'react';

export default class TrainCard extends React.Component {

    render() {
        return (
            <div className="train-card">
                <div className="destination">Eindbestemming: {this.props.train.EindBestemming}</div>
                <div className="ride-id">Ritnummer: {this.props.train.RitNummer}</div>
                <div className="route-text">Route: {this.props.train.RouteTekst}</div>
                <div className="train-kind">Soort trein: {this.props.train.TreinSoort}</div>
                <div className="departing-track">Vertrekspoor: {this.props.train.VertrekSpoor}</div>
                <div className="alternate-departing-track">{this.props.train.VertrekSpoorWijziging ? 'Deze trein vertrekt van een ander spoor dan normaal' : 'Geen spoorwijziging'}</div>
                <div className="departing-time">Vertrektijd: {this.props.train.VertrekTijd}</div>
                <div className="carrier">Vervoerder: {this.props.train.Vervoerder}</div>
                <br/>
            </div>
        );
    }
}
