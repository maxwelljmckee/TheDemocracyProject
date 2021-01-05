
## `Users` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`firstName`|string(20)|non-nullable|
|`lastName`|string(20)|non-nullable|
|`email`|string(50)|unique, non-nullable|
|`hashedPassword`|string(255)|non-nullable|
|`isRegisteredVoter`|boolean|non-nullable|
- `unique` constraint on `email`
- `hasMany` relationship to `votes` table
- `hasMany` relationship to `comments` table
- `hasMany` relationship to `threads` table
- `hasMany` relationship to `follows` table



## `States` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullableable|
|`name`|string(20)|unique, non-nullable|
|`abbreviation`|string(2)|unique, non-nullable|
- `unique` constraint on `name`
- `unique` constraint on `abbreviation`
- `hasMany` relationship to `representatives` table


## `Representatives` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`bioguideId`|string(20)|unique, non-nullable|
|`shortTitle`|string(5)|non-nullable|
|`firstName`|string(20)|non-nullable|
|`lastName`|string(20)|non-nullable|
|`dateOfBirth`|date|non-nullable|
|`party`|string(2)|non-nullable|
|`twitterHandle`|string(100)||
|`facebookHandle`|string(100)||
|`youtubeHandle`|string(100)||
|`imageUrl`|string(500)||
|`websiteUrl`|string(500)||
|`contactUrl`|string(500)||
|`inOffice`|boolean|non-nullable|
|`nextElection`|datetime||
|`ocdId`|string(50)||
|`phone`|string(20)|non-nullable|
|`stateId`|str(2)|fkey(state.abbreviation), non-nullable|
|`missedVotesPct`|float||
|`votesWithPartyPct`|float||
|`votesAgainstPartyPct`|float||
- `unique` constraint on `bioguideId`
- `belongsTo` relationship to `states` table
- `belongsTo` relationship to `bills` table
- `hasMany` relationship to `follows` table


## `Bills` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`billId`|string(20)|unique, non-nullable|
|`type`|string(20)|non-nullable|
|`title`|text|non-nullable|
|`shortTitle`|text|non-nullable|
|`sponsorId`|str(10)|fkey(representative.bioguideId), non-nullable|
|`govtrackUrl`|string(500)||
|`introducedDate`|date|non-nullable|
|`active`|boolean||
|`lastVote`|date||
|`housePassage`|boolean||
|`senatePassage`|boolean||
|`enacted`|boolean||
|`vetoed`|boolean||
|`committees`|string(200)||
|`primarySubject`|string(200)||
|`summary`|text||
|`shortSummary`|text||
|`latestMajorActionDate`|date||
|`latestMajorAction`|string(500)||
- `unique` constraint on `billId`
- `belongsTo` relationship to `representatives` table
- `hasMany` relationship to `comments` table
- `hasMany` relationship to `votes` table


## `Votes` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`userId`|integer|fkey(user.id), non-nullable|
|`billId`|integer|fkey(bill.id), non-nullable|
|`isDownvote`|boolean|non-nullable|
- `belongsTo` relationship to `users` table
- `belongsTo` relationship to `bills` table


## `BillComments` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`userId`|integer|fkey(user.id), non-nullable|
|`billId`|integer|fkey(bill.id), non-nullable|
|`message`|text|non-nullable|
- `belongsTo` relationship to `users` table
- `belongsTo` relationship to `bills` table

## `ThreadComments` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`userId`|integer|fkey(user.id), non-nullable|
|`threadId`|integer|fkey(thread.id), non-nullable|
|`message`|text|non-nullable|
- `belongsTo` relationship to `users` table
- `belongsTo` relationship to `threads` table


## `Threads` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`ownerId`|integer|fkey(user.id), non-nullable|
|`scope`|string(10)|non-nullable|
|`title`|string(200)|non-nullable|
|`description`|string(500)||
- `belongsTo` relationship to `users` table
- `hasMany` relationship to `comments` table


## `Follows` Model
|column name|data type|constraints|
|-----------|-----------|-----------|
|`id`|integer|pkey, non-nullable|
|`userId`|integer|fkey(user.id), non-nullable|
|`representativeId`|integer|fkey(representative.id), non-nullable|
|`isConstituent`|boolean|non-nullable|
- `belongsTo` relationship to `users` table
- `belongsTo` relationship to `representatives` table

