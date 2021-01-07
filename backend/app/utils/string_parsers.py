
# CAST DATE STRING INTO DATETIME
def parse_date(date_string):
    split_date = date_string.split('-')
    parsed_date = [int(n) for n in split_date]
    return datetime.datetime(*parsed_date)


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