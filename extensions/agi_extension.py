import torch
import torch.nn as nn

class AGIExtension(nn.Module):
    def __init__(self, galaxy_data):
        super(AGIExtension, self).__init__()
        self.galaxy_data = galaxy_data
        self.agi_model = nn.Sequential(
            nn.Linear(galaxy_data.shape[1], 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, galaxy_data.shape[1])
        )

    def forward(self, input_data):
        return self.agi_model(input_data)
