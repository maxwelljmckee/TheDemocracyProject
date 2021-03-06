from flask.cli import AppGroup
from .seed_users import seed_users, undo_users
from .seed_states import seed_states, undo_states
from .seed_senators import seed_senators, undo_senators
from .seed_house import seed_house, undo_house
from .seed_executive import seed_executive, undo_executive
from .seed_house_images import seed_house_images, undo_house_images
from .seed_senate_images import seed_senate_images, undo_senate_images
from .seed_bills import seed_bills, undo_bills
from .seed_additional_users import seed_additional_users, undo_additional_users
# from .seed_bills_2 import seed_bills_2
# from .seed_bills_3 import seed_bills_3

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_states()
    # seed_executive()
    # seed_senators()
    # seed_house()
    # seed_house_images()
    # seed_senate_images()
    # seed_bills()
    seed_additional_users()

    # seed_bills_2()
    # seed_bills_3()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # pass
    undo_additional_users()
    # undo_bills()
    # undo_senate_images()
    # undo_house_images()
    # undo_executive()
    # undo_senators()
    # undo_house()
    # undo_states()
    # undo_users()
