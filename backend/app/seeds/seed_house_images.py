from app.models import db, Representative
import requests
import os
# from utils import parse_ocdid
from .seed_senate_images import parse_ocdid
import pprint
pp = pprint.PrettyPrinter(indent=4)


def seed_house_images():
    API_KEY = os.environ.get('GOOGLE_CIVICS_API_KEY')
    all_house = Representative.query.filter_by(short_title='Rep.').all()

    for member in all_house:
        if not member.image_url:
            OCDID = parse_ocdid(member.ocd_id)
            res = requests.get(f'https://www.googleapis.com/civicinfo/v2/representatives/{OCDID}?levels=country&key={API_KEY}')
            data = res.json()

            officials = data.get('officials', None)
            if officials:
                image_url = officials[0].get('photoUrl', None)

            setattr(member, 'image_url', image_url)
            db.session.commit()


def undo_house_images():
    all_house = Representative.query.filter_by(short_title='Rep.').all()

    for member in all_house:
        setattr(member, 'image_url', None)
        db.session.commit()
