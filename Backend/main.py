from fastapi import FastAPI
import uvicorn
import psycopg2
from psycopg2.extras import RealDictCursor
from api.v1.endpoints import houses

from fastapi.middleware.cors import CORSMiddleware



def get_houses():
        conn = psycopg2.connect(
            dbname="your_dbname",
            user="your_user",
            password="your_password",
            host="your_host",
            port="your_port"
        )
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM info_houses LIMIT 10")
        houses = cursor.fetchall()
        cursor.close()
        conn.close()
        return houses


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origem do seu front-end
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(houses.router, prefix="/api/v1", tags=["houses"])


@app.get("/health")
def health_check():
    return {"status": "ok"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)