# UI Building Approaches

# Directory Structure

- The project directory layout is based on **Atomic Design**
- Shadcn UI is used for building the UI components, `/components/ui` directory is specific
  for shadcn UI components.
- To avoid conflicts with Shadcn, all other components should be placed inside the
  **atomic design** specific directories.
- **atomic design** is a design pattern for creating UI [design systems by Brad Frost](https://atomicdesign.bradfrost.com/)

## Atomic Design Structure

This is a simple description of the building blocks for the application presentation layer, shows how components/elements are structured.

1. **Atoms**: Smallest, irreducible components. Atoms can be _buttons_, _icons_ or _input elements_
2. **Molecules**: Composed Atoms, simple composition of atoms that constitute larger UI elements.
3. **Organisms**: Complex UI components composed of groups of molecules and/or atoms. Organisms can be _navigation bars_, _forms_, or _cards_.
4. **Templates**: Page-level components that place components into a layout and articulate the design's underlying content structure.

## About State

- UI elements built using this system only are a presentation layer
- No state should be managed inside the components, aside from local state thats scoped
  to the component like _input elements/forms_, or _toggles_
- _Atoms_ should be dumb, _molecules/organisms_ manage their own state, and _organisms_
  handles complex state.
- state should be handled separately, should be detailed in a separate document [[application-state]]

## Styling

- UI is styled using _vanilla css_ paired with _tailwindcss_
- Ideally tailwind classes should be applied within the css style declaration blocks for each element/component
- Component styling using CSS should be built using [css-modules](https://github.com/css-modules/css-modules)
- CSS modules are locally scoped by default, they can be used to avoid naming conflicts for components
- Regular CSS can be used to style global elements like _body_, _html_, or _root_ elements, but should be avoided for styling components where possible.

## Testing and Building UI

- We're using storybook for testing and building UI components, it allows us to build and test components in isolation.
- Storybook can be used to test out layouts, atoms, and any of the building blocks of our UI system.
- Testing provides a good ground for working on functionality in isolation, essentially allowing us to build and test components without having to worry about the rest of the application.
