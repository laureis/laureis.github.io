# API

This library provides a simple interface to send and retrieve information from a distant REST api.
This api is build on top of `node-rest-client' and `node-rest-client-promise`.

## Usage

### Import
The API object is initialized in the App component. You just need to import it.
```js
import api from 'library/api'
```

### Sending
HTTP requests are sent by calling the method with the appropriate name
```js
api.get()
api.post()
api.put()
api.delete()
```

#### GET
GET queries only take an URL as a parameter
```js
api.get('websi.te/get/user/name')
````

#### POST, PUT, DELETE
Others queries can take data that can be sent to the server alongside the query.
```js
api.post(url, data)
api.post('websi.te/set/user/name', {name: 'John Doe'})
```

You can also send blob data such as files, setting the function third parameter (multipart) to true
```js
api.post(url, data, multipart)
api.post('websi.te/set/user/picture', {picture: blob}, true)
```

### Receiving
The api is using Promises to handle async calls. All request methods return a Promise that resolve to an object.  
All response correctly received but bearing an HTTP error code (3XX, 4XX, 5XX) will be treated as success.  
A fail request means the network is down, the response was malformed, there was a network error, etc.

**Success**
```js
{
  success: true,
  status: statusCode // int: 200, 400, 503 etc.
  headers: headers // object: response (and request) headers
  body: body // returned content parsed (expect json but can be empty if none returned)
}
```

**Fail**
```js
{
  success: false
}
```

