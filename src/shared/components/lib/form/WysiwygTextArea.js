import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'rmwc/Icon';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import SoftBreak from 'slate-soft-break';
import Html from 'slate-html-serializer';

import './WysiwygTextArea.scss';

const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code',
};

const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
};

const INLINE_TAGS = {
    span: 'emoji',
};

const EMOJIS = ['😃', '😬', '😂', '😅', '😆', '😍', '😱', '👏', '👍', '🙏'];
const noop = e => e.preventDefault(); /* eslint-disable consistent-return,default-case */
const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()];
            if (type) {
                return {
                    object: 'block',
                    type,
                    nodes: next(el.childNodes),
                };
            }
        },
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p>{children}</p>;
                    case 'quote':
                        return <blockquote>{children}</blockquote>;
                }
            }
        },
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()];
            if (!type) return;
            return {
                object: 'mark',
                type,
                nodes: next(el.childNodes),
            };
        },
        serialize(obj, children) {
            if (obj.object !== 'mark') return;
            switch (obj.type) {
                case 'bold':
                    return <strong>{children}</strong>;
                case 'italic':
                    return <em>{children}</em>;
                case 'underlined':
                    return <u>{children}</u>;
            }
        },
    },
    {
        deserialize(el) {
            const type = INLINE_TAGS[el.tagName.toLowerCase()];
            if (!type) return;
            return {
                object: 'inline',
                type,
                isVoid: true,
                data: {
                    code: el.childNodes[0] ? el.childNodes[0].data : '',
                },
            };
        },
        serialize(obj) {
            if (obj.object !== 'inline') return;
            switch (obj.type) {
                case 'emoji':
                    return <span>{obj.data.get('code')}</span>;
            }
        },
    },
];
const html = new Html({ rules });
const defaultValues = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [],
            },
        ],
    },
});
const plugins = [SoftBreak({ shift: true })]; // Define a React component renderer for our code blocks.
export default class renderWysiwygComponent extends React.Component {
    constructor(props) {
        super(props);
        if (props.value)
            this.state = {
                value: html.deserialize(props.value),
            };
        else
            this.state = {
                value: defaultValues,
            };
        this.state.className = {};
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    } // On change, update the app's React state with the new editor value.
    onChange({ value }) {
        this.setState({ value });
        const string = html.serialize(value);
        const onChangeVal = {
            target: {
                value: '',
            },
        };
        if (string === '<p></p>') {
            onChangeVal.target.value = '';
        } else {
            onChangeVal.target.value = string;
        }
        this.props.onChange(onChangeVal); // needed for empty text validation
    }
    onClickMark(event, type) {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    }
    onClickEmoji(e, code) {
        e.preventDefault();
        const { value } = this.state;
        const change = value.change();
        change
            .insertInline({
                type: 'emoji',
                isVoid: true,
                data: { code },
            })
            .collapseToStartOfNextText()
            .focus();
        this.onChange(change);
    }
    onFocus() {
        this.setState({
            className: 'selected',
        });
    }
    onBlur() {
        this.setState({
            className: '',
        });
    }
    hasMark(type) {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    }
    static renderMark(props) {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>;
            case 'italic':
                return <em>{props.children}</em>;
            case 'underlined':
                return <u>{props.children}</u>;
        }
        return undefined;
    }
    static renderNode(props) {
        const { attributes, children, node, isSelected } = props;
        switch (node.type) {
            case 'paragraph': {
                return <p {...attributes}>{children}</p>;
            }
            case 'emoji': {
                const { data } = node;
                const code = data.get('code');
                return (
                    <span
                        className={`emoji ${isSelected ? 'selected' : ''}`}
                        {...props.attributes}
                        contentEditable={false}
                        onDrop={noop}>
                        {code}
                    </span>
                );
            }
        }
        return undefined;
    }
    renderMarkButton(type, icon) {
        const isActive = this.hasMark(type);
        const onMouseDown = event => this.onClickMark(event, type);
        return (
            // eslint-disable-next-line react/jsx-no-bind
            <Icon
                onMouseDown={onMouseDown}
                className={isActive ? 'active' : ''}
                data-active={isActive}>
                {icon}
            </Icon>
        );
    }
    renderToolbar() {
        return (
            <div className="rich-text-editor-toolbar">
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {EMOJIS.map(emoji => {
                    const onMouseDown = e => this.onClickEmoji(e, emoji);
                    return (
                        // eslint-disable-next-line react/jsx-no-bind
                        <span
                            key={Math.random()}
                            role="button"
                            className="button"
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
        return (
            <div className="rich-text-editor">
                {this.renderToolbar()}
                <div className={`editor-container ${this.state.className}`}>
                    <Editor
                        style={this.props.editorContentStyle}
                        className="editor-content"
                        value={this.state.value}
                        onChange={this.onChange}
                        plugins={plugins}
                        renderNode={renderWysiwygComponent.renderNode}
                        renderMark={renderWysiwygComponent.renderMark}
                        placeholder={this.props.placeholder}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                </div>
            </div>
        );
    }
}
renderWysiwygComponent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    editorContentStyle: PropTypes.shape({}),
};
renderWysiwygComponent.defaultProps = {
    editorContentStyle: undefined,
};
