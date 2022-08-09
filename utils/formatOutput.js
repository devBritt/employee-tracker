const cTable = require('console.table');
const chalk = require('chalk');

// chalk variables
const headers = chalk.bold.hex('#00e2e0');
const alternate = chalk.hex('#00a0e7');

// use console.table to format row arrays as a table
const formatTable = table => {
    const formattedTable = [];
    // use console.table to formatted table as string and split by new line
    const tableArr = cTable.getTable('',table).split('\n');

    // use chalk to color each row
    tableArr.forEach((line, index) => {
        if (index === 2) {
            formattedTable.push(headers(line));
        } else if (index > 4 && index%2 === 1) {
            formattedTable.push(alternate(line));
        } else {
            formattedTable.push(line);
        }
    });

    return formattedTable.join('\n');
}

module.exports = formatTable;