# # schemas.py
# from pydantic import BaseModel, EmailStr
# from typing import Optional
# from datetime import datetime

# class UserBase(BaseModel):
#     username: str
#     email: EmailStr

# class UserCreate(UserBase):
#     password: str

# class UserOut(UserBase):
#     id: int
#     class Config:
#         orm_mode = True

# class TaskBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     status: Optional[bool] = False
#     due_date: Optional[datetime] = None

# class TaskCreate(TaskBase):
#     pass

# class TaskUpdate(TaskBase):
#     pass

# class TaskOut(TaskBase):
#     id: int
#     owner_id: int
#     class Config:
#         orm_mode = True

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Optional[str] = None

from pydantic import BaseModel, EmailStr, ConfigDict, validator
from typing import Optional
from datetime import datetime

# ------------------ User Schemas ------------------

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# ------------------ Task Schemas ------------------

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[bool] = False
    due_date: Optional[datetime] = None

    @validator("due_date", pre=True)
    def parse_due_date(cls, value):
        if isinstance(value, str) and len(value) == 10:
            return datetime.strptime(value, "%Y-%m-%d")
        return value

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    owner_id: int
    model_config = ConfigDict(from_attributes=True)

# ------------------ Auth Schemas ------------------

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
