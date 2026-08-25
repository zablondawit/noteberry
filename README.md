# Noteberry 🍓

[Check out the live demo](https://calculator.qebero.dev/)

- A notepad calculator that assists you to think, store and share calculations
- I built this editor as this is the product I want to use myself, it's a calculator wrapped inside a notepad interface.
- It does math operations, defines functions and stores results in values
- A function is a block of expression that can be evaluated as a single unit
- A function takes an input and results in an output, which are both evaluated to a mathematical value

![Video GIF](./docs/output.gif)

## Inspiration

- This is a passion project of mine, having used multiple calculators and notepads, I wanted to combine the two into a single application that can be used to store and share calculations.
- I have tried a couple of applications that do the same thing, but there is always something missing.
- A calculator should be
  - easy to follow
  - reusable so you can reuse calculations from the other day
  - share your calculations to a friend
  - have tools to do more than just do simple BODMAS calculations
- Hopefully this project grows to reflect what I always believed a modern day calculator should be.

## Terms

We'll be using these terms to describe the application.

- Notepad, the whole application and it's state
- Pad, a single unit of data that contains a set of lines that can be calculated into results
- Evaluation, the process of evaluating a math expression or javascript function
- Result, the resulting data representation of an evaluation of either a line or a page
- Output, the visual representation of a result

NOTE: The term Pad since a single file in our application can be viewed through a notepad interface or a simple calculator interface, and is not limited to just one view.

## Multi-View Calculator UI (Update Aug 25 2026)

- As I am building the application, I have realized that it will be good to have an interface for the normal calculator use-case.
- Simple grid of buttons, used to do quick simple calculations. This is similar to how every other calculator application is built
- This is interesting because it is actually compatible with the notepad calculator, in a certain way.
- Treating the notepad as a history of calculations, the calculator can be used to do quick calculations and then store the results in the notepad for later use.
- This is not limited to just two types of views, can be expanded as needed or if needed.
- In conclusion, having the UI be able to switch between simple view and notepad view is a good idea, as it allows for more flexibility in how the application can be used.

## Roadmap

1. [x] Evaluating Math Expressions
2. [ ] Performing pre-defined actions as directives
3. [ ] Saving and loading pages locally on the users device
4. [ ] Saving and loading pages remotely on a server
5. [ ] Exporting page and result in multiple formats (HTML, PDF, etc.)
6. [ ] Defining and calling javascript functions
7. [ ] Exposing javascript functions inside a page as an module that can be reused inside another page
8. [ ] Sharing pages with other users
9. [ ] Multi-view calculator UI (simple calculator view and notepad view)

## Contribution

For contributing to this project, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.
