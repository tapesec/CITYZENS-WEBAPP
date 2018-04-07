import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import DateFormater from './../../../../lib/DateFormater';
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
                <Typography tag="div" className="iconContainer" theme="text-icon-on-primary">
                    <Icon strategy="component">alarm_on</Icon>
                </Typography>
                <Typography tag="header" use="subheading2" theme="secondary">
                    <DateFormater countdown date={this.state.dateEnd} />
                </Typography>
            </header>
        );
    }
}

EventHotspotCountDown.propTypes = {
    dateEnd: PropTypes.string.isRequired,
};

export default EventHotspotCountDown;
