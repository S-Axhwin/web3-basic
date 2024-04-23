const fetchApi = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments", {type: "POST"}).then((data) => {

        console.log(data);
    })
}

fetchApi();