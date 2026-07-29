# Versioning Noteberry

This is the current WiiWi version. So the first thing that we're doing is we are building a changeset file before we bump a version.
That's the current approach, it might improve in the future.

## Food for thought

Instead of creating a feature branch and then having all the commits from the feature branch be added into the change set, which might include some of the unnecessary commit messages, or which might bloat the whole change set file to include not necessary or useful commit logs, why don't we have a squashed feature branch, generate the change set file?
If we squash the whole feature branch into one commit, we can have a custom message that would describe what the changes were inside of that featured branch, instead of having like a big detailed List of commits that might include unnecessary commits too
