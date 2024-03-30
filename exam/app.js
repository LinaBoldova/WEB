const chalk = require("chalk");

function rnd_num(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
}

function fill_map(cols, rows) {
   var map = []
   for (let i = 0; i < rows; i++) {
       map[i] = []
       for (let j = 0; j < cols; j++) {
           map[i][j] = rnd_num(1, 4)
       }
   }
   return map
}


function draw_map(map, rows, cols) {
   for (let i = 0; i < rows; i++) {

       for (let j = 0; j < cols; j++) {
        switch (map[i][j]) {
            case 1:
                process.stdout.write(chalk.green(map[i][j]) + '   ');
                break;
            case 2:
                process.stdout.write(chalk.gray(map[i][j]) + '   ');
                break;
            case 3:
                process.stdout.write(chalk.yellow(map[i][j]) + '   ');
                break;
         }
       }
       console.log("\n")
   }
}




function is_around_only_current_type(row, col, type) {

    const rows = 10
    const cols = 10

    let map = fill_map(rows, cols)
    draw_map(map, rows, cols)

    if (row != 0 && map[row - 1][col] != type) {
        return false;
    }
    if (row != rows - 1 && map[row + 1][col] != type) {
        return false;
    }
    if (col != 0 && map[row][col - 1] != type) {
        return false;
    }
    if (col != cols - 1 && map[row][col + 1] != type) {
        return false;
    }

    return true;
}


const checker = is_around_only_current_type(1, 1, 2)

switch (checker) {
   case true:
       process.stdout.write(chalk.green("Вокруг лишь указанные объекты\n"))
       break;
   case false:
       process.stdout.write(chalk.red("Вокруг есть другие объекты\n"))
       break;
}
