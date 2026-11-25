# Data Science Learning

**Datafield** is a responsive, local-first learning app for aspiring data scientists. It combines a gentle learning path, an in-browser Python workspace, and a guided research planner.

## Run it on Windows

1. Install Python 3 if it is not already installed.
2. Double-click `start-app.bat` in this folder. A console window will stay open while the app server runs.
3. Open [http://localhost:8000](http://localhost:8000) on the PC.

You can also start it from PowerShell in this folder:

   ```powershell
   python server.py
   ```

Keep the console open while using the app. Press Ctrl+C to stop the server.

To use the app on a phone, connect it to the same Wi-Fi as the PC, leave the server running, find the PC's local IPv4 address with `ipconfig`, and open `http://<PC-IP>:8000` on the phone. If Windows Firewall prompts you, allow Python on your private network.

## What is inside

- **Learning path:** six beginner-friendly modules with profile-specific completion progress.
- **Learner profiles:** create and switch between local profiles. A new profile starts with an empty learning path, activity history, daily plan and research notebook; each profile keeps its own progress, code and notes.
- **Code workspace:** a Python editor with pandas, sample datasets, output, and CSV download. The browser downloads the Pyodide runtime from jsDelivr the first time the workspace is opened, so an internet connection is needed to start the Python kernel.
- **Research studio:** a five-step guide for a research question, hypothesis, sources, analysis plan, and limitations. Notes save to local browser storage and export as Markdown.
- **Responsive layout:** desktop sidebar and compact mobile navigation.

Profiles are local to one browser on one device; they do not use passwords or sync between devices. Each profile's learning progress, code and research notes are stored separately in that browser's local storage.

The dashboard counts completed modules and lessons, shows the next incomplete module, and tracks active days when a learner completes a plan item or module, runs Python successfully, or adds to their research notes.
