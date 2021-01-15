from werkzeug.security import generate_password_hash
from app.models import db, User, RepFollow, Bill, BillVote
from app.utils import random_bool


def seed_additional_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE')

    user1 = User(
        first_name='Demo',
        last_name='User',
        email='demo@user.com',
        password='password',
        zip_code='80305',
        is_registered_voter=True
    )
    db.session.add(user1)

    user2 = User(
        first_name='Mongo',
        last_name='Bongo',
        email='mongo@bongo.com',
        password='password',
        zip_code='80305',
        is_registered_voter=True
    )
    db.session.add(user2)

    user3 = User(
        first_name='Flim',
        last_name='Flam',
        email='flim@flam.com',
        password='password',
        zip_code='80305',
        is_registered_voter=True
    )
    db.session.add(user3)

    all_bills = Bill.query.all()
    for user in [user1, user2, user3]:
        for id in [6, 36, 398]:
            new_follow = RepFollow(
                representative_id=id,
                user_id=user.id,
                is_constituent=True
            )
            db.session.add(new_follow)

        for bill in all_bills:
            new_billvote = BillVote(
                user_id=user.id,
                bill_id=bill.id,
                is_downvote=random_bool()
            )
            db.session.add(new_billvote)

    db.session.commit()


def undo_additional_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE')
    db.session.commit()
