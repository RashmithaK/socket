const socket = io()

//get all of our elements
const chat = document.querySelector('#chat')
const form = document.querySelector('form')
const name = form.name
const message = form.message
const send = form.send

form.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('sendMessage', {
        name: name.value,
        message: message.value
    })

    message.value = ''
    message.focus()
})

//Just creating a new element for our message and appending it to the chat and re-enabling the send button.
socket.on('showMessage', message => {
    const newMessage = document.createElement('div')
    const user = document.createElement('h3')
    const text = document.createElement('p')

    user.innerHTML = message.name
    text.innerHTML = message.message

    newMessage.appendChild(user)
    newMessage.appendChild(text)
    chat.appendChild(newMessage)
})