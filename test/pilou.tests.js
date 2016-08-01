import test from 'ava';
import nock from 'nock';

import resource from '../pilou';

const clients = resource('clients');

test('should get all clients', t => {
  nock('http://localhost/').get('/api/clients/').reply(200, {});
  return clients.all().then(response => {
    t.is(response.status, 200);
  });
});

test('should get all clients with parameters', t => {
  nock('http://localhost/').get('/api/clients/?param1=10&param2=-created').reply(200, {});
  return clients.all({params: {param1: 10, param2: '-created'}}).then(response => {
    t.is(response.status, 200);
  });
});

test('should get one resource', t => {
  nock('http://localhost/').get('/api/clients/c8e4f983-8ffe-b705-4064-d3b7aa4a4782/').reply(200, {});
  return clients.get({id: 'c8e4f983-8ffe-b705-4064-d3b7aa4a4782'}).then(response => {
    t.is(response.status, 200);
  });
});

test('should get one resource with parameters', t => {
  nock('http://localhost/').get('/api/clients/c8e4f983-8ffe-b705-4064-d3b7aa4a4782/?param1=10&param2=-created').reply(200, {});
  return clients.get({id: 'c8e4f983-8ffe-b705-4064-d3b7aa4a4782'}, {params: {param1: 10, param2: '-created'}})
    .then(response => {
      t.is(response.status, 200);
    });
});

test('should create one resource', t => {
  nock('http://localhost/').post('/api/clients/', {name: 'resource'}).reply(201, {});
  return clients.create({name: 'resource'}).then(response => {
    t.is(response.status, 201);
  });
});

test('should create one resource with parameters', t => {
  nock('http://localhost/').post('/api/clients/?param1=10&param2=-created', {name: 'resource'}).reply(201, {});
  return clients.create({name: 'resource'}, {params: {param1: 10, param2: '-created'}}).then(response => {
    t.is(response.status, 201);
  });
});

test('should update one resource', t => {
  nock('http://localhost/').put('/api/clients/c8e4f983-4064-8ffe-b705-d3b7aa4a4782/', {}).reply(200, {});
  return clients.update({id: 'c8e4f983-4064-8ffe-b705-d3b7aa4a4782'}, {}).then(response => {
    t.is(response.status, 200);
  });
});

test('should update one resource with parameters', t => {
  nock('http://localhost/').put('/api/clients/2/?param1=10&param2=-created', {}).reply(200, {});
  return clients.update({id: '2'}, {}, {params: {param1: 10, param2: '-created'}}).then(response => {
    t.is(response.status, 200);
  });
});

test('should delete one resource', t => {
  nock('http://localhost/').delete('/api/clients/c8e4f983-8ffe-4064-b705-d3b7aa4a4782/').reply(204);
  return clients.delete({id: 'c8e4f983-8ffe-4064-b705-d3b7aa4a4782'}).then(response => {
    t.is(response.status, 204);
  });
});

test('should delete one resource with parameters', t => {
  nock('http://localhost/').delete('/api/clients/8/?param1=10&param2=-created').reply(204);
  return clients.delete({id: '8'}, {params: {param1: 10, param2: '-created'}}).then(response => {
    t.is(response.status, 204);
  });
});

test('should send requests with headers', t => {
  const headers = {Accept: 'application/json, text/javascript, *!/!*;'};
  nock('http://localhost/', headers).get('/api/clients/').query(true).reply(200, {});

  return clients.all({headers}).then(response => {
    t.is(response.status, 200);
  });
});

test('should get one resource with custom endpoint', t => {
  nock('http://localhost/').get('/api/clients/c8e4f983-8ffe-b705-4064-d3b7aa4a4782/').reply(200, {});
  return clients.get({id: 'c8e4f983-8ffe-b705-4064-d3b7aa4a4782'}).then(response => {
    t.is(response.status, 200);
  });
});

test('should allow custom endpoint', t => {
  nock('http://localhost/').get('/api/v2/equipments').reply(200, {});
  const equipments = resource('equipments', {
    all: '/api/v2/${resource}'
  });
  return equipments.all().then(response => {
    t.is(response.status, 200);
  });
});

test('should define only all and get custom endpoint', t => {
  nock('http://localhost/').put('/api/v2/equipments/42').reply(200, {});
  const equipments = resource('equipments', {
    all: '/api/v2/${resource}',
    get: '/api/v2/${resource}/${equipmentId}'
  });
  return equipments.update({equipmentId: 42}, {}).then(response => {
    t.is(response.status, 200);
  });
});

test('should allow custom endpoint for all method', t => {
  nock('http://localhost/').get('/api/v3/equipments/').reply(200, {});
  const equipments = resource('equipments');
  return equipments.all({url: '/api/v3/equipments/'}).then(response => {
    t.is(response.status, 200);
  });
});

test('should allow custom endpoint for get method', t => {
  nock('http://localhost/').get('/api/v3/equipments/42/').reply(200, {});
  const equipments = resource('equipments');
  return equipments.get({idEquipment: 42}, {url: '/api/v3/equipments/${idEquipment}/'}).then(response => {
    t.is(response.status, 200);
  });
});

test('should allow custom endpoint for put method', t => {
  nock('http://localhost/').put('/api/v3/equipments/42/', {name: 'new name'}).reply(200, {});
  const equipments = resource('equipments');
  return equipments.update({idEquipment: 42}, {name: 'new name'}, {url: '/api/v3/equipments/${idEquipment}/'}).then(response => {
    t.is(response.status, 200);
  });
});

test('should allow custom endpoint for post method', t => {
  nock('http://localhost/').post('/api/v3/equipments/', {name: 'new name'}).reply(201, {});
  const equipments = resource('equipments');
  return equipments.create({name: 'new name'}, {url: '/api/v3/equipments/'}).then(response => {
    t.is(response.status, 201);
  });
});

test('should allow custom endpoint for delete method', t => {
  nock('http://localhost/').delete('/api/v3/equipments/42/').reply(204, {});
  const equipments = resource('equipments');
  return equipments.delete({idEquipment: 42}, {url: '/api/v3/equipments/${idEquipment}/'}).then(response => {
    t.is(response.status, 204);
  });
});
