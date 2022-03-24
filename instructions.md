# Github Stats

Explore the main statistics of the Github community and store your favorite
users for future reference using `Github Stats` app.

## Resources

- Design: **[here](https://www.figma.com/file/C8B1T1HFdUI2kaFGYwXOOI/Github-Stats?node-id=0%3A1)**
- [App API Repo](https://github.com/codeableorg/github-stats-api) (includes insomnia file)
- [GitHub REST API](https://docs.github.com/en/rest)

## **User personas**

There's only one type of user for Github Stats application, this will be
referred as "user"

## **Stories:**

### **User can login**

As a user, I want access the app so that I can start enjoying its benefits

- Given that I am not logged in
- When I enter the app (`/`)
- Then I see the login form
- When I enter my correct credentials and click the “Login” button
- Then I am redirected to `/search`

### **User can signup**

As a user, I want to create an account

- Given that I am not logged in
- When I enter the app (`/`)
- Then I see the login form
- When I click the “Create Account” link
- Then I see the signup form
- When I enter my information and click the “Create Account” button
- Then I am redirected to `/search`

### **User can update their profile**

As a user, I want to update my personal information so it reflects my current
identity

- Given that I am logged in
- When I click on the User icon on the navigation bar
- I am redirected to /profile
- And I see the profile form
- When I change my information and click on the “Update” button
- Then my information is updated

### **User can see the search page**

As a user, I want to access the search page to start looking up for GitHub users

- Given that I am on any page
- When I click the search icon on the navigation bar
- Then I am redirected to the Search Page.

- When I enter manually the path `/search`
- Then I am redirected to the Search Page.

- And I see an input, search result, and navigation bar.

### User can search for a github user

As a user, I want to search for the statistics of a github user

- Given that I am on the Search page
- When I type a valid github username on the search input
- Then the github username information is displayed on the page

### **User can mark a user as favorite**

As a user, I want to mark any Github user as a favorite so that I can access
them quicker in the future.

- Given that I am on the Search page
- And a no-favorite user is being displayed
- When I click on the star icon
- The user is added as a favorite and the star change to the selected state.

### **User can see their favorite Github users**

As a user, I can see a list of all my favorite Github users so that I can check
their statistics directly.

- Given that I am on any page
- When I click the Star icon in the navigation bar
- I am redirected to the Favorites page (`/favorites`)
- And I see a list of my first 7 favorite users with their avatar, name, and
  username
- **[optional]** And a pagination component that allows me to explore more
  favorite user if there is more than 7.

### **User can see the Github user followers**

As a user, I can see a list of followers of a Github user so that I can explore
their network.

- Given that I am on the Search page
- And a user is being displayed
- When I click the follower's card
- I am redirected to the follower's page (`/users/:username/followers`)
- And I see a list of the first 7 followers for that user with their avatar and
  username
- **[optional]** And a pagination component that allows me to explore more
  followers if there is more than 7.

### **Users can see the Github user followings**

As a user, I can see a list of followings of a Github user so that I can explore
their network.

- Given that I am on the Search page
- And a user is being displayed
- When I click the followings card
- I am redirected to the follower's page (`/users/:username/followings`)
- And I see a list of the first 7 followings for that user with their avatar and
  username
- **[optional]** And a pagination component that allows me to explore more
  followings if there are more than 7.

### **Users can see the Github user public repos**

As a user, I can see a list of public repos of a Github user so that I can
explore their content.

- Given that I am on the Search page
- And a user is being displayed
- When I click the public repos card
- I am redirected to the public repos page (`/users/:username/repos`)
- And I see a list of the first 5 public repos for that user with their full
  name, description, language, star count, and fork count.
- **[optional]** And a pagination component that allows me to explore more repos
  if there are more than 5.

<aside>
💡 Each language should have a specific color (you decide which one)

</aside>

### **Users can navigate to a Github user public repo**

As a user, I can navigate to any public repo so that I can learn more about it.

- Given that I am on the Public repos page
- When I click on any repo card
- I am redirected to the Github repo in a separate tab.

## Consideration

- Use Emotion to style your components
- Use React Router to handle URL navigation
- Maintain the state when the page is refreshed.
- Use debounce pattern to avoid making requests on each keyboard stroke
- Add transitions/animations to make your app visually appealing.

HAPPY CODING! 👨‍💻 👨‍💻
