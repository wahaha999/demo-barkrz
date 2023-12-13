
import React from 'react';
import { useLayout, layouts } from '@src/LayoutProvider';
import Default from './Default'
import ThanksGiving from './ThanksGiving'

const ProfilePageWrapper = (props) => {
    const {layout} = useLayout();
    switch (layout) {
        case layouts.thanksGiving:
            return <ThanksGiving {...props} />

        default:
            return <Default {...props} />
    }
}

export default ProfilePageWrapper;