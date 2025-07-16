# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, dependencies, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register
@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user)

# Login
@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(dependencies.get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Get current user
@app.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# Tasks CRUD
@app.post("/tasks/", response_model=schemas.TaskOut)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_task(db, task, current_user.id)

@app.get("/tasks/", response_model=list[schemas.TaskOut])
def read_tasks(db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.get_tasks(db, current_user.id)

@app.get("/tasks/{task_id}", response_model=schemas.TaskOut)
def read_task(task_id: int, db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(auth.get_current_user)):
    task = crud.get_task(db, task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/tasks/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(auth.get_current_user)):
    updated_task = crud.update_task(db, task_id, current_user.id, task)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(auth.get_current_user)):
    deleted_task = crud.delete_task(db, task_id, current_user.id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"ok": True}