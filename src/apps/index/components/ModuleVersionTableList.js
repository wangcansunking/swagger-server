import React from 'react';

import ModuleVersionTable from './ModuleVersionTable';

export default class ModuleVersionTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }

    componentDidMount() {
        let that = this;
        fetch('/swaggers/infos')
            .then(response => response.json())
            .then(object => {
                that.setState({
                    list: Object.keys(object).map(k => {
                        object[k].key = k;
                        return object[k];
                    })
                });
            })
    }

    render() {
        const style = {
            display: 'inline-block',
            width: 400,
            verticalAlign: 'top',
            margin: 10
        };

        return <div style={{textAlign: 'center'}}>
            {this.state.list.map(info =>
                <div key={info.key} style={style}>
                    <ModuleVersionTable name={info.key} stable={info.stable} temp={info.temp}/>
                </div>
            )}
        </div>
    }
}
