const expectedMajor = 22;
const actualVersion = process.versions.node;
const actualMajor = Number(actualVersion.split(".")[0]);

if (actualMajor !== expectedMajor) {
  console.error(
    `This repo expects Node ${expectedMajor}.x. Current version: ${actualVersion}. Run: nvm use 22.22.2`,
  );
  process.exit(1);
}