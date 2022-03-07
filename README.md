# How to Run the App

1. npm install
2. npm run server (It will start mocking server)
3. npm run start

## For improvement

1. TableView is a bit overwhelmed due to the business logic of this component. What we can do is extract that logic into a separate custom hook to clean the component.
2. Pagination is not implemented, that means when the drivers list is long, it will have issues. Other alternatives include using a virtualized list.
3. useRequest can be refactored to handle more generic request.
4. UI and css is not the focus of the test and it can be improved.
