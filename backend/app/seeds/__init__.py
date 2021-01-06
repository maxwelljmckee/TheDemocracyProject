from flask.cli import AppGroup
from .seed_users import seed_users, undo_users
from .seed_states import seed_states, undo_states
from .seed_senators import seed_senators, undo_senators
from .seed_house import seed_house, undo_house

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_states()
    # seed_senators()
    seed_house()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_users()
    # undo_states()
    # undo_senators()
    undo_house()
