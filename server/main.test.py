from flask import Flask
from main import app, Account

class TestLoginFunction:
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
