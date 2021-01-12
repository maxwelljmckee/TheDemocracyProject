
def state_from_zip(zip_string):

    # Ensure we have exactly 5 characters to parse
    if (len(zip_string) != 5):
        print('Must pass a 5-digit zipcode.')
        return

    # Ensure we don't parse strings starting with 0 as octal values
    zipcode = int(zip_string)

    st = None
    state = None

    # Code cases alphabetized by state
    if (zipcode >= 35000 and zipcode <= 36999):
        st = 'AL'
        state = 'Alabama'
    elif (zipcode >= 99500 and zipcode <= 99999):
        st = 'AK'
        state = 'Alaska'
    elif (zipcode >= 85000 and zipcode <= 86999):
        st = 'AZ'
        state = 'Arizona'
    elif (zipcode >= 71600 and zipcode <= 72999):
        st = 'AR'
        state = 'Arkansas'
    elif (zipcode >= 90000 and zipcode <= 96699):
        st = 'CA'
        state = 'California'
    elif (zipcode >= 80000 and zipcode <= 81999):
        st = 'CO'
        state = 'Colorado'
    elif ((zipcode >= 6000 and zipcode <= 6389) or (zipcode >= 6391 and zipcode <= 6999)):
        st = 'CT'
        state = 'Connecticut'
    elif (zipcode >= 19700 and zipcode <= 19999):
        st = 'DE'
        state = 'Delaware'
    elif (zipcode >= 32000 and zipcode <= 34999):
        st = 'FL'
        state = 'Florida'
    elif ((zipcode >= 30000 and zipcode <= 31999) or (zipcode >= 39800 and zipcode <= 39999)):
        st = 'GA'
        state = 'Georgia'
    elif (zipcode >= 96700 and zipcode <= 96999):
        st = 'HI'
        state = 'Hawaii'
    elif (zipcode >= 83200 and zipcode <= 83999):
        st = 'ID'
        state = 'Idaho'
    elif (zipcode >= 60000 and zipcode <= 62999):
        st = 'IL'
        state = 'Illinois'
    elif (zipcode >= 46000 and zipcode <= 47999):
        st = 'IN'
        state = 'Indiana'
    elif (zipcode >= 50000 and zipcode <= 52999):
        st = 'IA'
        state = 'Iowa'
    elif (zipcode >= 66000 and zipcode <= 67999):
        st = 'KS'
        state = 'Kansas'
    elif (zipcode >= 40000 and zipcode <= 42999):
        st = 'KY'
        state = 'Kentucky'
    elif (zipcode >= 70000 and zipcode <= 71599):
        st = 'LA'
        state = 'Louisiana'
    elif (zipcode >= 3900 and zipcode <= 4999):
        st = 'ME'
        state = 'Maine'
    elif (zipcode >= 20600 and zipcode <= 21999):
        st = 'MD'
        state = 'Maryland'
    elif ((zipcode >= 1000 and zipcode <= 2799) or (zipcode == 5501)):
        st = 'MA'
        state = 'Massachusetts'
    elif (zipcode >= 48000 and zipcode <= 49999):
        st = 'MI'
        state = 'Michigan'
    elif (zipcode >= 55000 and zipcode <= 56899):
        st = 'MN'
        state = 'Minnesota'
    elif (zipcode >= 38600 and zipcode <= 39999):
        st = 'MS'
        state = 'Mississippi'
    elif (zipcode >= 63000 and zipcode <= 65999):
        st = 'MO'
        state = 'Missouri'
    elif (zipcode >= 59000 and zipcode <= 59999):
        st = 'MT'
        state = 'Montana'
    elif (zipcode >= 27000 and zipcode <= 28999):
        st = 'NC'
        state = 'North Carolina'
    elif (zipcode >= 58000 and zipcode <= 58999):
        st = 'ND'
        state = 'North Dakota'
    elif (zipcode >= 68000 and zipcode <= 69999):
        st = 'NE'
        state = 'Nebraska'
    elif (zipcode >= 88900 and zipcode <= 89999):
        st = 'NV'
        state = 'Nevada'
    elif (zipcode >= 3000 and zipcode <= 3899):
        st = 'NH'
        state = 'New Hampshire'
    elif (zipcode >= 7000 and zipcode <= 8999):
        st = 'NJ'
        state = 'New Jersey'
    elif (zipcode >= 87000 and zipcode <= 88499):
        st = 'NM'
        state = 'New Mexico'
    elif ((zipcode >= 10000 and zipcode <= 14999) or (zipcode == 6390)):
        st = 'NY'
        state = 'New York'
    elif (zipcode >= 43000 and zipcode <= 45999):
        st = 'OH'
        state = 'Ohio'
    elif ((zipcode >= 73000 and zipcode <= 73199) or (zipcode >= 73400 and zipcode <= 74999)):
        st = 'OK'
        state = 'Oklahoma'
    elif (zipcode >= 97000 and zipcode <= 97999):
        st = 'OR'
        state = 'Oregon'
    elif (zipcode >= 15000 and zipcode <= 19699):
        st = 'PA'
        state = 'Pennsylvania'
    elif (zipcode >= 300 and zipcode <= 999):
        st = 'PR'
        state = 'Puerto Rico'
    elif (zipcode >= 2800 and zipcode <= 2999):
        st = 'RI'
        state = 'Rhode Island'
    elif (zipcode >= 29000 and zipcode <= 29999):
        st = 'SC'
        state = 'South Carolina'
    elif (zipcode >= 57000 and zipcode <= 57999):
        st = 'SD'
        state = 'South Dakota'
    elif (zipcode >= 37000 and zipcode <= 38599):
        st = 'TN'
        state = 'Tennessee'
    elif ((zipcode >= 75000 and zipcode <= 79999) or (zipcode >= 73301 and zipcode <= 73399) or (zipcode >= 88500 and zipcode <= 88599)):
        st = 'TX'
        state = 'Texas'
    elif (zipcode >= 84000 and zipcode <= 84999):
        st = 'UT'
        state = 'Utah'
    elif (zipcode >= 5000 and zipcode <= 5999):
        st = 'VT'
        state = 'Vermont'
    elif ((zipcode >= 20100 and zipcode <= 20199) or (zipcode >= 22000 and zipcode <= 24699) or (zipcode == 20598)):
        st = 'VA'
        state = 'Virgina'
    elif ((zipcode >= 20000 and zipcode <= 20099) or (zipcode >= 20200 and zipcode <= 20599) or (zipcode >= 56900 and zipcode <= 56999)):
        st = 'DC'
        state = 'Washington DC'
    elif (zipcode >= 98000 and zipcode <= 99499):
        st = 'WA'
        state = 'Washington'
    elif (zipcode >= 24700 and zipcode <= 26999):
        st = 'WV'
        state = 'West Virginia'
    elif (zipcode >= 53000 and zipcode <= 54999):
        st = 'WI'
        state = 'Wisconsin'
    elif (zipcode >= 82000 and zipcode <= 83199):
        st = 'WY'
        state = 'Wyoming'
    else:
        st = 'none'
        state = 'none'
        print('No state found matching', zipcode)

    return st
