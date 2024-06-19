import nengo
from nengo.dists import Uniform

class NeuromorphicExtension:
    def __init__(self, galaxy_data):
        self.galaxy_data = galaxy_data
        self.model = nengo.Network()
        with self.model:
            self.input_node = nengo.Node(output=galaxy_data)
            self.neuron_population = nengo.Ensemble(
                n_neurons=100,
                dimensions=galaxy_data.shape[1],
                neuron_type=nengo.LIF(tau_rc=0.02, tau_ref=0.001)
            )
            nengo.Connection(self.input_node, self.neuron_population)

    def simulate(self):
        with nengo.Simulator(self.model) as sim:
            sim.run(1.0)
            return sim.data[self.neuron_population]
