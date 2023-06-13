const { readFile, writeFile } = require("fs").promises;

// const util = require("util");

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

const start = async () => {
  try {
    const first = await readFile("./content/first.txt", "utf-8");
    const second = await readFile("./content/second.txt", "utf-8");

    await writeFile(
      "./content/result_sync.txt",
      `\n\nThis is promise append data: ${first} and ${second}`,
      { flag: "a" }
    );

    console.log(first + "\n" + second);
  } catch (error) {
    console.log(error);
  }
};
start();
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// getText("./content/result_sync.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
