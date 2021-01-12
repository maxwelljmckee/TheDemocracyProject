from flask import Blueprint, jsonify, session, request
from app.models import db, Representative


rep_routes = Blueprint('representatives', __name__)


#  ===== GET ALL MEMBERS BY CHAMBER =====
@rep_routes.route('/executive')
def get_all_executive():
    pres = Representative.query.filter_by(short_title='Pres.').first()
    vp = Representative.query.filter_by(short_title='VP').first()
    return jsonify([pres.to_dict_full(), vp.to_dict_full()])


@rep_routes.route('/house')
def get_all_house():
    all_house = Representative.query.filter_by(short_title='Rep.').all()
    return jsonify([member.to_dict() for member in all_house])


@rep_routes.route('/senate')
def get_all_senate():
    all_senate = Representative.query.filter_by(short_title='Sen.').all()
    return jsonify([member.to_dict() for member in all_senate])


# ===== GET ONE MEMBER BY ID =====
@rep_routes.route('/<int:id>')
def get_rep_by_id(id):
    member = Representative.query.get(id)
    if member:
        return member.to_dict_full()
    else:
        return {'error': 'member does not exist'}


# ===== POST AND DELETE FOLLOWS =====
@rep_routes.route('/follow', methods=['POST'])
def post_follow():
    pass


@rep_routes.route('/unfollow', methods=['DELETE'])
def delete_follow():
    pass

