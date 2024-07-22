# Star Wars Character Search App

## Overview

The Star Wars Character Search App allows users to search for and sort through a list of characters from the Star Wars universe. The app fetches character data from an external API and displays the results in a user-friendly interface.

## Features

- **Character Search**: Type in the name of a Star Wars character to search for them.
- **Sorting**: Sort characters by name, eye color, or creation date.
- **Pagination**: View results in pages with selectable page sizes.
- **Data Fetching**: Efficiently fetches data from the Star Wars API.

## Home Screen

The home screen is the main interface where users can search for characters, sort the results, and navigate through pages.

### Components

- **Header**: Displays the app title.
- **Search Input**: A text input field where users can type a character's name to search.
- **Sort Options**: Buttons to sort the character list by name, eye color, or creation date.
- **Page Size Selector**: Options to select the number of results per page (25, 50, 100, 150).
- **Character List**: A list of characters that match the search query and sorting criteria.
- **Pagination Controls**: Controls to navigate through different pages of results.

### Code Structure

#### State Management

- useState hook to manage components internal state
- react-query to manage server-side data
- react context to pass down whether fonts are loaded
  - I want to show a custom loading screen while the app is loading the fonts, this causes the screens to render too, but without the fonts loading first it can cause an error

#### API Data Fetching

The app uses the `useQuery` hook from `@tanstack/react-query` to fetch character data from the API.
Stale time is set to 60000ms meaning the data won't be refetched again until one minute passed by or the user manually refetches using pull to refresh.

```
queryFn: () =>

getCharacters({

filters: { search:  query },

}),
```

getCharacters function makes a series of api calls to fetch all the characters from the endpoint. By default, the SWAPI endpoint only returns 10 characters at a time. But to satisfy the sorting requirements of the task I have to prefetch all the data and do the sorting and pagination on the client side. If I had access to the backend side of this application I would do the sorting and pagination on the server side when querying the data from the db. This way I could fetch only the data visible on the screen and save internet usage and time for the user. Also, I would prefer to do infinite scroll instead of pagination but this solution better showcases the page size requirement in the task.

The filter props responsible for fetching the appropriate data for the search input value. The input uses debounce to optimize the number of requests made while typing.

#### Sorting and Rendering

Characters are sorted based on the selected criteria using the `sortCharacters` utility function and rendered in a `FlatList`.
Sorting happens when the user presses the column header.
The first time selected it will sort in ascending order, the second time in descending order, and the third time will reset the default sorting.
Default sorting: 1. First, list characters with blue eyes in alphabetical order. 2. Then, continue the list with other characters sorted by "created date".

```
const sortedData = sortCharacters(data?.results || ([] as Character[]), sort);

const renderItem = useCallback(
  ({ item }: ListRenderItemInfo<Character>) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.eye_color}</Text>
      <Text style={styles.cell}>
        {new Date(item.created).toLocaleDateString()}
      </Text>
    </View>
  ),
  []
);
```

### Styles

The app has a simple design using the colors of the classic Star Wars logo.
Primary color:#ffed1e
Secondary color:#ffffe0
Background color:"black"

### Technologies user

- Expo framework for ease of development
- Expo-router for navigation 
- Axios for API calls
- useQuery for fetch optimization
- lodash for text input debounce
- jest, react-testing-library for testing
- vector-icons to display current sorting
- lottie for animations

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1.  Clone the repository:

`git clone <repository-url>`

2.  Navigate to the project directory:

`cd star-wars-character-search`

3.  Install dependencies:

`npm install
or
yarn install`

### Running the App

Start the development server:

`npm start
or
yarn start`

### Running Tests

The app uses Jest for unit testing. Run the tests with the following command:

`npm test
 or
yarn test`

## Usage

1.  **Search for Characters**: Type the name of a character in the search input.
2.  **Sort Results**: Click on the column headers (Name, Eye color, Created at) to sort the results.
3.  **Change Page Size**: Select the desired page size from the page size options.
4.  **Navigate Pages**: Use the pagination controls to navigate through different pages of results.
