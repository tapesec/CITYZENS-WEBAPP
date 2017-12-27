import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarMenuIcon,
    ToolbarTitle,
    ToolbarIcon,
} from 'rmwc/toolbar';
import './MainContainer.scss';
import { Link } from 'react-router-dom';

export default function MainContainer(props) {
    return (
        <div className="MainContainer">
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
            <Link to="/martignas">Martignas</Link>
            {props.children}
        </div>
    );
}
