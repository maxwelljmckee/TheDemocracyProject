from app.models import db, Representative
import datetime


def seed_executive():
    president = Representative(
        bioguide_id='not available',
        short_title='Pres.',
        first_name='Donald',
        last_name='Trump',
        date_of_birth=datetime.datetime(1946, 6, 14),
        party='R',
        twitter_handle='potus',
        facebook_handle='DonaldTrump',
        youtube_handle='whitehouse',
        image_url='https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg',
        website_url='https://www.whitehouse.gov/',
        contact_url='https://www.whitehouse.gov/contact/',
        in_office=True,
        next_election=None,
        ocd_id='not available',
        phone='202-456-1111',
        state_id='DC',
        missed_votes_pct=None,
        votes_with_party_pct=None,
        votes_against_party_pct=None
    )

    vice_president = Representative(
        bioguide_id='P000587',
        short_title='VP',
        first_name='Mike',
        last_name='Pence',
        date_of_birth=datetime.datetime(1959, 6, 7),
        party='R',
        twitter_handle='VP',
        facebook_handle='mikepence',
        youtube_handle=None,
        image_url='https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg',
        website_url='https://www.whitehouse.gov/',
        contact_url='https://www.whitehouse.gov/contact/',
        in_office=True,
        next_election=None,
        ocd_id='not available',
        phone='202-456-1111',
        state_id='DC',
        missed_votes_pct=None,
        votes_with_party_pct=None,
        votes_against_party_pct=None
    )

    db.session.add(president)
    db.session.add(vice_president)
    db.session.commit()


def undo_executive():
    president = Representative.query.filter(Representative.short_title == 'Pres.').one()
    db.session.delete(president)
    vice_president = Representative.query.filter(Representative.short_title == 'VP').one()
    db.session.delete(vice_president)
    db.session.commit()