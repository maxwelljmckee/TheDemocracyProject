from .db import db


bill_follows = db.Table('bill_follows',
                        db.Column('bill_id', db.Integer, db.ForeignKey('bills.id'),
                        primary_key=True),
                        db.Column('user_id', db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
                        )


class BillVote(db.Model):
    __tablename__ = 'bill_votes'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,
                        primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False,
                        primary_key=True)
    is_downvote = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='bill_votes')
    bill = db.relationship('Bill', back_populates='bill_votes')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'bill_id': self.bill_id,
            'isDownvote': self.is_downvote
        }

    def to_dict_full(self):
        return {
            'user': self.user.to_dict(),
            'bill': self.bill.to_dict(),
            'isDownvote': self.is_downvote
        }


# SELF-REFERENTIAL BILL THREADING TABLE
bill_comment_threads = db.Table('bill_comment_threads',
    db.Column('parent', db.Integer, db.ForeignKey('bill_comments.id'),
              primary_key=True),
    db.Column('child', db.Integer, db.ForeignKey('bill_comments.id'),
              primary_key=True)
    )


class BillComment(db.Model):
    __tablename__ = 'bill_comments'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)

    user = db.relationship('User', back_populates='bill_comments')
    bill = db.relationship('Bill', back_populates='bill_comments')

    children = db.relationship('BillComment', secondary=bill_comment_threads,
                               primaryjoin=id == bill_comment_threads.c.parent,
                               secondaryjoin=id == bill_comment_threads.c.child,
                               backref='parent'
                               )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bill_id': self.bill_id,
            'message': self.message
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'bill': self.bill.to_dict(),
            'message': self.message
        }


class Bill(db.Model):
    __tablename__ = 'bills'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    bill_id = db.Column(db.String(20), unique=True, nullable=False)
    bill_type = db.Column(db.String(20), nullable=False)
    title = db.Column(db.Text, nullable=False)
    short_title = db.Column(db.Text, nullable=False)
    sponsor_id = db.Column(db.String(10),
                           db.ForeignKey('representatives.bioguide_id'),
                           nullable=False)
    govtrack_url = db.Column(db.String(500))
    introduced_date = db.Column(db.DateTime, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    last_vote = db.Column(db.DateTime)
    house_passage = db.Column(db.DateTime)
    senate_passage = db.Column(db.DateTime)
    enacted = db.Column(db.DateTime)
    vetoed = db.Column(db.DateTime)
    committees = db.Column(db.String(255))
    primary_subject = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    short_summary = db.Column(db.Text, nullable=False)
    latest_major_action_date = db.Column(db.DateTime)
    latest_major_action = db.Column(db.String(500))
    clicks = db.Column(db.Integer, nullable=False)

    sponsor = db.relationship('Representative',
                              back_populates='bills_sponsored')
    bill_votes = db.relationship('BillVote', back_populates='bill')
    bill_comments = db.relationship('BillComment', back_populates='bill')
    followers = db.relationship('User', secondary=bill_follows,
                                back_populates='bills_followed')

    def to_dict(self):
        return {
            'id': self.id,
            'billId': self.bill_id,
            'billType': self.bill_type,
            'title': self.title,
            'shortTitle': self.short_title,
            'sponsor_id': self.sponsor_id,
            'govtrackUrl': self.govtrack_url,
            'introducedDate': self.introduced_date,
            'active': self.active,
            'lastVote': self.last_vote,
            'housePassage': self.house_passage,
            'senatePassage': self.senate_passage,
            'enacted': self.enacted,
            'vetoed': self.vetoed,
            'committees': self.committees,
            'primarySubject': self.primary_subject,
            'summary': self.summary,
            'shortSummary': self.short_summary,
            'latestMajorActionDate': self.latest_major_action_date,
            'latestMajorAction': self.latest_major_action,
            'clicks': self.clicks,
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'billId': self.bill_id,
            'billType': self.bill_type,
            'title': self.title,
            'shortTitle': self.short_title,
            'sponsor': self.sponsor.to_dict(),
            'govtrackUrl': self.govtrack_url,
            'introducedDate': self.introduced_date,
            'active': self.active,
            'lastVote': self.last_vote,
            'housePassage': self.house_passage,
            'senatePassage': self.senate_passage,
            'enacted': self.enacted,
            'vetoed': self.vetoed,
            'committees': self.committees,
            'primarySubject': self.primary_subject,
            'summary': self.summary,
            'shortSummary': self.short_summary,
            'latestMajorActionDate': self.latest_major_action_date,
            'latestMajorAction': self.latest_major_action,
            'clicks': self.clicks,
            'billVotes': [vote.to_dict() for vote in self.bill_votes],
            'billComments': [comment.to_dict()
                             for comment in self.bill_comments],
            'followers'
        }
