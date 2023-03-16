// node ncat filepath - displays the contents of the file in the terminal

// Cmd  - ncat.js i took input in nodejs

// output - 'C:\\Program Files\\nodejs\\node.exe',
            // 'D:\\NodeJS\\ncat\\ncat.js',
            // 'i',
            // 'took',
            // 'input',
            // 'in',
            // 'nodejs'

// ek ek word ke relevant info. ko new lines me print kr rha h ( first two are of no use , so we can remove it using slice method)


// node ncat.js f1.txt f2.txt f3.txt
// we have used slice to ignore input of first two indexes.


// Cmd - node ncat.js f1.txt f2.txt f3.txt
// op - [ 'f1.txt', 'f2.txt', 'f3.txt' ]

//// node ncat filepath1 filepath2 filepath3 - displays the contents of all the files in the terminal in concatenated form

const fs = require("fs");

let inputArr = process.argv.slice(2);
// console.log(input);

let filesArr = [];
// placed files path in filesArr

for(let i = 0 ; i < inputArr.length ; i++){
    filesArr.push(inputArr[i]);
}

console.log("Files to read are : "+ filesArr);

// check if all the files are present

for(let i = 0 ; i < inputArr.length ; i++){
    let doesFileExist = fs.existsSync(filesArr[i]);
    if(!doesFileExist){
        console.log("Files does not exist");
        return;
    }
}

// content reading and appending starts

let content = "";

for(let i = 0 ; i < inputArr.length ; i++){
    let fileContent = fs.readFileSync(filesArr[i]);
    content += fileContent+"\n";
}

console.log(content);
