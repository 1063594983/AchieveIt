import xlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path'

// const obj = [{
//     name: 'parent1',
//     data: [['child1'], ['child2']]
// },
// {
//     name: 'parent2',
//     data: [['child2'], ['child2']]
// }
// ]
// const buffer = xlsx.build(obj);
// fs.writeFile('./test.xls', buffer, (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

const tool = {
    readExcel: (filePath) => {
        const file = xlsx.parse(filePath);
        return file;
    }
}
const filePath = path.resolve("D:/Education/AchieveIt/server/upload/3a4e7a1f82a1389d5f89966b2bca6f75");
const file = tool.readExcel(filePath);

console.log(file[0].data)