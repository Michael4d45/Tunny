import * as Messages from "./messages"
import { Socket } from "socket.io"

const socket = <Socket>((window as any).socket);

const message_box = <HTMLTextAreaElement>document.getElementById('message_box')
const messages = <HTMLDivElement>document.getElementById('messages')
const translations = <HTMLDivElement>document.getElementById('translations')
const send = <HTMLButtonElement>document.getElementById('send')
const settings = <HTMLTextAreaElement>document.getElementById('settings')
const random = <HTMLButtonElement>document.getElementById('random')
const hide = <HTMLButtonElement>document.getElementById('hide')
const connect_button = <HTMLButtonElement>document.getElementById('connect')
const connect_room = <HTMLInputElement>document.getElementById('room')

settings.appendChild(Messages.settings)
//settings.appendChild(Messages.manual_settings)

random.addEventListener('click', Messages.random)
const display = settings.style.display;
hide.addEventListener('click', () => {
    settings.style.display = settings.style.display === "none" ? display : "none"
})

connect_button.addEventListener('click', () => {
    const room = connect_room.value;
    if(room === "") return;
    socket.emit('identify', room);
})

send.addEventListener('click', () => {
    const m = message_box.value
    message_box.value = ""

    if(m === "") return
    create_message(m)
    message_box.focus()
})

socket.on('message', receive_message)

function create_message(m: string) {
    const e = Messages.encrypt(m)
    socket.emit('message', e)
    new_message(e, m)
}

function receive_message(e: string) {
    const m = Messages.decrypt(e)
    new_message(e, m)
}

function div(s: string) {
    const el = document.createElement('div')
    el.innerHTML = s;
    return el;
}

function hr() {
    return document.createElement('hr');
}

function new_message(message: string, translation: string) {
    messages.appendChild(div(message))
    messages.appendChild(hr())
    translations.appendChild(div(translation))
    translations.appendChild(hr())
}