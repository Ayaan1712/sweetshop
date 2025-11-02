from fastapi import FastAPI
from app.database import engine, Base
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sweet Shop API")

app.include_router(auth.router)
