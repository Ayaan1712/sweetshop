from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal

router = APIRouter(prefix="/api/sweets", tags=["Sweets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.SweetOut, status_code=201)
def create_sweet(sweet: schemas.SweetCreate, db: Session = Depends(get_db)):
    new_sweet = models.Sweet(**sweet.dict())
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet

@router.get("/", response_model=list[schemas.SweetOut])
def get_all_sweets(db: Session = Depends(get_db)):
    return db.query(models.Sweet).all()

@router.get("/search", response_model=list[schemas.SweetOut])
def search_sweets(name: str = "", category: str = "", db: Session = Depends(get_db)):
    query = db.query(models.Sweet)
    if name:
        query = query.filter(models.Sweet.name.contains(name))
    if category:
        query = query.filter(models.Sweet.category.contains(category))
    return query.all()

@router.put("/{sweet_id}", response_model=schemas.SweetOut)
def update_sweet(sweet_id: int, sweet_update: dict, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    for key, value in sweet_update.items():
        setattr(sweet, key, value)
    db.commit()
    db.refresh(sweet)
    return sweet

@router.delete("/{sweet_id}")
def delete_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted"}

@router.post("/{sweet_id}/purchase")
def purchase_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if sweet.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")
    sweet.quantity -= 1
    db.commit()
    return {"message": "Sweet purchased successfully"}

@router.post("/{sweet_id}/restock")
def restock_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    sweet.quantity += 10
    db.commit()
    return {"message": "Sweet restocked"}
