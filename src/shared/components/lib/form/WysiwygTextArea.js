import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'rmwc/Icon';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Html from 'slate-html-serializer';

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

const wysiwygStyle = {
    minHeight: '200px',
    fontFamily: 'roboto',
    marginTop: '20px',
    lineHeight: '1.75rem',
    letterSpacing: '.04em',
};

const EMOJIS = ['😃', '😬', '😂', '😅', '😆', '😍', '😱', '👏', '👍', '🙏', '🍔', '🍑', '🍆', '🔑'];
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
            } // return null;
        },
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'code':
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        );
                    case 'paragraph':
                        return <p>{children}</p>;
                    case 'quote':
                        return <blockquote>{children}</blockquote>;
                }
            } // return null;
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
]; /* eslint-enable consistent-return */
const html = new Html({ rules });
const defaultValues = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Exprimez vous ici …',
                            },
                        ],
                    },
                ],
            },
        ],
    },
}); // Define a React component renderer for our code blocks.
const CodeNode = props => (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
);
CodeNode.propTypes = {
    attributes: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}; // Define our app...
export default class renderWysiwygComponent extends React.Component {
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
    constructor(props) {
        super(props);
        if (props.input.value)
            this.state = {
                value: html.deserialize(props.input.value),
            };
        else
            this.state = {
                value: defaultValues,
            };
        this.onChange = this.onChange.bind(this);
    } // On change, update the app's React state with the new editor value.
    onChange({ value }) {
        this.setState({ value });
        const string = html.serialize(value);
        this.props.input.onChange(string);
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
    hasMark(type) {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
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
    } // Render the editor.
    render() {
        return (
            <div className="rich-text-editor" style={wysiwygStyle}>
                {this.renderToolbar()}
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    renderNode={renderWysiwygComponent.renderNode}
                    renderMark={renderWysiwygComponent.renderMark}
                />
            </div>
        );
    }
}
renderWysiwygComponent.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
    }).isRequired,
};
