import omit from 'lodash/omit'
import forEach from 'lodash/forEach'

export function fetchAPI (endpoint, method = 'get', data) {
    const url = 'https://api.opendota.com/api/' + endpoint
    const options = {
        method: method,
        body: data
    }

    if (method === 'DELETE') {
        return fetch(url, options)
    }

    return fetch(url, options)
        .then(response => {
            return response.json()
                .then((json) => {
                    if (response.status === 200 || response.status === 201) {
                        return json
                    } else if (response.state === 408) {
                        throw (new Error('Request Timeout'))
                    } else {
                        if (json.errors) {
                            throw (json.errors)
                        } else {
                            throw (new Error('unknown error'))
                        }
                    }
                })
        })
        .catch(error => {
            if (typeof error.message !== 'undefined') {
                throw (error.message)
            } else if (typeof error === 'string') {
                throw (error)
            } else if (Object.keys(error)) {
                let errStr = ''
                let errors = omit(error, ['column', 'line', 'sourceURL'])

                forEach(errors, function (value, key) {
                    errStr += value + '.\n'
                })

                throw (errStr)
            } else {
                console.log(error)
                throw (new Error('unknown error'))
            }
        })
}

module.exports = { fetchAPI }
