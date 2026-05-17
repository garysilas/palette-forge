import { spawn } from "node:child_process";
import process from "node:process";

const E2E_URL = "http://127.0.0.1:3001";
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
    const response = await fetch(E2E_URL);

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

  throw new Error(`Timed out waiting for ${E2E_URL} to become ready.`);
}

function spawnProcess(command, args) {
  return spawn(command, args, {
    stdio: "inherit",
    env: process.env,
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

    await new Promise((resolve, reject) => {
      const playwrightProcess = spawnProcess(npxCommand, ["playwright", "test"]);

      playwrightProcess.on("exit", (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`Playwright exited with code ${code ?? "unknown"}.`));
      });
    });
  } finally {
    if (startedLocalServer && devServerProcess && !devServerProcess.killed) {
      devServerProcess.kill("SIGTERM");
    }
  }
}

await run();
