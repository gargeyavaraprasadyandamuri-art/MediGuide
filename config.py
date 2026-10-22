import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'mediguide-care-guidance-secure-key-2026')
    
    # MySQL configuration
    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
    MYSQL_DATABASE = os.getenv('MYSQL_DATABASE', 'mediguide_db')
    MYSQL_PORT = int(os.getenv('MYSQL_PORT', 3306))
    
    # SQLite fallback path
    SQLITE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mediguide.db')
