# CITYZENS-WEBAPP


## VSCODE


### USED VSCODE EXTENSIONS

* Debugger for Chrome
* DotENV
* ESLint
* eslint-disable-snippets
* Prettier - Code formatter
* GitLens - Git supercharged
* Import Cost
* Js Reafactor
* line-counter
* move-imports
* Prettier - Code formatter

### launch.json

```json
"configurations": [
    {
        "type": "node",
        "request": "launch",
        "name": "debug",
        "program": "${workspaceFolder}\\build\\server.js",
        "runtimeArgs": [
            "--require",
            "dotenv/config"
        ]
    }

]
```

### debugage performance
```sh
npm i shallow-equal-explain
```
```javascript
const shallowEqualExplanation = shallowEqualExplain(prevProps, this.props);
```
Cette lib permet d'identifier les différences entre prev et next props.
Ne pas hésiter à généraliser l'utilisation de reselect pour éviter le rerendering excessif
