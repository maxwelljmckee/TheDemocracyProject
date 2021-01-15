from flask import Blueprint, jsonify, session, request
from app.models import db, Representative, RepFollow, RepVote, State


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
    new_follow = RepFollow(
        representative_id=request.json['representativeId'],
        user_id=request.json['userId'],
        is_constituent=False
    )
    db.session.add(new_follow)
    db.session.commit()
    return new_follow.to_dict_rep()


@rep_routes.route('/unfollow', methods=['DELETE'])
def delete_follow():
    target_follow = RepFollow.query.filter_by(representative_id=request.json['representativeId'], user_id=request.json['userId']).one()
    db.session.delete(target_follow)
    db.session.commit()
    return {'message': 'target follow successfully deleted'}


# ===== POST A REPVOTE =====
@rep_routes.route('/post-vote', methods=['POST'])
def post_rep_vote():
    print('=================HIT POST', request.json)
    user_id = request.json['userId']
    representative_id = request.json['repId']
    new_vote = RepVote(
        user_id=user_id,
        representative_id=representative_id,
        is_downvote=request.json['isDownvote']
    )

    db.session.add(new_vote)
    db.session.commit()
    return new_vote.to_dict_rep()


# ===== UPDATE A REPVOTE =====
@rep_routes.route('/update-vote', methods=['PUT'])
def update_rep_vote():
    user_id = request.json['userId']
    representative_id = request.json['repId']
    rep_vote = RepVote.query.get((representative_id, user_id))

    rep_vote.is_downvote = not rep_vote.is_downvote

    db.session.add(rep_vote)
    db.session.commit()
    return rep_vote.to_dict_rep()


# ===== DELETE A REPVOTE =====
@rep_routes.route('/delete-vote', methods=['DELETE'])
def delete_bill_vote():
    user_id = request.json['userId']
    representative_id = request.json['repId']
    rep_vote = RepVote.query.get((representative_id, user_id))

    db.session.delete(rep_vote)
    db.session.commit()
    return {'message': 'billvote deletion successful'}


# GET LIST OF UNITED STATES
@rep_routes.route('/states')
def get_united_states():
    united_states = State.query.all()
    return jsonify([state.to_dict() for state in united_states])