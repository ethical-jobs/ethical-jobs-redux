# [staged]

# v1.4.0

- Preventing merge of nested entities Lists

# v1.3.0

- Migrating NPM package to organisation ethical-jobs

# v1.2.1

- Upgrading rollup build facilities
- Only building ES and CommonJS modules.

# v1.1.0

- Removing Error merging from mergeFailure

# v1.0.0

- Bumping sem ver.
- All immutable redux module merge functions should merge state, not replace it.
- Removing mergeSearchRequest. State should not be cleared. Can be done manually.
- Upgrading package versions.

# 0.2.36

- Updated the package version

# 0.2.35

- Reverted the change in 0.2.34

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
