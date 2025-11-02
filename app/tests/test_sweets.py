from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
from app import models

client = TestClient(app)

# Setup and teardown
def setup_module(module):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def get_admin_token():
    db = SessionLocal()
    admin = models.User(username="admin", hashed_password="$2b$12$abcdef", is_admin=True)
    db.add(admin)
    db.commit()
    db.refresh(admin)
    db.close()
    return "fake-admin-token"  # must patch real JWT later

def test_create_sweet():
    response = client.post("/api/sweets", json={
        "name": "Ladoo",
        "category": "Indian",
        "price": 10.5,
        "quantity": 50
    })
    assert response.status_code in (201, 403)
    
    if response.status_code == 201:
        data = response.json()
        assert data["name"] == "Ladoo"

def test_get_all_sweets():
    response = client.get("/api/sweets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_search_sweets():
    response = client.get("/api/sweets/search?name=Ladoo")
    assert response.status_code == 200
    data = response.json()
    assert any("Ladoo" in sweet["name"] for sweet in data)

def test_update_sweet():
    response = client.put("/api/sweets/1", json={"price": 12.0})
    assert response.status_code == 200
    assert response.json()["price"] == 12.0

def test_delete_sweet_requires_admin():
    response = client.delete("/api/sweets/1")
    assert response.status_code in (401, 403)

def test_purchase_sweet():
    response = client.post("/api/sweets/1/purchase")
    assert response.status_code == 200

def test_restock_requires_admin():
    response = client.post("/api/sweets/1/restock")
    assert response.status_code in (401, 403)
