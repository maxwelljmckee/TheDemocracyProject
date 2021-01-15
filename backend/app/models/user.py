from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .representatives import followers
from .bill import bill_follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    is_registered_voter = db.Column(db.Boolean, nullable=False)

    bill_votes = db.relationship('BillVote', back_populates='user')
    bill_comments = db.relationship('BillComment', back_populates='user')
    # threads = db.relationship('Thread', back_populates='user')
    # thread_comments = db.relationship('ThreadComment', back_populates='user')
    rep_follows = db.relationship('RepFollow', back_populates='user')
    rep_votes = db.relationship('RepVote', back_populates='user')
    bills_followed = db.relationship('Bill', secondary=bill_follows, 
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
            'isRegisteredVoter': self.is_registered_voter,
        }

    def to_dict_full(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            'zipCode': self.zip_code,
            'isRegisteredVoter': self.is_registered_voter,
            'billVotes': [vote.to_dict() for vote in self.bill_votes],
            'billComments': [comment.to_dict() for comment
                             in self.bill_comments],
            # 'threads': self.threads,
            # 'threadComments': self.thread_comments,
            'repFollows': [follow.to_dict_rep() for follow in self.rep_follows],
            'repVotes': [vote.to_dict_rep() for vote in self.rep_votes],
            'billsFollowed': [bill.to_dict() for bill in self.bills_followed]
        }
