import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const wysiwygStyle = {
    minHeight: '200px',
    fontFamily: 'roboto',
    marginTop: '20px',
    lineHeight: '1.75rem',
    letterSpacing: '.04em',
};

const initialValue = Value.fromJSON({
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
                                text: 'A line of text in a paragraph.',
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

const BoldMark = props => <strong>{props.children}</strong>;

// Define our app...
export default class renderWysiwygComponent extends React.Component {
    // Set the initial value when the app is first constructed.
    constructor() {
        super();
        this.state = {
            value: initialValue,
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    // On change, update the app's React state with the new editor value.
    onChange({ value }) {
        console.log(value.toJSON(), 'value');
        this.setState({ value });
    }

    onKeyDown(event, change) {
        switch (event.key) {
            // When "B" is pressed, add a "bold" mark to the text.
            case 'b': {
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            }
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                const isCode = change.value.blocks.some(block => block.type == 'code');
                event.preventDefault();
                change.setBlocks(isCode ? 'paragraph' : 'code');
                return true;
            }
        }
    }

    // Add a `renderNode` method to render a `CodeNode` for code blocks.
    renderNode(props) {
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />;
        }
    }

    renderMark(props) {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />;
        }
    }
    // Render the editor.
    render() {
        return (
            <div className="rich-text-editor" style={wysiwygStyle}>
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                />
            </div>
        );
    }
}
