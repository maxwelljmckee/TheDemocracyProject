from app.models import db, Representative
from app.utils import parse_phone, parse_ocdid
import requests
import time
import os

import pprint
pp = pprint.PrettyPrinter(indent=4)


# SEED SENATE IMAGES
def seed_senate_images():
    API_KEY = os.environ.get('GOOGLE_CIVICS_API_KEY')
    # GET ALL SENATE ENTRIES ALREADY IN DATABASE
    all_senate = Representative.query.filter_by(short_title='Sen.').all()

    for member in all_senate:
        time.sleep(1.5)
        if member.image_url is None:
            # IF MEMBER DOES NOT HAVE IMAGEURL ALREADY, FETCH DATA FROM
            # GOOGLE CIVICS INFORMATION API
            OCDID = parse_ocdid(member.ocd_id)
            res = requests.get(f'https://www.googleapis.com/civicinfo/v2/representatives/{OCDID}?levels=country&key={API_KEY}')
            data = res.json()
            
            for official in data['officials']:
                phone_numbers = official.get('phones', None)
                image_url = official.get('photoUrl', None)
                if phone_numbers and image_url:
                    parsed_number = parse_phone(phone_numbers[0])
                    senator = Representative.query.filter_by(phone=parsed_number).one()
                    setattr(senator, 'image_url', image_url)
                    db.session.commit()

                # if 'phones' in official and 'imageUrl' in official:
                #     imageUrl
                #     phone_number = official['phones'][0]
                #     parsed = parse_phone(phone_number)


            # member_images = [official.get('photoUrl', None) for official in
            #                  data['officials']]
            # # print('=========== HIT OFFICIALS =============')
            # # LIST AND PARSE PHONE NUMBERS FOR EACH SENATOR IN DATA
            # if 'phones' in data['officials']:
            #     print('=========== HIT 2ND CONDITIONAL =============')
            #     phone_numbers = [official['phones'][0] for official in
            #                      data['officials']]

            #     parsed_phone_numbers = [parse_phone(number) for number in
            #                             phone_numbers]

            #     # ZIP TOGETHER IMAGEURLS AND PHONE NUMBERS
            #     zipped = list(zip(parsed_phone_numbers, member_images))

            #     # IDENTIFY EACH SENATOR USING PHONE NUMBER
            #     # AND ASSIGN THEM THE ASSOCIATED IMAGEURL
            #     for phone_number, image_url in zipped:
            #         if image_url is not None:
            #             senator = Representative.query.filter_by(phone=phone_number).one()
            #             setattr(senator, 'image_url', image_url)
            #             db.session.commit()


def undo_senate_images():
    all_senate = Representative.query.filter_by(short_title='Sen.').all()

    for member in all_senate:
        setattr(member, 'image_url', None)
        db.session.commit()
