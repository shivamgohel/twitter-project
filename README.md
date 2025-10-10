# 🐦 Twitter Clone — Feature Requirements

## ✅ Core Features

### 1. User Authentication

- User can sign up and log in.
- Secure password storage (hashed).
- Authenticated sessions using JWT.
- Only authenticated users can post, like, retweet, etc.

---

### 2. Tweet Functionality

- **Post a Tweet**
  - Text content (280 characters max).
  - Media support.
- **Comment on a Tweet (Tweet to Tweet)**
  - Users can reply to tweets.
  - Threading via parent tweet reference.
- **Retweet**
  - Users can retweet existing tweets.
  - include a comment (quote retweet).
- **Like a Tweet**
  - Users can like/unlike a tweet.

---

### 3. User Profile & Social Features

- **Visit Other User Profiles**
  - View tweets, bio, followers, and following.
- **Follow/Unfollow Users**
  - Users can follow and unfollow other users.
  - Maintain follower/following relationships.

---

### 4. Hashtag Functionality

- **Hashtag Parsing**
  - Detect `#hashtags` in tweet content.
- **Explore Hashtags**
  - View all tweets under a specific hashtag.
  - Trending tags (optional).

---
