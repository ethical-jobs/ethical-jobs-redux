# 0.2.34

- mergeCollectionSuccess now treats payload results order as the definitive order instead of merging into state 

# 0.2.33

- mergeCollectionSuccess now maintains order when merging Collections by using an Immutable.js OrderedSet instead of Set. 

# 0.2.32

- mergeSuccess now replaces entites state, not merge (bug)

# 0.2.30

- added syncFilter actions
- added syncFilter test helpers
- added syncFilter selector factory and tests

# 0.2.26

- seperating immutable utility tests
- improving immutable utility tests
- `results` are now the `Set` type so we can create unions

# 0.2.24

- adding changelog (no backlog)
- clearFilters immutble helper 
- clearFilters assertion test helper
