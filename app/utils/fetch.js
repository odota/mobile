import _ from 'lodash';

export function fetchAPI(endpoint, method = 'get', data) {
    let url = 'https://api.opendota.com/api/' + endpoint;
    let options = {
        method: method,
        body: data
    };

    if (method === 'DELETE') {
        return fetch(url, options);
    } else {
        return fetch(url, options)
            .then(response => {
                return response.json()
                    .then((json) => {
                        if (response.status === 200 || response.status === 201) {
                            return json;
                        } else if (response.state === 408) {
                            throw('Request Timeout');
                        } else {
                            if (json.errors) {
                                throw(json.errors);
                            } else {
                                throw('unknown error');
                            }
                        }
                    })
            })
            .catch(error => {
                if (typeof error.message !== 'undefined') {
                    throw(error.message);
                } else if (typeof error === 'string') {
                    throw(error);
                } else if (Object.keys(error)) {
                    let errStr = '';
                    let errors = _.omit(error, ['column', 'line', 'sourceURL'])

                    _.forEach(errors, function (value, key) {
                        errStr += value + '.\n';
                    });

                    throw (errStr);
                } else {
                    console.log(error);
                    throw('unknown error');
                }
            });
    }
}

module.exports = { fetchAPI };
