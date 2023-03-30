import unittest
import json
from app import app
from local_user_repo import LocalUserRepository


class TestApp(unittest.TestCase):
    def setUp(self):
        app.testing = True
        user_repo = LocalUserRepository()
        app.config["user_repo"] = user_repo
        self.app = app.test_client()

    def test_valid_login(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(username="hireme", password="please")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data.decode())["success"], True)

    def test_lowercases_username(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(username="HireMe", password="please")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data.decode())["success"], True)

    def test_strips_whitespace_from_username(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(username=" hireme ", password="please")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data.decode())["success"], True)

    def test_invalid_login(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(username="hireme", password="wrongpassword")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(json.loads(response.data.decode())["success"], False)

    def test_missing_username(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(password="please")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)

    def test_missing_password(self):
        response = self.app.post(
            "/login", data=json.dumps(dict(username="hireme")),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)


if __name__ == "__main__":
    unittest.main()
