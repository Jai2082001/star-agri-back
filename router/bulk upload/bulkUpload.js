const xlsx = require('xlsx');

const filePath = process.argv.slice(2)[0];
const workbook = xlsx.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

let posts = [];
let post = {};

console.log(worksheet)

for (let cell in worksheet) {
    const cellAsString = cell.toString();
    console.log(cellAsString)

    if (cellAsString[1] !== 'r' && cellAsString[1] !== 'm' && cellAsString[1] > 1) {
        if (cellAsString[0] === 'A') {
            post.title = worksheet[cell].v;
        }
        if (cellAsString[0] === 'B') {
            post.author = worksheet[cell].v;
        }
        if (cellAsString[0] === 'C') {
            post.released = worksheet[cell].v;
            posts.push(post);
            post = {};
        }
    }
}

console.log(posts);