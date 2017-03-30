import React from 'react';

import Storingen from './Storingen';
import Vertrektijden from './Vertrektijden';

export default class Layout extends React.Component {

    render() {
        const title = "Eerstvolgende trein vanaf:";
        return (
            <div>
                <Vertrektijden title={title}/>
                <Storingen/>
            </div>
        );
    }
}
