import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rmwc/Button';
import { Fab } from 'rmwc/Fab';
import { IconToggle } from 'rmwc/IconToggle';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarMenuIcon,
    ToolbarTitle,
    ToolbarIcon
} from 'rmwc/toolbar';
import { Typography } from 'rmwc/Typography';

export default function Dashboard(props) {
    return (
        <div>
            <Toolbar style={{ color: 'red' }}>
                <ToolbarRow>
                    <ToolbarSection alignStart>
                        <ToolbarMenuIcon use="menu" />
                        <ToolbarTitle>Toolbar</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection alignEnd>
                        <ToolbarIcon use="save" />
                        <ToolbarIcon use="print" />
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
            <h1>
                <Typography use="title">Here's the Dashboard</Typography>
            </h1>

            <Button>Go Johnny go !</Button>
            <Fab>favorite</Fab>
            <IconToggle
                on={{ label: 'Remove from favorites', content: 'favorite' }}
                off={{ label: 'Add to favorites', content: 'favorite_border' }}
            />
            <span>
                <Link to="/register">Login</Link>
            </span>
        </div>
    );
}
