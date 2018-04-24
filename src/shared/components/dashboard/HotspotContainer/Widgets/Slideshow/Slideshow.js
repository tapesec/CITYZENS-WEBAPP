import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import ImageCDN from '../../../../lib/ImageCDN';

import './Slideshow.scss';

class Slideshow extends React.Component {
    constructor() {
        super();
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    next() {
        this.reactSwipe.next();
    }

    prev() {
        this.reactSwipe.prev();
    }

    render() {
        return (
            <div className="Slideshow">
                <ReactSwipe
                    ref={reactSwipe => {
                        this.reactSwipe = reactSwipe;
                    }}
                    style={{
                        container: {
                            overflow: 'hidden',
                            visibility: 'hidden',
                            position: 'relative',
                        },

                        wrapper: {
                            display: 'flex',
                            flexDirection: 'row',
                            overflow: 'hidden',
                            position: 'relative',
                        },

                        child: {
                            float: 'left',
                            width: '100%',
                            position: 'relative',
                            transitionProperty: 'transform',
                        },
                    }}
                    swipeOptions={{
                        continuous: true,
                        startSlide: 0,
                        speed: 300,
                        auto: 3000,
                        disableScroll: false,
                        callback() {},
                        transitionEnd() {},
                    }}
                    key={this.props.imageIds.length}>
                    {this.props.imageIds.map(imageId => (
                        <ImageCDN filename={imageId} key={imageId} alt="galerie photo" />
                    ))}
                </ReactSwipe>

                <Icon onClick={this.prev} className="action-left" strategy="ligature">
                    keyboard_arrow_left
                </Icon>

                <Icon onClick={this.next} className="action-right" strategy="ligature">
                    keyboard_arrow_right
                </Icon>
            </div>
        );
    }
}
export default Slideshow;

Slideshow.propTypes = {
    imageIds: PropTypes.arrayOf(PropTypes.string),
};

Slideshow.defaultProps = {
    imageIds: [],
};
