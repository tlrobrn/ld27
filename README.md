#Ludum Dare

Scaffolding for using Github to host js/html5 game.
Uses grunt.js to build the final page from src.
Keeps master free from generated files and gh-pages free from src files.

##Workflow

Develop off of master

1. When ready to build:

        git commit -am "comments"
        git checkout -b build

2. modify .gitignore

        grunt make
        git add *
        git commit -m "build"
        git checkout gh-pages
        git merge build

3. fix conflicts

        git add *
        git commit -m "version"
        git push origin gh-pages
        git branch -D build
        git checkout master
