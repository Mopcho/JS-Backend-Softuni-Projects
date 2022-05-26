// 1 Level - Print all folders on this PC on the console
// 2 Level - Print a visual interpretation of the folder tree on this PC

const fs = require('fs');

//An array that stores all the folders' names
let folders = [];

//String that holds the current path in the recursion
let currentPath = '';

//String that holds the last folder so I can remove it from the currentPath with .replace to step one folder back
let lastFolder = '';

function readAll(start) {

    currentPath = start;

    fs.readdir(`${start}`, {encoding: 'utf-8'}, (err,data) => {
        if(err) {
            throw new Error(err);
        }
        console.log(data);
        //Iterate over every folder in the current path
        for (let folder of data) {
            console.log(folders.includes(folder));
            //If the current folder hasnt been entered into or isnt a file
            if(!folders.includes(folder) && !folder.includes('.')) {
                //We add it to the array that holds all the folders we have entered
                folders.push(folder);

                //We change the currentPath
                currentPath += folder + '/';

                //And we enter the folder
                readAll(currentPath);
            }  
            console.log(currentPath);
            lastFolder = folder;
        }
        //In case we go to here that means there are no folders that we havent gone in this path so we go one folder back by changing the currentPath
        currentPath = currentPath.replace(`/${lastFolder}`,'');

        //And enter in it
        readAll(currentPath);
    })
}

readAll('C:/Users/LENOVO/Desktop/Coding/');