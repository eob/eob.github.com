---
layout: post
title: Using UISearchDisplayController with Three20
permalink: /2009/06/using-uisearchdisplaycontroller-with-three20
thumbnail: searchcontroller.png
tags:
- "iphone programming"
- "programming"
---

Joe Hewitt's <a href="http://github.com/joehewitt/three20/tree/master/">Three20
project</a> is a great set of libraries for iPhone development, but one of the
inevitable consequences of using it is that Apple eventually releases official
versions of some of the same "missing widgets" found in Three20. One such
example is the search functionality in tables.

I have been using Three20 for an exciting project I'm working on over the
summer, but also wanted to leverage the new search functionality of the iPhone
OS 3.0 instead of the Three20 search feature. It took about a day of poking
around the code-base of both, but ultimately only a few changes to the code,
which I'll describe here.

## Step 1: Implement the search delegates in your TTTableViewController

In your TTTableViewController interface, tack on the
`UISearchDisplayDelegate` and `UISearchBarDelegate` interfaces to
say you'll be implementing those. They will let the search bar and controller
send your controller events to let it know it is taking over.

## Step 2: Add the search bar to your table header

In your `loadView` method, create a new `UISearchBar` object and
add it to your table's header, like so:

```Objective-C
// [SNIP]
UISearchBar *searchBar = [[UISearchBar alloc] initWithFrame:CGRectMake(0, 0, self.tableView.frame.size.width, 0)];
searchBar.delegate = self;
searchBar.showsCancelButton = YES;
[searchBar sizeToFit];
self.tableView.tableHeaderView = searchBar;
[searchBar release];
```


## Step 3: Add a SearchDisplayController to your controller

In the same `loadView` method, create a new
`UISearchDisplayController`and add it to self:

```Objective-C
// [SNIP]
UISearchDisplayController *searchDisplayController = [[UISearchDisplayController alloc] initWithSearchBar:searchBar contentsController:self];
[self setSearchDisplayController:searchDisplayController];        
[searchDisplayController setDelegate:self];
[searchDisplayController setSearchContentsController:self];
[searchDisplayController setSearchResultsDataSource:self.dataSource];        
[searchDisplayController release];
```

Notice above that you are pointing the SearchDisplayController at several
different items: the UISearchBar from before, `self`, and also your
`TTTableViewDataSource`.

## Step 4. Implement the required delegates

Next we'll implement the required delegate methods that will be called when the
user interacts with the search bar.  Notice below that we're using these
methods to essentially pass information through to the data source.

```Objective-C
- (void)filterContentForSearchText:(NSString*)searchText scope:(NSString*)scope {
  [self.dataSource filterContentForSearchText:searchText scope:scope];
} 

- (BOOL)searchDisplayController:(UISearchDisplayController *)controller shouldReloadTableForSearchString:(NSString *)searchString {
  [self filterContentForSearchText:searchString scope:
    [[self.searchDisplayController.searchBar scopeButtonTitles] objectAtIndex:[self.searchDisplayController.searchBar selectedScopeButtonIndex]]];
    // Return YES to cause the search result table view to be reloaded.
    return YES;
}

- (BOOL)searchDisplayController:(UISearchDisplayController *)controller shouldReloadTableForSearchScope:(NSInteger)searchOption {
  [self filterContentForSearchText:[self.searchDisplayController.searchBar text] scope:
  [[self.searchDisplayController.searchBar scopeButtonTitles] objectAtIndex:searchOption]];
  // Return YES to cause the search result table view to be reloaded.
  return YES;
}

- (void)searchDisplayControllerDidBeginSearch:(UISearchDisplayController *)controller {
  DKSearchableDataSource *ds = self.dataSource;
  [controller setSearchResultsDelegate:self.tableView.delegate];
  ds.searchActive = YES;
}

- (void)searchDisplayControllerDidEndSearch:(UISearchDisplayController *)controller {
  DKSearchableDataSource *ds = self.dataSource;
  ds.searchActive = NO;
}
```

**Important!** Notice the `setSearchResultsDelegate` call above.
This occurs here instead of the `loadView` method above because the
table delegate hasn't yet been created when we're still inside of
`loadView` -- if you were to set it up there then selecting search
result cells wouldn't trigger a callback.

## Step 5. Modify your data source to be aware of search

Finally, we need to modify our data source to be aware of this new "search
mode." I did this with a pretty simple fix: I created a boolean property named
`searchActive` that is set by the owning controller (see the above
code). Then, in all the important methods, I put in a simple `if..else`
statement that returned one value for search mode results and another value for
normal usage. Here's an example:

```Objective-C
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  if (self.searchActive &amp;&amp; (self.searchText != nil)) {
    return self.filteredItems.count;
  }  else {
    return self.items.count;
  }
}
```

In the above conditional, I check for `searchText` to see if the user
has begun searching yet. If they haven't I want to display all results.

Finally, I need to implement the actual search method, which is simply passed
through from the controller class.

```Objective-C
- (void)filterContentForSearchText:(NSString*)searchText scope:(NSString*)scope {
  [self.filteredItems removeAllObjects]; // First clear the filtered array.
  self.searchText = searchText;
        
  /*
   * Search the main list for products whose type matches the scope (if
   * selected) and whose name matches searchText; add items that match to the
   * filtered array.
   */
   for (id *item in _items) {
     NSComparisonResult result = [[item searchText] compare:searchText options:(NSCaseInsensitiveSearch|NSDiacriticInsensitiveSearch) range:NSMakeRange(0, [searchText length])];
     if (result == NSOrderedSame) {
       [self.filteredItems addObject:item];
     }
   }
}
```

## Conclusion

I left a lot of explanation out here, but I hope this is enough to get you
started on using Apple's "official" search functionality with the Three20
library. Leave a comment if you have any questions or need a bit more
explanation of the code and I'll be glad to amend the post.

