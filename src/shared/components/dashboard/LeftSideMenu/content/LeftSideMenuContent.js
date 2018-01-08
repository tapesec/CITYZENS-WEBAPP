import React from 'react';
import { PersistentDrawerContent } from 'rmwc/Drawer';

const LeftSideMenuContent = ({ children }) => (
    <PersistentDrawerContent>
        {children}
    </PersistentDrawerContent>
);

export default LeftSideMenuContent;
