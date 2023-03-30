from werkzeug.security import check_password_hash, generate_password_hash


class LocalUserRepository:
    users = {
        "hireme": generate_password_hash("please"),
        "frodo": generate_password_hash("baggins"),
    }

    def validate_login(self, username: str, password: str):
        processed_un = username.strip().lower()
        try:
            user = self.users[processed_un]
            return check_password_hash(user, password)
        except KeyError:
            return False
