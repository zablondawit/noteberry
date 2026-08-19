# Application State (UI & Application State)

- State should be atomic and separate from UI/presentation of the application
- State should be managed in a single source of truth, and should be accessible to all components that need it
- State for UI elements and application state should be logically separated, but also separate libraries are used in this application.

# UI State

- UI state is managed using zustand

# Calculator State

- the application state is managed using [DexieDB](https://dexie.org/)
- Dexie is in-browser database a local storage facade

NOTE: working on a state management system for the application, will be detailed in this document.
