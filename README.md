# CITYZENS-WEBAPP


## VSCODE


### USED VSCODE EXTENSIONS

* DotENV
* ESLint
* eslint-disable-snippets
* Prettier - Code formatter
* GitLens - Git supercharged
* Import Cost
* line-counter
* move-imports
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
