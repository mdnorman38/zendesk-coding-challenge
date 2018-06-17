# Zendesk Coding Challenge Submission

#### Background

I was originally going to build the ticket viewer application in Angular, but decided to build the app in regular JavaScript as I didn't want an overcomplicated solution.

The problem with working in native JavaScript is Cross-Origin Requests. To bypass this, I created a proxy server using Node.js that basically takes requests that end in ```/tickets.json*``` and forwards them to the Zendesk API.

####Prerequisites

* [Node JS](https://nodejs.org/en/download/) 

#### Setup

1. Clone the repository

```
git clone https://github.com/mdnorman38/zendesk-coding-challenge.git
```

2. CD into downloaded repository

```
cd zendesk-coding-challenge
```

3. Install Node Packages

```
npm install
```

4. Start the proxy server

```
node server.js
```

5. Navigate to localhost:4000 to access the ticket viewer

#### Tests

For this project, Jasmine was used as the unit testing framework. To run the tests, navigate to:
```
localhost:4000/tests/SpecRunner.html
```

####Troubleshooting 

* Upgrade NodeJS:
	1. ``` sudo npm cache clean -f ```
	2. ``` sudo npm install -g n ```
	3. ``` sudo n stable ```

* Open a pull request.