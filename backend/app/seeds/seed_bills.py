from app.models import db, Bill
from app.utils import parse_date
import requests
import datetime
import os

import pprint
pp = pprint.PrettyPrinter(indent=4)


def seed_bills():
    API_KEY = os.environ.get('PROPUBLICA_API_KEY')
    # incrementor = 0
    all_bills = []
    for i in range(0, 1000, 20):
        res = requests.get(
            f'https://api.propublica.org/congress/v1/116/both/bills/active.json?offset= {i}',
            headers={'X-API-Key': API_KEY})
        data = res.json()
        all_bills = all_bills + data['results'][0]['bills']

    for bill in all_bills:

        new_bill = Bill(
            bill_id=bill['bill_id'],
            bill_type=bill['bill_type'],
            title=bill['title'],
            short_title=bill['short_title'],
            sponsor_id=bill['sponsor_id'],
            govtrack_url=bill.get('govtrack_url', None),
            introduced_date=parse_date(bill['introduced_date']),
            active=bool(str(bill['active'])),
            last_vote=parse_date(bill.get('last_vote', None)),
            house_passage=parse_date(bill.get('house_passage', None)),
            senate_passage=parse_date(bill.get('senate_passage', None)),
            enacted=parse_date(bill.get('enacted', None)),
            vetoed=parse_date(bill.get('vetoed', None)),
            committees=bill.get('committees', None),
            primary_subject=bill['primary_subject'],
            summary=bill['summary'],
            short_summary=bill['summary_short'],
            latest_major_action_date=parse_date(bill.get('latest_major_action_date', None)),
            latest_major_action=bill.get('latest_major_action', None),
            clicks=0
        )
        print(new_bill)
        db.session.add(new_bill)
        db.session.commit()


def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE')
    db.session.commit()
