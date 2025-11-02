from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    response = client.post("/api/auth/register", json={
        "username": "testuser",
        "password": "password123"
    })
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["username"] == "testuser"

def test_register_duplicate_user():
    client.post("/api/auth/register", json={
        "username": "duplicateuser",
        "password": "password123"
    })
    response = client.post("/api/auth/register", json={
        "username": "duplicateuser",
        "password": "password123"
    })
    assert response.status_code == 400

def test_login_user():
    client.post("/api/auth/register", json={
        "username": "loginuser",
        "password": "password123"
    })
    response = client.post("/api/auth/login", json={
        "username": "loginuser",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
