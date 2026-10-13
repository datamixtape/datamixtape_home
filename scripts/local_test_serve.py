"""Serve the local test build: the hub plus each tool, one port apiece.

Copied to /tmp/dm_test by scripts/local-test.sh and run from there (the
Claude preview server is sandboxed to /tmp). Each port mimics its host's
routing: the hub's 404 page, the donor map's / -> flows.html rewrite, and
Blind Board's single-page-app fallback to index.html.
"""

import os
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
SITES = {  # port: (folder, routing)
    4400: ("hub", "static"),
    4401: ("nil", "static"),
    4402: ("heat", "static"),
    4403: ("donor", "donor"),
    4404: ("blind", "spa"),
}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, routing, **kw):
        self.routing = routing
        super().__init__(*args, **kw)

    def log_message(self, *args):
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        local = self.translate_path(path)
        exists = os.path.isfile(local) or os.path.isfile(os.path.join(local, "index.html"))
        if self.routing == "donor" and path == "/":
            self.path = "/flows.html"
        elif self.routing == "spa" and not exists and "." not in os.path.basename(path):
            self.path = "/index.html"
        elif self.routing == "static" and not exists and os.path.isfile(self.translate_path("/404.html")):
            body = open(self.translate_path("/404.html"), "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            import io
            return io.BytesIO(body)
        return super().send_head()


def serve(port, folder, routing):
    handler = partial(Handler, routing=routing, directory=os.path.join(ROOT, folder))
    ThreadingHTTPServer(("localhost", port), handler).serve_forever()


if __name__ == "__main__":
    for port, (folder, routing) in SITES.items():
        threading.Thread(target=serve, args=(port, folder, routing), daemon=True).start()
        print(f"http://localhost:{port}  {folder}")
    threading.Event().wait()
