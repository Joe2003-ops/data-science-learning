"""Start the Datafield learning app on your computer and local Wi-Fi."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("DATAFIELD_PORT", "8000"))

class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    address = ("0.0.0.0", PORT)
    server = ThreadingHTTPServer(address, AppHandler)
    print(f"Datafield is ready on this computer: http://localhost:{PORT}")
    print(f"For your phone, open http://<this-computer's-local-IP>:{PORT} on the same Wi-Fi.")
    print("Press Ctrl+C to stop the server.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nDatafield server stopped.")
    finally:
        server.server_close()
