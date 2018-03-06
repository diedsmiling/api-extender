import * as express from 'express';
// tslint:disable-next-line
import test from 'ava';
import * as request from 'supertest';
import { Extender, apiExtenderMiddleware } from '../index';
import { ModifierInterface, JSON } from '../types';
const extender = new Extender();

const createServer = (modifier: ModifierInterface, defaultBody: JSON) => {
  const app = express();
  app.use(apiExtenderMiddleware([
    {
      url: '/foo',
      apply: modifier
    }
  ]));

  app.get('/foo', (req, res) => {
    res.json(defaultBody);
  });

  return app;
};

test('Should set new value to nested path', async (t) => {
  const defaultBody = {
    foo: {
      bar: 'baz'
    }
  };
  const app = createServer(extender.set('foo.bar', 'New value'), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: 'New value' } });
});

test('Should set new object value to nested path', async (t) => {
  const defaultBody = {
    foo: {
      bar: 'baz'
    }
  };
  const app = createServer(extender.set('foo.bar', { baz: 'qux' }), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: { baz: 'qux' } } });
});

test('Should add new value to object', async (t) => {
  const defaultBody = {
    foo: {
      bar: 'baz'
    }
  };
  const app = createServer(extender.set('foo.baz', 'qux'), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: 'baz', baz: 'qux' } });
});


test('Should replace element in array', async (t) => {
  const defaultBody = {
    foo: {
      bar: [0, 1, 3, 3]
    }
  };

  const app = createServer(extender.set('foo.bar.2', 2), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: [0, 1, 2, 3] } });
});

test('Should delete a property', async (t) => {
  const defaultBody = {
    foo: {
      bar: 'baz',
      baz: 'qux'
    }
  };

  const app = createServer(extender.delete('foo.bar'), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { baz: 'qux' } });
});

test('Should push element into array', async (t) => {
  const defaultBody = {
    foo: {
      bar: [0, 1, 2, 3]
    }
  };

  const app = createServer(extender.push('foo.bar', 4), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: [0, 1, 2, 3, 4] } });
});

test('Should unshift element into array', async (t) => {
  const defaultBody = {
    foo: {
      bar: [1, 2, 3]
    }
  };

  const app = createServer(extender.unshift('foo.bar', 0), defaultBody);
  const { body } = await request(app).get('/foo');

  t.deepEqual(body, { foo: { bar: [0, 1, 2, 3] } });
});

