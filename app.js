function timeout(ms) {
  return 
}

async function asyncPrint(value, ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  console.log(value);
}

asyncPrint('hello world', 4000);
