Feature: Manage favorite movies

  Scenario: Start with an empty favorite list
    Given the favorite movie list is empty
    Then I should not see any movies in the favorite list

  Scenario: Add a movie to the favorite list
    Given the favorite movie list is empty
    When I add "Inception" to the favorite list
    Then I should see "Inception" in the favorite list

  Scenario: Remove a movie from the favorite list
    Given the favorite movie list contains "Inception"
    When I remove "Inception" from the favorite list
    Then I should not see any movies in the favorite list
