import axios from 'axios';
import generateTemplateString from 'es6-template-render';

module.exports = function (resource, options = {}) {
  const defaultOptions = {
    all: options.all || '/api/${resource}/',
    create: options.create || options.all || '/api/${resource}/',
    get: options.get || '/api/${resource}/${id}/',
    update: options.update || options.get || '/api/${resource}/${id}/',
    delete: options.delete || options.get || '/api/${resource}/${id}/'
  };

  return {
    all(config = {}) {
      const templateUrl = config.url || defaultOptions.all;
      const url = generateTemplateString(templateUrl)({resource});
      return axios.get(url, config);
    },
    create(json, config = {}) {
      const templateUrl = config.url || defaultOptions.create;
      const url = generateTemplateString(templateUrl)({resource});
      return axios.post(url, json, config);
    },
    get(context, config = {}) {
      const templateUrl = config.url || defaultOptions.get;
      const url = generateTemplateString(templateUrl)(Object.assign({resource}, context));
      return axios.get(url, config);
    },
    update(context, json, config = {}) {
      const templateUrl = config.url || defaultOptions.update;
      const url = generateTemplateString(templateUrl)(Object.assign({resource}, context));
      return axios.put(url, json, config);
    },
    delete(context, config = {}) {
      const templateUrl = config.url || defaultOptions.delete;
      const url = generateTemplateString(templateUrl)(Object.assign({resource}, context));
      return axios.delete(url, config);
    }
  };
};
