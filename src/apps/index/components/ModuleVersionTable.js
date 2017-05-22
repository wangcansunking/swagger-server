import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import R from 'ramda';


export default class ModuleVersionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.clickDelete = this.clickDelete.bind(this);
    }

    clickDelete(version) {
        let url = '/swaggers/' + this.state.name + '/' + version;
        let that = this;
        fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    temp: R.reject(v => v === version, this.state.temp)
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return <Card>
            <CardHeader
                title={this.state.name}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable={true}>
                <Tabs>
                    <Tab label="Stable">
                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.stable.map(version =>
                                    <TableRow key={version}>
                                        <TableRowColumn><FlatButton label={version}
                                                                    href={'/swagger.html?url=/swaggers/' + this.props.name + '/' + version}/></TableRowColumn>
                                        <TableRowColumn></TableRowColumn>
                                        <TableRowColumn><RaisedButton label="文件链接"/></TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Tab>
                    <Tab label="Temp">
                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.temp.map(version =>
                                    <TableRow key={version}>
                                        <TableRowColumn><FlatButton label={version} target="_blank"
                                                                    href={'/swagger.html?url=/swaggers/' + this.props.name + '/' + version}/></TableRowColumn>
                                        <TableRowColumn><RaisedButton onTouchTap={() => this.clickDelete(version)}
                                                                      secondary={true} label="删除"/></TableRowColumn>
                                        <TableRowColumn><RaisedButton primary={true} label="文件链接" target="_blank"
                                                                      href={'/swaggers/' + this.props.name + '/' + version}/></TableRowColumn>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Tab>
                </Tabs>
            </CardText>
        </Card>
    }
}

ModuleVersionTable.propTypes = {
    name: React.PropTypes.string,
    stable: React.PropTypes.array,
    temp: React.PropTypes.array,
}
