from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
import datetime
import requests
import os

from app.models import User, Representative, RepFollow, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.utils import state_from_zip, parse_phone

import pprint
pp = pprint.PrettyPrinter(indent=4)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/restore')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict_full()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict_full()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/register', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # REGISTER A NEW USER MODEL INSTANCE
        new_user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            email=form.data['email'],
            password=form.data['password'],
            zip_code=form.data['zipCode'],
            is_registered_voter=form.data['isRegistered']
        )
        # ADD NEW USER TO DB.SESSION TO ACCESS USER.ID
        db.session.add(new_user)

        # GET USER STATE FROM ZIP
        user_zip = form.data['zipCode']
        user_state = state_from_zip(user_zip)
        # GET SENATORS ASSOCIATED WITH STATE AND ASSIGN TO USER.FOLLOWING
        user_senators = Representative.query.filter_by(short_title='Sen.',
                                                    state_id=user_state).all()
        for senator in user_senators:
            new_follow = RepFollow(
                representative_id=senator.id,
                user_id=new_user.id,
                is_constituent=True
            )
            db.session.add(new_follow)

        # GET HOUSE MEMBER ASSOCIATED WITH ZIP AND ASSIGN TO USER.FOLLOWING
        API_KEY = os.environ.get('GOOGLE_CIVICS_API_KEY')
        res = requests.get(f'https://www.googleapis.com/civicinfo/v2/representatives?address={user_zip}&levels=country&key={API_KEY}')
        data = res.json()
        if hasattr(data, 'officials'):
            house_rep_phone = data['officials'][-1]['phones'][0]
            house_rep_instance = Representative.query.filter_by(phone=parse_phone(house_rep_phone)).one()
            new_follow = RepFollow(
                representative_id=house_rep_instance.id,
                user_id=new_user.id,
                is_constituent=True
            )

        pp.pprint(new_user.to_dict_full())
        db.session.commit()
        login_user(new_user)
        return new_user.to_dict_full()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
