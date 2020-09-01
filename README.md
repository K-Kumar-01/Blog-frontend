The frontend of a seo friendly blogging platform

## Getting Started
1. Clone repo
2. Navigate to the folder and run `yarn install` to install the dependencies
3. Create a next.config.js file in maiin folder having the following structure
```javascript
module.exports = {
	publicRuntimeConfig: {
		APP_NAME: '',
		API_DEVELOPMENT: '',
		API_PRODUCTION: '',
		PRODUCTION: false,
		DOMAIN_DEVELOPMENT: '',
		DOMAIN_PRODUCTION: '',
		FB_APP_ID: '',
		DISQUS_SHORTNAME: '',
		GOOGLE_CLIENT_ID: '',
	},
};
```
4. Run `yarn dev`. 
5. The program will be running on port 3000 

# Note
This project requires backend which is available [here](https://github.com/K-Kumar-01/Blogging-backend)
