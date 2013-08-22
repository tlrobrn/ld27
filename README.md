#Ludum Dare test scaffolding

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
