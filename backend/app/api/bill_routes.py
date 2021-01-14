from flask import Blueprint, jsonify, session, request
from app.models import db, Bill, BillVote, BillComment
from flask_login import current_user


bill_routes = Blueprint('bills', __name__)


# ===== GET ALL BILLS WITH ACTIVE STATUS =====
@bill_routes.route('/all')
def get_all_active_bills():
    all_bills = Bill.query.filter_by(active=True).all()
    return jsonify([bill.to_dict() for bill in all_bills])


@bill_routes.route('/<category>')
def get_bill_by_category(category):
    all_bills = Bill.query.filter_by(active=True).all()

    if category == 'all':
        return jsonify([bill.to_dict() for bill in all_bills])
    return 'hello'


# ===== GET BILL BY ID =====
@bill_routes.route('/<int:id>')
def get_bill_by_id(id):
    bill = Bill.query.get(id)
    if bill:
        return bill.to_dict_full()
    else:
        return {'error': 'bill does not exist'}


# ===== POST A BILLVOTE =====
@bill_routes.route('/bill-votes', methods=['POST'])
def post_bill_vote():
    # user_id, bill_id = request.json
    print('=================HIT BILLVOTES=============')
    print(request.json)
    return 'hello'


# ===== UPDATE A BILLVOTE =====
@bill_routes.route('/bill-votes', methods=['put'])
def update():
    pass


# ===== POST A BILLCOMMENT =====
@bill_routes.route('/bill-comments', methods=['POST'])
def post_bill_comment():
    pass


# ===== UPDATE A BILLCOMMENT =====
@bill_routes.route('/bill-comments', methods=['PUT'])
def update_bill_comment():
    pass


# ===== DELETE A BILLCOMMENT =====
@bill_routes.route('/bill-comments/<int:id>', methods=['DELETE'])
def delete_bill_comment(id):
    bill_comment = BillComment.query.get(id)
    db.session.delete(bill_comment)
    db.session.commit()
    return {'message': 'comment successfully deleted'}