from app.models import db, Representative
import requests
import os

import pprint
pp = pprint.PrettyPrinter(indent=4)


# REFORMAT PHONE NUMBER STRING FROM '(xxx) xxx-xxxx' to 'xxx-xxx-xxxx'
def parse_phone(phone_number):
    split = phone_number.split(' ')
    split[0] = split[0][1:4]
    return '-'.join(split)


# REFORMAT OCDID STRING TO URL ENCODING && REPLACE ALL INVALID CHARS
def parse_ocdid(ocdid):
    ocdid = ['%2F' if char == '/' else char for char in ocdid]
    ocdid = ['%3A' if char == ':' else char for char in ocdid]
    return ''.join(ocdid)


# SEED SENATE IMAGES
def seed_senate_images():
    API_KEY = os.environ.get('GOOGLE_CIVICS_API_KEY')
    all_senate = Representative.query.filter_by(short_title='Sen.').all()

    for member in all_senate:
        if member.image_url is None:
            # IF MEMBER DOES NOT HAVE IMAGE ALREADY, FETCH DATA FROM
            # GOOGLE CIVICS INFORMATION API
            OCDID = parse_ocdid(member.ocd_id)
            res = requests.get(f'https://www.googleapis.com/civicinfo/v2/representatives/{OCDID}?levels=country&key={API_KEY}')
            data = res.json()

            # LIST IMAGEURLS FOR EACH SENATOR IN DATA
            member_images = [official.get('photoUrl', None) for official in
                             data['officials']]
            # LIST AND PARSE PHONE NUMBERS FOR EACH SENATOR IN DATA
            phone_numbers = [official['phones'][0] for official in
                             data['officials']]
            parsed_phone_numbers = [parse_phone(number) for number in
                                    phone_numbers]
            # ZIP TOGETHER IMAGEURLS AND PHONE NUMBERS
            zipped = list(zip(parsed_phone_numbers, member_images))

            # IDENTIFY EACH SENATOR USING PHONE NUMBER
            # AND ASSIGN THEM THE ASSOCIATED IMAGEURL
            for phone_number, image_url in zipped:
                if image_url is not None:
                    senator = Representative.query.filter_by(phone=phone_number).one()
                    setattr(senator, 'image_url', image_url)
                db.session.commit()


def undo_senate_images():
    all_senate = Representative.query.filter_by(short_title='Sen.').all()

    for member in all_senate:
        setattr(member, 'image_url', None)
        db.session.commit()