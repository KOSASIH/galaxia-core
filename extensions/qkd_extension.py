import qkd

class QKDExtension:
    def __init__(self):
        self.qkd = qkd.QKD()

    def generate_key(self):
        return self.qkd.generate_key()

    def transmit_data(self, galaxy_data, key):
        return self.qkd.transmit_data(galaxy_data, key)
