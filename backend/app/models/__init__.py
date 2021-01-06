from .db import db
from .user import User
from .state import State
from .representatives import Representative
from .bill import Bill, BillVote, BillComment


# create bills table, bill_comments table, bill_votes table, and self-referential bill_comment_threads table