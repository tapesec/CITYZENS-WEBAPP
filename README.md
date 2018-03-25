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
* VS Code Redis

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
