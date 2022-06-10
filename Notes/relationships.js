/* 
* New goal (09/06): add relationships between collections to our MongoDB database

Currently when a user creates an album, it is stored in that user's "albums" array (in the "users" collection) as a nested document.

For example:

{
    username: "JamieC"
    ...
    albums: [
        {
            _id: 1234,
            albumTitle: "Kittens For Everyone",
            albumYear: 2022,
            band: "Black Sabbath"
        }
    ]
}

However, what happens if 1000 users create the same album?

* Answer: we get 1000 *identical* nested documents throughout our "users" collection - 1 for each "user" document.

* Problem: redundant data, repetition - we should only need to create a document for an individual album once!

* Solution: introduce *relationships* in our "albums-project" database!

? This means that, by the end of Monday, we should have TWO collections: "users" and "albums".
    - Each time a user creates an album we haven't seen before, it can be inserted into the "albums" collection.
    - (From Monday) Each user can still have an array for their albums, but instead of objects, the array will contain the ObjectId for each album they created!

{
    username: "JamieC"
    ...
    albums: [
        abcd1234,
        efgh5678,
        ijklmn90, 
        etc...
    ]
}

If we want to know more details about one of the user's albums (what is the band, year, title?)...
... we will soon be able to go to the "albums" collection, find the album with the same id, and "bring back" its details to the user document 
... (e.g. so we can render the album in the browser).

* Benefits: we only need to create an album once...
* ... but MANY users can have a copy of its ID in their "albums" array.

So soon, we will have TWO collections:
    - users (containing user documents)
    - albums (containing album documents)

* So let's start by creating the "albums" collection...
* ... and make it so that when the user creates an album it goes into the "albums" collection as a document
* (Note: For now we will not update the user's document - that is for Monday!)

? For example, if a user creates the "Black Sabbath" album in the browser and clicks the button...
? The new album document will be created in the >> "albums" << collection:

{
    id: abcd1234,
    albumTitle: "Kittens For Everyone",
    albumYear: 2022,
    band: "Black Sabbath"
}

*/