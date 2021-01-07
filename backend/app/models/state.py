from .db import db


class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(50), nullable=False, unique=True)
    abbreviation = db.Column(db.String(2), nullable=False, unique=True)

    representatives = db.relationship('Representative', back_populates='state')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'abbreviation': self.abbreviation
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'name': self.name,
            'abbreviation': self.abbreviation,
            'representatives': [rep.to_dict() for rep in self.representatives]
        }
