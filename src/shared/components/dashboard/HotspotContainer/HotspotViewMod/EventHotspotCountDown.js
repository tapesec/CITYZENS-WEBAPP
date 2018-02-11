import React from 'react';
import { DateTime } from 'luxon';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import DateFormater from './../../../lib/DateFormater';
import './EventHotspotDateTime.scss';

class EventHotspotCountDown extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dateEnd: DateTime.fromISO(props.dateEnd),
        };
    }

    componentDidMount() {
        let newDate;
        this.state.intervalId = setInterval(() => {
            newDate = this.state.dateEnd;
            this.setState({ dateEnd: newDate });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <header className="EventHotspotTimeArea">
                <div className="iconContainer">
                    <Icon strategy="component">alarm_on</Icon>
                </div>
                <Typography tag="header" use="headline" theme="primary-dark">
                    <DateFormater countdown date={this.state.dateEnd} />
                </Typography>
            </header>
        );
    }
}
export default EventHotspotCountDown;
