import React from 'react';
import { Link } from 'react-router-dom';
import { PersistentDrawer, PersistentDrawerHeader, PersistentDrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemText } from 'rmwc/List';
import { Fab } from 'rmwc/Fab';

export default class LeftSideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    render() {
        return (
            /* <div>
            <h1>Menu de gauche</h1>
            <Link to="/martignas/Mairie">Mairie de Martignas</Link>
        </div> */
            <div>
                <Fab mini onClick={() => this.setState({ open: !this.state.open })}>
                    favorite
                </Fab>
                <PersistentDrawer
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}>
                    <PersistentDrawerHeader>PersistentDrawerHeader</PersistentDrawerHeader>
                    <PersistentDrawerContent>
                        <ListItem>
                            <ListItemText>Cookies</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Pizza</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Icecream</ListItemText>
                        </ListItem>
                    </PersistentDrawerContent>
                </PersistentDrawer>
            </div>
        );
    }
}
