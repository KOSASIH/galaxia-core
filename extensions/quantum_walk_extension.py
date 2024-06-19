import qutip as qt

class QuantumWalkExtension:
    def __init__(self, galaxy_data):
        self.walker = qt.Qobj(galaxy_data)
        self.hamiltonian = qt.Qobj(galaxy_data)

    def simulate_walk(self, steps):
        return qt.timeevolution.discrete_time_evolution(self.hamiltonian, self.walker, steps)
