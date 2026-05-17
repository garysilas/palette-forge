import { spawn } from "node:child_process";
import process from "node:process";

const LOCAL_URL = "http://127.0.0.1:3001";
const SERVER_READY_TIMEOUT_MS = 60_000;
const SERVER_POLL_INTERVAL_MS = 1_000;
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

function sleep(durationMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

async function isServerReady() {
  try {
    const response = await fetch(LOCAL_URL);

    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer() {
  const startTime = Date.now();

  while (Date.now() - startTime < SERVER_READY_TIMEOUT_MS) {
    if (await isServerReady()) {
      return;
    }

    await sleep(SERVER_POLL_INTERVAL_MS);
  }

  throw new Error(`Timed out waiting for ${LOCAL_URL} to become ready.`);
}

function spawnProcess(command, args) {
  return spawn(command, args, {
    stdio: "inherit",
    env: process.env,
  });
}

async function runProcess(command, args) {
  await new Promise((resolve, reject) => {
    const childProcess = spawnProcess(command, args);

    childProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code ?? "unknown"}.`));
    });
  });
}

async function run() {
  let devServerProcess;
  let startedLocalServer = false;

  try {
    if (!(await isServerReady())) {
      startedLocalServer = true;
      devServerProcess = spawnProcess(npmCommand, ["run", "dev:local"]);

      devServerProcess.on("exit", (code) => {
        if (code !== null && code !== 0) {
          console.error(`Local dev server exited early with code ${code}.`);
        }
      });

      await waitForServer();
    }

    await runProcess(npmCommand, ["run", "typecheck"]);
    await runProcess(npmCommand, ["run", "lint"]);
    await runProcess(npmCommand, ["run", "test"]);
    await runProcess(npxCommand, ["playwright", "test"]);
  } finally {
    if (startedLocalServer && devServerProcess && !devServerProcess.killed) {
      devServerProcess.kill("SIGTERM");
    }
  }
}

await run();
