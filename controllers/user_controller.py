from galaxia.core import Galaxia
from galaxia.utils import cache
from galaxia.services.database import Database
from galaxia.models.user import User

class UserController:
    def __init__(self, galaxia: Galaxia, db: Database):
        self.galaxia = galaxia
        self.db = db

    @cache(ttl=60)  # Cache for 1 minute
    def get_user(self, user_id: int):
        # Get a user by ID from the database
        pass

    def create_user(self, username: str, email: str):
        # Create a new user in the database
        pass
