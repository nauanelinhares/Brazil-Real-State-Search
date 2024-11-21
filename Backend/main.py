from fastapi import FastAPI
import uvicorn
import psycopg2
from psycopg2.extras import RealDictCursor
from api.v1.endpoints import houses



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

app.include_router(houses.router, prefix="/api/v1", tags=["houses"])


@app.get("/health")
def health_check():
    return {"status": "ok"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)