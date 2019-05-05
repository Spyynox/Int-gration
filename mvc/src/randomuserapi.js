export default {
    getUser() {
        return new Promise((resolve) => {

            fetch('https://randomuser.me/api/').then((data) => {

                data.json().then((json)=> {
                    resolve(json)
                } )

            })

        })
        
    } 
}