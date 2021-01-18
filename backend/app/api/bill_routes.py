from flask import Blueprint, jsonify, session, request
from app.models import db, Bill, BillVote, BillComment, User
from flask_login import current_user


bill_routes = Blueprint('bills', __name__)


# ===== GET ALL BILLS WITH ACTIVE STATUS =====
@bill_routes.route('/all')
def get_all_active_bills():
    all_bills = Bill.query.filter_by(active=True).all()
    return jsonify([bill.to_dict() for bill in all_bills])


# ===== GET BILLS BY CATEGORY =====
@bill_routes.route('/<category>')
def get_bill_by_category(category):
    all_bills = Bill.query.filter_by(active=True).all()

    def match(array, target):
        for item in array:
            if item in target:
                return True
        return False

    if category == 'all':
        return jsonify([bill.to_dict() for bill in all_bills])

    if category == 'economy':
        keywords = ['economics', 'finance', 'financial', 'commerce']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'education':
        keywords = ['education']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'science':
        keywords = ['science', 'technology', 'communications', 'energy']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'security':
        keywords = ['armed forces', 'national security', 'crime',
                    'law enforcement', 'emergency management']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'environment':
        keywords = ['environment', 'environmental protection', 'public lands',
                    'natural resources', 'sports', 'recreation', 'animals'
                    'water']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'health':
        keywords = ['health', 'housing', 'community development',
                    'transportation', 'public works', 'social welfare',
                    'families']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'international':
        keywords = ['international', 'international affairs']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'taxes':
        keywords = ['taxation', 'law', 'government operations', 'congress']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    if category == 'civil-rights':
        keywords = ['civil rights', 'native americans', 'civil rights',
                    'minority issues']
        return jsonify([bill.to_dict() for bill in all_bills if
                        match(keywords, bill.primary_subject.lower())])

    else:
        return jsonify({'error': 'category not found'})


# ===== GET BILL BY ID =====
@bill_routes.route('/<int:id>')
def get_bill_by_id(id):
    bill = Bill.query.get(id)
    if bill:
        return bill.to_dict_full()
    else:
        return {'error': 'bill does not exist'}


# ===== POST A BILLVOTE =====
@bill_routes.route('/post-vote', methods=['POST'])
def post_bill_vote():
    user_id = request.json['userId']
    bill_id = request.json['billId']
    new_vote = BillVote(
        user_id=user_id,
        bill_id=bill_id,
        is_downvote=request.json['isDownvote']
    )

    db.session.add(new_vote)
    db.session.commit()
    return new_vote.to_dict_full()


# ===== UPDATE A BILLVOTE =====
@bill_routes.route('/update-vote', methods=['PUT'])
def update_bill_vote():
    user_id = request.json['userId']
    bill_id = request.json['billId']
    bill_vote = BillVote.query.get((user_id, bill_id))

    bill_vote.is_downvote = not bill_vote.is_downvote

    db.session.add(bill_vote)
    db.session.commit()
    return bill_vote.to_dict_full()


# ===== DELETE A BILLVOTE =====
@bill_routes.route('/delete-vote', methods=['DELETE'])
def delete_bill_vote():
    user_id = request.json['userId']
    bill_id = request.json['billId']
    bill_vote = BillVote.query.get((user_id, bill_id))

    db.session.delete(bill_vote)
    db.session.commit()
    return {'message': 'billvote deletion successful'}


# ===== POST A BILLFOLLOW =====
@bill_routes.route('/follow', methods=['POST'])
def post_bill_follow():
    bill = Bill.query.get(request.json['billId'])
    user = User.query.get(request.json['userId'])
    if bill not in user.bills_followed:
        user.bills_followed.append(bill)
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()


# ===== DELETE A BILLFOLLOW =====
@bill_routes.route('/unfollow', methods=['DELETE'])
def delete_bill_follow():
    bill = Bill.query.get(request.json['billId'])
    user = User.query.get(request.json['userId'])
    user.bills_followed.remove(bill)
    db.session.add(user)
    db.session.commit()
    return user.to_dict_full()


# ===== POST A BILLCOMMENT =====
@bill_routes.route('/post-comment', methods=['POST'])
def post_bill_comment():
    new_comment = BillComment(
        user_id=request.json['userId'],
        bill_id=request.json['billId'],
        message=request.json['message']
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict_user()


# ===== UPDATE A BILLCOMMENT =====
@bill_routes.route('/update-comment', methods=['PUT'])
def update_bill_comment():
    pass


# ===== DELETE A BILLCOMMENT =====
@bill_routes.route('/delete-comment', methods=['DELETE'])
def delete_bill_comment(id):
    bill_comment = BillComment.query.get(id)
    db.session.delete(bill_comment)
    db.session.commit()
    return {'message': 'comment successfully deleted'}