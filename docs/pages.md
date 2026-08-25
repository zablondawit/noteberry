# Application Pages

- The application is structured into several pages, each serving a specific purpose. The main pages include: Home Page, List of Pads, Pad Editor/Calculator, and Settings Page.
- Home Page: Landing Page of the application, can list recently used, starred, or folders pads.
- List of Pads: Displays all the pads and folders available to the user, allowing them to select and open a specific pad for editing or calculation.
- Pad Editor/Calculator: The main interface for creating, editing, and performing calculations within a pad.
- Settings Page: Allows the user to configure application preferences and settings.
- The application is designed to provide a seamless experience for users, enabling them to easily navigate between pages and access the features they need. Each page is optimized for usability and functionality, ensuring that users can efficiently manage their pads and perform calculations as required.

## Implementation

- We'll be using tan-stack router, for now it's suitable
- The application will be built using a modern web framework, ensuring responsiveness and compatibility across different devices and browsers.

### Configuring TanStack Router

1. We're using `pages` instead `routes` for the pages of the application,
   makes logical sense to me although it might not be the idiomatic way to work with TanStack
2. generated routes from the pages folder is in the `routes.gen.ts`,
   same here logically makes makes sense to me.
