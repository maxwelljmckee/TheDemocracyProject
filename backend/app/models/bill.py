from .db import db


bil_vote = db.Table('bill_votes',
                    db.Column('user_id', db.Integer, ForeignKey('users.id'),    
                              primary_key=True),
                    db.Column('bill_id', db.Integer, ForeignKey('bills.id'),
                              primary_key=True),
                    db.Column('isDownvote', db.Boolean, nullable=False)
                    )