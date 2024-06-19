import qutip as qt

class QuantumTeleportationExtension:
    def __init__(self, galaxy_data):
        self.data = qt.Qobj(galaxy_data)

    def teleport_data(self, teleport_channel):
        return qt.teleportation.teleport(self.data, teleport_channel)
