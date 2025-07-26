# Utility functions for FamiliQuest can be added here.
# For example: password hashing, token generation, etc.

# Utility functions for FamiliQuest can be added here.
# For example: password hashing, token generation, etc.

import hashlib
import hmac


def hash_password(password: str, salt: str = "FamiliQuestSalt") -> str:
    """Hash a password with a salt using SHA256."""
    return hashlib.sha256((password + salt).encode()).hexdigest()

def verify_password(password: str, hashed: str, salt: str = "FamiliQuestSalt") -> bool:
    """Verify a password against a given hash."""
    return hmac.compare_digest(hash_password(password, salt), hashed)
