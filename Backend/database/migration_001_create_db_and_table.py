import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

load_dotenv('.envrc')

DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

TABLE_NAME = "url_houses"

# SQL para criar o banco de dados
CREATE_DB_SQL = f"CREATE DATABASE {DB_NAME}"

# SQL para criar a tabela
CREATE_TABLE_SQL = f"""
CREATE TABLE {TABLE_NAME} (
    id BIGINT PRIMARY KEY,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""

# Conectar ao banco de dados padrão 'postgres' para criar o novo banco de dados
conn = psycopg2.connect(
    host=DB_HOST,
    database='postgres',
    user=DB_USER,
    password=DB_PASSWORD
)
conn.autocommit = True

# Criar o banco de dados
with conn.cursor() as cursor:
    cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{DB_NAME}'")
    exists = cursor.fetchone()
    if not exists:
        cursor.execute(CREATE_DB_SQL)

conn.close()

# Conectar ao novo banco de dados para criar a tabela
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
