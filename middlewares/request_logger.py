from galaxia.core import Galaxia

class RequestLogger:
    def __init__(self, galaxia: Galaxia):
        self.galaxia = galaxia

    def process_request(self, request: Any):
        # Log the incoming request
        pass

    def process_response(self, response: Any):
        # Log the outgoing response
        pass
