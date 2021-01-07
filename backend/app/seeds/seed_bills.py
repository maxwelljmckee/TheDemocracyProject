from app.models import db, Bill
from utils import parse_date
import requests
import datetime
import os

import pprint
pp = pprint.PrettyPrinter(indent=4)


def seed_bills():
    API_KEY = os.environ.get('PROPUBLICA_API_KEY')
    res = requests.get(
        'https://api.propublica.org/congress/v1/116/both/bills/active.json',
        headers={'X-API-Key': API_KEY})
    data = res.json()

    # bills = data['results'][0]['bills']
    pp.pprint(data['results'][0]['bills'])


def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE')
    db.session.commit()
