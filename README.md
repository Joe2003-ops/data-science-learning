# Data Science Learning

**Datafield** is a responsive, local-first learning app for aspiring data scientists. It combines a gentle learning path, an in-browser Python workspace, and a guided research planner.

## Run it on Windows

1. Install Python 3 if it is not already installed.
2. Open PowerShell in this folder.
3. Run:

   ```powershell
   python server.py
   ```

4. Open [http://localhost:8000](http://localhost:8000).

To use the app on a phone, connect it to the same Wi-Fi as the PC, find the PC's local IPv4 address with `ipconfig`, and open `http://<PC-IP>:8000` on the phone. If Windows Firewall prompts you, allow Python on your private network.

## What is inside

- **Learning path:** six beginner-friendly modules with progress saved in the browser.
- **Code workspace:** a Python editor with pandas, sample datasets, output, and CSV download. The browser downloads the Pyodide runtime from jsDelivr the first time the workspace is opened, so an internet connection is needed to start the Python kernel.
- **Research studio:** a five-step guide for a research question, hypothesis, sources, analysis plan, and limitations. Notes save to local browser storage and export as Markdown.
- **Responsive layout:** desktop sidebar and compact mobile navigation.

The app itself has no account or server-side database. Your learning progress, code and research notes stay in that browser's local storage.
