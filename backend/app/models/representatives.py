from .db import db


# followers = db.Table('followers',
#                      db.Column('representative_id', db.Integer, db.ForeignKey(
#                                'representatives.id'), primary_key=True),
#                      db.Column('user_id', db.Integer, db.ForeignKey(
#                                'users.id'), primary_key=True),
#                      db.Column('is_constituent', db.Boolean, nullable=False)
#                      )


class RepFollow(db.Model):
    __tablename__ = 'rep_follows'

    representative_id = db.Column(db.Integer, db.ForeignKey('representatives.id'),
                                  primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    is_constituent = db.Column(db.Boolean, nullable=False)

    representative = db.relationship('Representative', back_populates='rep_follow')
    user = db.relationship('User', back_populates='rep_follows')

    def to_dict_rep(self):
        return {
            'representativeId': self.representative.to_dict(),
            'userId': self.user_id,
            'isConstituent': self.is_constituent
        }

    def to_dict_user(self):
        return {
            'representative': self.representative,
            'user': self.user.to_dict(),
            'isConstituent': self.is_constituent
        }


class Representative(db.Model):
    __tablename__ = 'representatives'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    bioguide_id = db.Column(db.String(20), unique=True, nullable=False)
    short_title = db.Column(db.String(5), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    date_of_birth = db.Column(db.DateTime)
    party = db.Column(db.String(2), nullable=False)
    twitter_handle = db.Column(db.String(100))
    facebook_handle = db.Column(db.String(100))
    youtube_handle = db.Column(db.String(100))
    image_url = db.Column(db.String(500))
    website_url = db.Column(db.String(500))
    contact_url = db.Column(db.String(500))
    in_office = db.Column(db.Boolean, nullable=False)
    next_election = db.Column(db.String(4))
    ocd_id = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    state_id = db.Column(db.String(2), db.ForeignKey('states.abbreviation'),
                         nullable=False)
    missed_votes_pct = db.Column(db.Float)
    votes_with_party_pct = db.Column(db.Float)
    votes_against_party_pct = db.Column(db.Float)

    state = db.relationship('State', back_populates='representatives')
    bills_sponsored = db.relationship('Bill', back_populates='sponsor')
    # followers = db.relationship('User', secondary='followers', back_populates=
    #                             'following')
    rep_follow = db.relationship('RepFollow', back_populates='representative')

    def to_dict(self):
        return {
            'id': self.id,
            'bioguideId': self.bioguide_id,
            'shortTitle': self.short_title,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'dateOfBirth': self.date_of_birth,
            'party': self.party,
            'twitterHandle': self.twitter_handle,
            'facebookHandle': self.facebook_handle,
            'youtubeHandle': self.youtube_handle,
            'imageUrl': self.image_url,
            'websiteUrl': self.website_url,
            'contactUrl': self.contact_url,
            'inOffice': self.in_office,
            'nextElection': self.next_election,
            'ocdId': self.ocd_id,
            'phone': self.phone,
            'stateId': self.state_id,
            'missedVotesPct': self.missed_votes_pct,
            'votesWithPartyPct': self.votes_with_party_pct,
            'votesAgainstPartyPct': self.votes_against_party_pct
        }

    def to_dict_full(self):
        return {
            'id': self.id,
            'bioguideId': self.bioguide_id,
            'shortTitle': self.short_title,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'dateOfBirth': self.date_of_birth,
            'party': self.party,
            'twitterHandle': self.twitter_handle,
            'facebookHandle': self.facebook_handle,
            'youtubeHandle': self.youtube_handle,
            'imageUrl': self.image_url,
            'websiteUrl': self.website_url,
            'contactUrl': self.contact_url,
            'inOffice': self.in_office,
            'nextElection': self.next_election,
            'ocdId': self.ocd_id,
            'phone': self.phone,
            'state': self.state.to_dict(),
            'missedVotesPct': self.missed_votes_pct,
            'votesWithPartyPct': self.votes_with_party_pct,
            'votesAgainstPartyPct': self.votes_against_party_pct,
            'billsSponsored': [bill.to_dict() for bill in self.bills_sponsored],
            'repFollows': [follow.to_dict() for follow in self.followers]
        }
