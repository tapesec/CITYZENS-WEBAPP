import React from 'react';
import PropTypes from 'prop-types';
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

const wysiwygStyle = {
    minHeight: '200px',
    fontFamily: 'roboto',
    marginTop: '20px',
    lineHeight: '1.75rem',
    letterSpacing: '.04em',
};

/* eslint-disable consistent-return,default-case */
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
            // return null;
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
            }
            // return null;
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
                case 'underline':
                    return <u>{children}</u>;
            }
        },
    },
];
/* eslint-enable consistent-return */

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
});

// Define a React component renderer for our code blocks.
const CodeNode = props => (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
);

CodeNode.propTypes = {
    attributes: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const BoldMark = props => <strong>{props.children}</strong>;

BoldMark.propTypes = {
    children: PropTypes.node.isRequired,
};

// Define our app...
export default class renderWysiwygComponent extends React.Component {
    // Set the initial value when the app is first constructed.
    static onKeyDown(event, change) {
        switch (event.key) {
            // When "B" is pressed, add a "bold" mark to the text.
            case 'b': {
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            }
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                const isCode = change.value.blocks.some(block => block.type === 'code');
                event.preventDefault();
                change.setBlocks(isCode ? 'paragraph' : 'code');
                return true;
            }
        }
        return undefined;
    }

    // Add a `renderNode` method to render a `CodeNode` for code blocks.
    static renderNode(props) {
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />;
        }
        return undefined;
    }

    static renderMark(props) {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />;
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
    }
    // On change, update the app's React state with the new editor value.
    onChange({ value }) {
        this.setState({ value });
        const string = html.serialize(value);
        this.props.input.onChange(string);
    }

    // Render the editor.
    render() {
        return (
            <div className="rich-text-editor" style={wysiwygStyle}>
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={renderWysiwygComponent.onKeyDown}
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
