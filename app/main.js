const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

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
    parts[1] === "echo"||
    parts[1] === "echo"

  ){
    console.log(`${parts[1]} is a shell builtin`);
  } else {
    console.log(`${parts[1]} is not a shell builtin`);
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
