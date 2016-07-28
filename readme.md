[![Build Status](https://travis-ci.org/guillaumevincent/pilou.svg?branch=master)](https://travis-ci.org/guillaumevincent/pilou)

# Pilou

http crud library for making web requests with promises

## Requirements

  * ES6
  * node 4+

## Install

    npm install pilou
  
## Methods

    pilou(resource, [options])

## Default Actions
```js
all: {method: 'GET'}
create: {method: 'POST'}
get: {method: 'GET'}
update: {method: 'PUT'}
delete: {method: 'DELETE'}
```

## API

### All
```js
  import resource from 'pilou';
  
  const clients = resource('clients');
  
  // GET /api/clients/
  clients.all().then(response => {
    console.log(response.data);
    console.log(response.status);
  });
```

### Get
```js  
  // GET /api/clients/c8e4f983-8ffe-b705-4064-d3b7aa4a4782/
  clients.get({id: 'c8e4f983-8ffe-b705-4064-d3b7aa4a4782'});
```

### Create
```js
  // POST /api/clients/ {name: 'resource name'}
  clients.create({name: 'resource name'});
```

### Update
```js
  // PUT /api/clients/c8e4f983-4064-8ffe-b705-d3b7aa4a4782/
  clients.update({id: 'c8e4f983-4064-8ffe-b705-d3b7aa4a4782'}, {name: 'updated name'});
```

### Delete
```js
  // DELETE /api/clients/c8e4f983-4064-8ffe-b705-d3b7aa4a4782/
  clients.delete({id: 'c8e4f983-8ffe-4064-b705-d3b7aa4a4782'});
```

## Headers and Params
```js  
  const config = {
    headers: {Authorization: `JWT 3b7aa4a47823b7aa4a47823b7aa4a4782`},
    params: {date: '-created'}
  };
  // GET /api/clients/?date=-created
  clients.all(config);
```

## Options

customize endpoints
```js  
    const equipments = resource('equipments', {
      all: '/api/v2/${resource}',
      get: '/api/v2/${resource}/${equipmentId}'
    });
    
    // GET /api/v2/equipments
    equipments.all();
    
    // POST /api/v2/equipments {equipmentName: 'foo'}
    equipments.create({equipmentName: 'foo'});
    
    // GET /api/v2/equipments/42
    equipments.get({equipmentId: 42});
    
    // PUT /api/v2/equipments/42 {equipmentName: 'foo'}
    equipments.update({equipmentId: 42}, {equipmentName: 'foo'});
```

customize every endpoints

```js  
    const equipments = resource('equipments', {
      all: '/api/all/${resource}/',
      create: '/api/v2/${resource}',
      get: '/api/get/${resource}/${id}/',
      update: '/api/update/${resource}/${id}/',
      delete: '/api/v2/${resource}/${id}'
    });
```

## License

MIT - see license file