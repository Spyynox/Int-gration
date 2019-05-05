import swal from 'sweetalert';
import Mustache from 'mustache';
import Navigo from 'navigo';

import api from './randomuserapi';

var app = document.querySelector('#app')

var router = new Navigo(null, false, '#');


function render(view, params) {

    fetch(`../src/views/${view}`).then((data) => {
        data.text().then((data) => {
            app.innerHTML = Mustache.render(data, params)
        })
    })

}

router
  .on({
    'login': function () {
        render('login.html')


        setTimeout(() => {

        
            var submit = document.querySelector('#sumbit')

        
            submit.addEventListener("click", function() {
                
                const mail = document.querySelector('#email').value
                const password = document.querySelector('#password').value
              
            
                fetch('http://edu2.shareyourtime.fr/apijsv2/auth', {
                    method: 'POST',
                    headers : new Headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imxhc3RuYW1lIjoiTUJJWUEgS0lBS1UiLCJmaXJzdG5hbWUiOiJNYXhpbWUiLCJwYXNzd29yZCI6IjgyYzI2ZjMxYzliMTBjNDgwYzkxODcwOGI4MDA3MDZjMTAwNGVkNTUiLCJjYXQiOiIyMDIxLURFViIsImVtYWlsIjoibWF4aW1lLm1iaXlhLWtpYWt1QHN1cGludGVybmV0LmZyIiwiY29kZSI6Im5vY29kZSEhISJ9LCJpYXQiOjE1NTQxOTYwMzh9.drRr-VonZDljpud3FI6CB1dmN9VP1Jh4nzYPVSnHTa8"
                    }),
                    
                    body : "email=" + mail + "&password=" + password 
                }).then((res) => {
                    console.log(res)
                    res.json().then((json) => {
                        router.navigate('/chatroom')
                    })

                })
            })
        }, 1000)

    },

    'chatroom': function () {
        render('chatroom.html')
        setInterval(function() {
            
        
            fetch('http://edu2.shareyourtime.fr/apijsv2/messages', {
                method: 'GET',
                headers : new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imxhc3RuYW1lIjoiTUJJWUEgS0lBS1UiLCJmaXJzdG5hbWUiOiJNYXhpbWUiLCJwYXNzd29yZCI6IjgyYzI2ZjMxYzliMTBjNDgwYzkxODcwOGI4MDA3MDZjMTAwNGVkNTUiLCJjYXQiOiIyMDIxLURFViIsImVtYWlsIjoibWF4aW1lLm1iaXlhLWtpYWt1QHN1cGludGVybmV0LmZyIiwiY29kZSI6Im5vY29kZSEhISJ9LCJpYXQiOjE1NTQxOTYwMzh9.drRr-VonZDljpud3FI6CB1dmN9VP1Jh4nzYPVSnHTa8"
                })
            }).then((res) => {

                res.json().then((json) => {
                    var ul = document.querySelector("#ul")
                    var display_message = ''

                    for (let i = 0; i < json.data.length; i++) {
                        const messages = json.data[i],
                        noms = json.data[i]
                        display_message += '<li>' + noms.nickname + ": " + "<br>" + messages.message + "<br>" + "<br>" +
                        '</li>'
                    }
                    ul.innerHTML = display_message

                })

            })           
        },1000)

        setTimeout(() => {
            var button = document.querySelector('#button')
            button.addEventListener("click", function() {
                var user = document.querySelector('#user').value
                var your_message = document.querySelector ('#your_message').value

                fetch('http://edu2.shareyourtime.fr/apijsv2/messages', {
                    method: 'POST',
                    headers : new Headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imxhc3RuYW1lIjoiTUJJWUEgS0lBS1UiLCJmaXJzdG5hbWUiOiJNYXhpbWUiLCJwYXNzd29yZCI6IjgyYzI2ZjMxYzliMTBjNDgwYzkxODcwOGI4MDA3MDZjMTAwNGVkNTUiLCJjYXQiOiIyMDIxLURFViIsImVtYWlsIjoibWF4aW1lLm1iaXlhLWtpYWt1QHN1cGludGVybmV0LmZyIiwiY29kZSI6Im5vY29kZSEhISJ9LCJpYXQiOjE1NTQxOTYwMzh9.drRr-VonZDljpud3FI6CB1dmN9VP1Jh4nzYPVSnHTa8"
                    }),
                    
                    
                    body : "&message=" + your_message 
                })
            })
        }, 500)
        
    },
    '*': function () {
        render('home.html', {
            firstname: 'Etudiant de Sup\'Internet'
        })
        
    }
  })
  .resolve();