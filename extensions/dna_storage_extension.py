import dnas

class DNAStorageExtension:
    def __init__(self):
        self.dna_storage = dnas.DNAStorage()

    def store_data(self, galaxy_data):
        encoded_data = self.dna_storage.encode_data(galaxy_data)
        self.dna_storage.write_to_file(encoded_data, "galaxy_data.dna")

    def retrieve_data(self):
        decoded_data = self.dna_storage.read_from_file("galaxy_data.dna")
        return self.dna_storage.decode_data(decoded_data)
