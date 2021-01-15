import random


def random_bool():
    binary = random.randint(0, 1)
    if binary:
        return True
    else:
        return False