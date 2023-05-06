import uvicorn
from pydantic import BaseModel
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

items = [{ "id": "1", "data": "I want to do this" }, 
         { "id": "2", "data": "I want to do that"}, 
         { "id":"3", "data": "I want to do this and that"}]

users = [{ "email": "admin", "password": "admin" }]

class Item(BaseModel):
    data: str

class User(BaseModel):
    email: str
    password: str

@app.post("/add")
async def create_item(item: Item):
    last_key = int(items[-1]["id"])
    items.append({ "id": str(last_key + 1), "data": item.data})
    return items

@app.get("/get-todo")
async def get():
    return items

@app.delete("/delete/{item_id}")
async def delete_item(item_id: str):
    for i in range(len(items)):
        if items[i]["id"] == item_id:
            del items[i]
            for j in range(i, len(items)):
                items[j]["id"] = str(int(items[j]["id"]) - 1)
            return {"message": "Item deleted"}
    return {"error": "Item not found"}


@app.put("/update/{item}")
async def update_item(item: str, new_item: Item):
    for i in items:
        if i["id"] == item:
            i["data"] = new_item.data
            return items
    return "Item not found"

@app.post("/login")
async def login(person: User):
    for user in users:
        if user["email"] == person.email and user["password"] == person.password:
            return {"message": "Login successful"}
    return {"error": "Invalid credentials"}

@app.post("/register")
async def register(person: User):
    for user in users:
        if user["email"] == person.email:
            return {"error": "User already exists"}
    users.append({"email": person.email, "password": person.password})
    return {"message": "Registration successful"}

@app.get("/get-users")
async def get_users():
    return users

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
