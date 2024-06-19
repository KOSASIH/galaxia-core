import tensorflow as tf

class NeuralNetworkExtension:
    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)

    def predict(self, input_data):
        return self.model.predict(input_data)

    def train(self, training_data, epochs):
        self.model.fit(training_data, epochs=epochs)
