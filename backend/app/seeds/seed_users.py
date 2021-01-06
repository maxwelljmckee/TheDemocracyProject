from werkzeug.security import generate_password_hash
from app.models import db, User


def seed_users():

    demo = User(first_name='Mongo', last_name='Bongo', email='demo@aa.io',
                password='password', zip_code='80305', is_registered_voter=True)

    db.session.add(demo)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users CASCADE')
    db.session.commit()
