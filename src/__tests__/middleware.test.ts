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
  const app = createServer(extender.set('foo.bar', 'New value'), defaultBody)
  const { body } = await request(app).get('/foo');
  t.deepEqual(body, { foo: { bar: 'New value' } });
});

test('Should set new object value to nested path', async (t) => {
  const defaultBody = {
    foo: {
      bar: 'baz'
    }
  };
  const app = createServer(extender.set('foo.bar', { baz: 'quax' }), defaultBody)
  const { body } = await request(app).get('/foo');
  t.deepEqual(body, { foo: { bar: { baz: 'quax' } } });
});

