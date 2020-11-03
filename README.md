# fe-flow
A simple workflow tool for create and manager scaffold projects

## Install
```bash
npm install ff-flow -g
```

## Usage
- `ff init` : init a project from existing template

- `ff add [scaffold-name] [git-repo]` : add a template to local from git repo

- `ff list` : list all local templates

- `ff remove [scaffold-name]` : remove a local template

- `ff help` : show help info

## how to create a template
- create a git repo
- write project template as usual
- add a `ff.js` file in the root of repo, write generator code in it

## presets
there are some presets func inside to help u create a template simply
- Listr
- Inquirer
- getGenerateFiles
- ...

## License
MIT