import axios from 'axios';
import template from 'es6-template-strings';


export default function (resource, options = {}) {
  const defaultOptions = {
    all: options.all || '/api/${resource}/',
    create: options.create || options.all || '/api/${resource}/',
    get: options.get || '/api/${resource}/${id}/',
    update: options.update || options.get || '/api/${resource}/${id}/',
    delete: options.delete || options.get || '/api/${resource}/${id}/'
  };

  return {
    _getUrl(method, resource, defaultOptions, context = {}) {
      const templateUrl = defaultOptions[method];
      return template(templateUrl, Object.assign({resource}, context));
    },
    all(config = {}) {
      const url = this._getUrl('all', resource, defaultOptions);
      return axios.get(url, config);
    },
    create(json, config = {}) {
      const url = this._getUrl('create', resource, defaultOptions);
      return axios.post(url, json, config);
    },
    get(context, config = {}) {
      const url = this._getUrl('get', resource, defaultOptions, context);
      return axios.get(`${url}`, config);
    },
    update(context, json, config = {}) {
      const url = this._getUrl('update', resource, defaultOptions, context);
      return axios.put(`${url}`, json, config);
    },
    delete(context, config = {}) {
      const url = this._getUrl('delete', resource, defaultOptions, context);
      return axios.delete(`${url}`, config);
    }
  };
}
