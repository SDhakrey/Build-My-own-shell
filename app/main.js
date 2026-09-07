const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

function findExecutable(command) {
  const pathEnv = process.env.PATH || "";
  const directories = pathEnv.split(path.delimiter);

  for (const directory of directories) {
    let fullPath = path.join(directory, command);

    try {
      fs.accessSync(fullPath, fs.constants.X_OK);
      return fullPath;
    } catch {
      // File doesn't exist or isn't executable.
    }

    if (process.platform === "win32") {
      const extensions = (process.env.PATHEXT || "").split(";");

      for (const extension of extensions) {
        fullPath = path.join(directory, command + extension);

        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

rl.on("line", (command) => {
  const parts =command.split(" ");

  if (parts[0] === "echo") {
  console.log(parts.slice(1).join(" "));
  rl.prompt();
  return;
}

if(parts[0] === "type"){
  if(
    parts[1] === "echo"||
    parts[1] === "exit"||
    parts[1] === "type"

  ){
    console.log(`${parts[1]} is a shell builtin`);
  } else {
    const executablePath = findExecutable(parts[1]);

    if (executablePath) {
      console.log(`${parts[1]} is ${executablePath}`);
    } else {
      console.log(`${parts[1]}: not found`);
    }
  }
  rl.prompt();
  return;
} 


  if(command === "exit"){
    process.exit(0);
  }

  console.log(`${command}: command not found`);
  rl.prompt();
});

rl.prompt();
