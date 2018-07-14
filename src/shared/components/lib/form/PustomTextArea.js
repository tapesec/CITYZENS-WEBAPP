import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import Typography from 'rmwc/Typography';
import Textarea from 'react-textarea-autosize';
import ComboIcon from '../../lib/comboIcon/ComboIcon';

import './customTextArea.scss';

const EMOJIS = ['😃', '😬', '😂', '😅', '😆', '😍', '😱', '👏', '👍', '🙏'];
class CustomTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || '',
            currentCursorPosition: 0,
        };
        this.saveCurrentCursorPosition = this.saveCurrentCursorPosition.bind(this);
        this.onClickEmoji = this.onClickEmoji.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value && nextProps.value === '') {
            this.setState({ value: '' });
        }
    }
    onClickEmoji(emoji) {
        const position = this.state.currentCursorPosition;
        const output = [
            this.state.value.slice(0, position),
            emoji,
            this.state.value.slice(position),
        ].join('');
        this.props.onChange({
            target: {
                value: output,
            },
        });
        this.setState({
            value: output,
        });
    }
    onChange(event) {
        this.setState({
            value: event.target.value,
        });
        this.props.onChange(event);
    }
    saveCurrentCursorPosition(event) {
        this.setState({
            currentCursorPosition: event.target.selectionStart,
        });
    }
    renderEmojisList() {
        return (
            <div className="emojis-content">
                <Typography
                    className="title"
                    use="body2"
                    tag="div"
                    theme="text-secondary-on-background">
                    Emojis{' '}
                </Typography>
                {EMOJIS.map(emoji => {
                    const onMouseDown = () => this.onClickEmoji(emoji);
                    return (
                        // eslint-disable-next-line react/jsx-no-bind
                        <span
                            key={Math.random()}
                            role="button"
                            className="button emoji"
                            tabIndex={0}
                            onMouseDown={onMouseDown}>
                            <span className="material-icons">{emoji}</span>
                        </span>
                    );
                })}
            </div>
        );
    }
    render() {
        // defaults to textarea, no need to pass fieldType
        return (
            <div className="EmojiTextArea">
                <div className="emoji-button">
                    <ComboIcon
                        actionComponent={() => (
                            <Icon style={{ margin: '3px' }} strategy="ligature">
                                mood
                            </Icon>
                        )}
                        className="emoji-selector"
                        content={this.renderEmojisList()}
                    />
                </div>
                <Textarea
                    ref={node => {
                        this.TextField = node;
                    }}
                    onChange={this.onChange}
                    onBlur={this.props.onBlur}
                    value={this.state.value}
                    theme={this.props.theme}
                    onClick={this.saveCurrentCursorPosition}
                    onKeyUp={this.saveCurrentCursorPosition}
                    className={`${this.props.className}${
                        this.props.invalid ? ' textarea-invalid' : ''
                    }`}
                    placeholder={this.props.placeholder}
                    label={this.props.label}
                    minRows={this.props.minRows || 3}
                />
            </div>
        );
    }
}
CustomTextArea.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    theme: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    minRows: PropTypes.number,
    invalid: PropTypes.bool,
};
CustomTextArea.defaultProps = {
    value: '',
    className: '',
    label: undefined,
    theme: undefined,
    minRows: 3,
    invalid: false,
};
export default CustomTextArea;
