const apiUrl = 'http://todolistdataapi20170504011022.azurewebsites.net/api/ToDoList'


export const post = json => fetch(apiUrl, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    Owner: 'mczolko',
    ...json
  })
}).then(
  response => response.json()
)


export const get = () => fetch(apiUrl + '?owner=mczolko').then(response => response.json())

export const put = (id, value) => fetch(apiUrl + '/' + id, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'PUT',
  body: JSON.stringify({
    Owner: 'mczolko',
    Description: value
  })
})

export const remove = id => fetch(apiUrl + '/' + id + '?owner=mczolko', { method: 'DELETE' })
