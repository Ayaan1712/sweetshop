from fastapi import FastAPI
from app.database import engine, Base
from app.routes import auth, sweets

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sweet Shop API")

app.include_router(auth.router)
app.include_router(sweets.router)
