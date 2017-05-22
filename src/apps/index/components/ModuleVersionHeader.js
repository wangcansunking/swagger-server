import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';


const style = {margin: 5};

export default class ModuleVersionHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {drawerOpen: false}
    }

    render() {
        return <div>
            <AppBar
                title="BaiWang TradeShift API Doc List"
                iconElementLeft={ <Avatar size={40} style={style}>T</Avatar>}
                iconElementRight={<RaisedButton onTouchTap={() => this.setState({drawerOpen: true})} secondary={true}
                                                style={style} label="Authentication"/>}/>
            <Drawer
                docked={false}
                width={360}
                open={this.state.drawerOpen}
                openSecondary={true}
                onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
                <TextField
                    hintText="Gateway URL"
                    floatingLabelText="Gateway URL"
                    floatingLabelFixed={true}/>
                <br/>
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Fixed Floating Label Text"
                    floatingLabelFixed={true}/>
                <br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    type="password"/>
                <br/>
                <RaisedButton secondary={true} style={style} label="Submit"/>
            </Drawer>
        </div>

    }
}
