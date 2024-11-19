import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

load_dotenv('.envrc')

DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

TABLE_NAME = "info_houses"


# SQL para criar a tabela
CREATE_TABLE_SQL = f"""
CREATE TABLE {TABLE_NAME} (
    id BIGINT PRIMARY KEY,
    rent INT NOT NULL,
    tax_hotel INT NOT NULL,
    iptu INT NOT NULL,
    adress TEXT NOT NULL,
    neighborhood TEXT,
    company TEXT,
    size INT,
    number_rooms INT,
    number_bathrooms INT,
    number_parking_spaces INT,
    images TEXT[],
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""

conn = psycopg2.connect(
    host=DB_HOST,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)
conn.autocommit = True

# Criar a tabela
with conn.cursor() as cursor:
    cursor.execute(f"SELECT 1 FROM information_schema.tables WHERE table_name = '{TABLE_NAME}'")
    exists = cursor.fetchone()
    if not exists:
        cursor.execute(CREATE_TABLE_SQL)

conn.close()