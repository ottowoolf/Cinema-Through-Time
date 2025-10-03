# Cinema Through Time

An informational website to explore data from the NFSA API (University Project)

### Link to Working Web Application

https://ottowoolf.github.io/Cinema-Through-Time/

### Introduction

A single-page web app designed for users to explore Australian cinema across different decades. Building on my prototype from assessment 1, the implementation displays dynamic data from the NFSA API.

### User Experience

To avoid confusion, I decided to remove the search functionality based on feedback from the teaching team, as that showed me clearly that the intended functionality is confusing at first sight. I believe the decade-based browsing is a much simpler and more user-friendly alternative.

To browse movies, users can navigate through a card-based carousel and explore movie details, while also being treated to an exciting “Surprise Me” feature to discover movies organically and randomly. These two aspects of the implementation enforce the Generous Interfaces (Whitelaw, 2015) and Information Flaneur (Dörk et al. 2011) concepts that this unit was generous to share with me.

### Responsivness

While CSS media queries were my first approach to a fully responsive website, I was able to achieve this with out-of-the-box Bootstrap and a few CSS styles, making the website fully responsive for any screen size and device. I managed to create a balanced functionality, visual appeal, and ease of use.

### Technical aspects

Data retrieval via the NFSA API was implemented using asynchronous fetch requests, including error handling. Decade buttons trigger API calls filtered by year ranges from the array of results, while the carousel maintains a scrollable view with left and right buttons for navigation. The “Surprise Me” feature selects a random movie from the array results, dynamically generating a card with a random background colour to replace missing imagery.

### Challenges

One technical challenge or limitation I faced was that the API did not provide images for many results nor many decades to choose from, so I implemented a random colour system to resolve the first issue, which at the same time adds visual differentiation and a little bit of colour to the website, following the recommendation and feedback from Riley.

For development efficiency, I relied on AI tools to discuss code approaches, explore alternatives, and understand concepts, allowing me to test a live-prototyping workflow that could be applied to client projects.

### AI usage

For my own benefit, I decided to rely on AI tools to have a back-and-forth discussion about the code, generate different approaches and understand different concepts. The aim of this is to test how I can implement this workflow in my own work for efficiency and live prototypes for clients.

### Reflection & Learning

This project was a chance for me to reflect on how quickly technology has changed and what can be achieved with modern tools. Overall, the project enhanced my understanding of responsive design, API integration, while encouraging me to practice creative problem solving, showing how intentional design and modern technology can create accessible, functional and fun web applications.

### References

NFSA. (2025). _Cinematographer Bert Ive behind a camera at Torrens Lake in Adelaide. Taken during the filming of Glimpses of South Australia, 1930_ [Photograph]. National Film and Sound Archive. https://www.nfsa.gov.au/latest/bert-ive-filming-australia-for-the-world

NFSA. (2025). _National Film and Sound Archive API_. https://api.collection.nfsa.gov.au

OpenAI. (2025). ChatGPT [Large language model]. https://openai.com/chatgpt
Anthropic. (2025). Claude [Large language model]. https://www.anthropic.com/claudehttps://openai.com/chatgpt
