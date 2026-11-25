let pyodide = null;
let currentOutput = "";

self.onmessage = async ({ data }) => {
  try {
    if (data.type === "init") {
      if (pyodide) { setDataset(data.csv); self.postMessage({ type: "ready" }); return; }
      importScripts("https://cdn.jsdelivr.net/pyodide/v314.0.8/full/pyodide.js");
      pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v314.0.8/full/" });
      self.postMessage({ type: "loading-package" });
      await pyodide.loadPackage("pandas");
      setDataset(data.csv);
      pyodide.setStdout({ batched: (line) => { currentOutput += `${line}\n`; } });
      pyodide.setStderr({ batched: (line) => { currentOutput += `${line}\n`; } });
      self.postMessage({ type: "ready" });
      return;
    }
    if (data.type === "dataset") { setDataset(data.csv); return; }
    if (data.type === "run" && pyodide) {
      currentOutput = "";
      const result = await pyodide.runPythonAsync(data.code);
      let output = currentOutput.trimEnd();
      if (result !== undefined && result !== null) {
        const value = result.toString();
        if (value && value !== "None") output += `${output ? "\n" : ""}${value}`;
        if (result.destroy) result.destroy();
      }
      self.postMessage({ type: "output", output });
    }
  } catch (error) {
    self.postMessage({ type: "error", message: error?.message || String(error) });
  }
};

function setDataset(csv) {
  pyodide.globals.set("SAMPLE_CSV", csv);
  pyodide.runPython("import pandas as pd\nfrom io import StringIO\ndf = pd.read_csv(StringIO(SAMPLE_CSV))");
}
