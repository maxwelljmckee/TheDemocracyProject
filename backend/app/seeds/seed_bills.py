from app.models import db, Bill
from app.utils import parse_date
import datetime
import requests
import os
import pprint
pp = pprint.PrettyPrinter(indent=4)


# def parse_date(date_string):
#     split_date = date_string.split('-')
#     parsed_date = [int(n) for n in split_date]
#     return datetime.datetime(*parsed_date)


def seed_bills():
    API_KEY = os.environ.get('PROPUBLICA_API_KEY')
    res = requests.get(
        'https://api.propublica.org/congress/v1/116/both/bills/active.json',
        headers={'X-API-Key': API_KEY})
    data = res.json()

    bills = data['results'][0]['bills']


def undo_bills():
    pass
