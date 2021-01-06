from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    is_registered_voter = db.Column(db.Boolean, nullable=False)

    votes = db.relationship('Vote', back_populates='user')
    thread_comments = db.relationship('ThreadComment', back_populates='user')
    bill_comments = db.relationship('BillComment', back_populates='user')
    threads = db.relationship('Thread', back_populates='user')
    following = db.relationship('Representative', secondary='followers',
                                back_populates='followers')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            'zipCode': self.zip_code,
            'isRegisteredVoter': self.is_registered_voter
        }
