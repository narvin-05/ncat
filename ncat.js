// 1. node ncat.js filepath - displays the contents of the file in the terminal
// 2. node ncat.js filepath1 filepath2 filepath3 - displays the contents of all the files in the terminal in concatenated form

// 3. node ncat.js -n filepath - put numbering to all the lines.

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

const fs = require("fs");

let inputArr = process.argv.slice(2);
// console.log(inputArr);

let filesArr = [];
let optionArr = [];

// placed files path in filesArr

for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  //   console.log(firstChar);
  if (firstChar == "-") {
    optionArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}

// console.log("Files to read are : "+ filesArr);
// console.log("Options are : ",optionArr);

// check if all the files are present

// console.log(filesArr.length);
for (let i = 0; i < 3; i++) {
  let doesFileExist = fs.existsSync(filesArr[i]);
  if (doesFileExist == "false") {
    console.log("Files does not exist");
    return;
  }
}

// content reading and appending starts

let content = "";

for (let i = 0; i < filesArr.length; i++) {
  let fileContent = fs.readFileSync(filesArr[i]);
  content += fileContent + "\r\n";
}

// console.log(content);

let contentArr = content.split("\r\n");
// console.table(contentArr);

// check if -s is present or not

let isSPresent = optionArr.includes("-s");
if (isSPresent) {
  for (let i = 1; i < contentArr.length; i++) {
    if (contentArr[i] == "" && contentArr[i - 1] == "") {
      contentArr[i] = null;
    } else if (contentArr[i] == "" && contentArr[i - 1] == null)
      contentArr[i] = null;
  }
  let tempArray = [];
  // push everything in tempARray except null
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArray.push(contentArr[i]);
    }
  }
  console.table("data after removal of null ");
  console.table(tempArray);
}

let indexOfN = optionArr.indexOf("-n");
let indexOfB = optionArr.indexOf("-b");

// if -n or -b is not found then -1 got returned

let finalOption = "";
// if both -n and -b are present
if (indexOfB != -1 && indexOfN != -1) {
    if (indexOfB < indexOfN) {
        finalOption = "-b";
    } else {
        finalOption = "-n";
    }
}
// either -b is present or -n is present
else{
    if(indexOfN != -1){
        finalOption = "-n";
    }
    else if(indexOfB != -1){
        finalOption = "-b";
    }
}
// calling of function by evaluating finalOption

if (finalOption == "-n") {
  modifiyContentbyN();
} else if (finalOption == "-b") {
  modifiyContentbyB();
}

function modifiyContentbyN(){
    for(let i = 0 ; i < contentArr.length ; i++){
        contentArr[i] = ((i+1) + " ) " + contentArr[i]);
    }
}

function modifiyContentbyB(){
    let count = 1 ;
    for(let i = 0 ; i < contentArr.length ; i++){
        if(contentArr[i] != ""){
            contentArr[i] = (count + " ) " + contentArr[i]);
            count++;
        }
    }
}

console.log(contentArr);
