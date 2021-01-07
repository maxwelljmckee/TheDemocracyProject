from app.models import db, Representative
import datetime
import requests
import os
import pprint
pp = pprint.PrettyPrinter(indent=4)


# Adds a demo user, you can add other users here if you want
def seed_house():
    print('='*15, 'HIT SEED HOUSE', '='*15)
    api_key = os.environ.get('PROPUBLICA_API_KEY')
    res = requests.get(
        'https://api.propublica.org/congress/v1/116/house/members.json',
        headers={'X-API-Key': api_key})
    data = res.json()

    bioguide_id_list = []
    for member in data['results'][0]['members']:
        if member['id'] in bioguide_id_list:
            continue

        if member['date_of_birth']:
            split_birth_date = member['date_of_birth'].split('-')
            parsed_birth_date = [int(n) for n in split_birth_date]
            date = datetime.date(*parsed_birth_date)
        else:
            date = None

        try:
            new_rep = Representative(
                bioguide_id=member['id'],
                short_title=member['short_title'],
                first_name=member['first_name'],
                last_name=member['last_name'],
                date_of_birth=date,
                party=member['party'],
                twitter_handle=member.get('twitter_account', None),
                facebook_handle=member.get('facebook_account', None),
                youtube_handle=member.get('youtube_account', None),
                image_url=None,
                website_url=member.get('url', None),
                contact_url=member.get('contact_form', None),
                in_office=bool(str(member['in_office'])),
                next_election=member.get('next_election', None),
                ocd_id=member['ocd_id'],
                phone=member.get('phone', None),
                state_id=member['state'],
                missed_votes_pct=float(member.get('missed_votes_pct', None)),
                votes_with_party_pct=float(member.get('votes_with_party_pct', None)),
                votes_against_party_pct=float(member.get('votes_against_party_pct', None))
            )
            db.session.add(new_rep)
            db.session.commit()
            bioguide_id_list.append(new_rep.bioguide_id)
        except:
            continue


def undo_house():
    db.session.execute('TRUNCATE representatives RESTART IDENTITY CASCADE')
    db.session.commit()
