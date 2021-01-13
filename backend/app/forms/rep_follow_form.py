from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField


class RepFollowForm(FlaskForm):
    representativeId = IntegerField('representativeId')
    userId = IntegerField('userId')
    isConstituent = BooleanField('isConstituent')