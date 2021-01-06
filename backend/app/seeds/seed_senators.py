from app.models import db, Representative
import datetime
import requests
import os


# Adds a demo user, you can add other users here if you want
def seed_senators():
    api_key = os.environ.get('PROPUBLICA_API_KEY')
    res = requests.get(
        'https://api.propublica.org/congress/v1/116/senate/members.json',
        headers={'X-API-Key': api_key})
    data = res.json()

    for member in data['results'][0]['members']:
        split_birth_date = member['date_of_birth'].split('-')
        parsed_birth_date = [int(n) for n in split_birth_date]
        date = datetime.date(*parsed_birth_date)

        try:
            new_rep = Representative(
                bioguide_id=member['id'],
                short_title=member['short_title'],
                first_name=member['first_name'],
                last_name=member['last_name'],
                date_of_birth=date,
                party=member['party'],
                twitter_handle=member['twitter_account'],
                facebook_handle=member['facebook_account'],
                youtube_handle=member['youtube_account'],
                image_url=None,
                website_url=member['url'],
                contact_url=member['contact_form'],
                in_office=bool(str(member['in_office'])),
                next_election=member['next_election'],
                ocd_id=member['ocd_id'],
                phone=member['phone'],
                state_id=member['state'],
                missed_votes_pct=float(member['missed_votes_pct']),
                votes_with_party_pct=float(member['votes_with_party_pct']),
                votes_against_party_pct=float(member['votes_against_party_pct'])
            )
            print(new_rep)
            db.session.add(new_rep)
            db.session.commit()
        except:
            continue


def undo_senators():
    db.session.execute('TRUNCATE representatives CASCADE')
    db.session.commit()
