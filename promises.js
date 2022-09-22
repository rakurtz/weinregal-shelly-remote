const getter = new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => resolve(json))
        
})


getter.then(json => console.log(json))

