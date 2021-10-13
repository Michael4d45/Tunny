import * as Teletype from "../cipher/Teleprinter";
import * as Tunny from "../cipher/Tunny"
import { WheelData } from "../cipher/Tunny/wheel";

function translate(m: string) {
    const k = Tunny.get_key(m.length)
    update_inputs()
    return Teletype.add_message(m, k)
}

function encrypt(message: string) {
    const m = Teletype.translate_from_message(message)
    const e = translate(m)
    const p = Teletype.translate_to_pulses(e)
    return p
}

function decrypt(pulses: string) {
    const e = Teletype.translate_from_pulses(pulses)
    const m = translate(e)
    return Teletype.translate_to_message(m)
}

let wheels = new Map(Tunny.serialize())
const cam_inputs: Map<number, Array<HTMLInputElement>> = new Map()
const position_inputs: Map<number, HTMLInputElement> = new Map()

const manual_settings = document.createElement('div');

wheels.forEach((wheel, key) => {
    const label = document.createElement('div')
    label.innerHTML = key.toString()
    manual_settings.appendChild(label)

    const input = document.createElement('input')
    position_inputs.set(key, input)
    input.value = key.toString()
    input.setAttribute('type', 'number')
    input.setAttribute('min', '0')
    input.setAttribute('max', wheel.cams.length.toString());
    manual_settings.appendChild(input)
    input.addEventListener('change', () => {
        wheel.pos = Number(input.value)
        wheel_change()
        set_settings()
    })

    const inputs: Array<HTMLInputElement> = [];
    for (let j = 0; j < wheel.cams.length; j++) {
        wheel.cams[j] = (Math.round(Math.random()) === 0) ? 1 : 0
        const input = document.createElement('input')
        inputs.push(input)
        input.checked = wheel.cams[j] === 1
        input.setAttribute('type', 'checkbox')
        manual_settings.appendChild(input)
        input.addEventListener('change', () => {
            wheel.cams[j] = input.checked ? 1 : 0
            wheel_change()
            set_settings()
        })
    }
    cam_inputs.set(key, inputs)
    manual_settings.appendChild(document.createElement('hr'))
})

function wheel_data() {
    const s_wheels: Array<[number, WheelData]> = []
    wheels.forEach((wheel, i) => s_wheels.push([i, wheel]))
    return s_wheels
}

function wheel_change() {
    Tunny.deserialize(wheel_data())
}

const settings = document.createElement('textarea')

settings.addEventListener('keyup', settings_change)

function get_settings() {
    return JSON.stringify(wheel_data().map(wheel => [wheel[0], wheel[1].pos, wheel[1].cams]))
}

function set_settings() {
    settings.value = get_settings()
}

function settings_change() {
    try {
        settings.value = settings.value.toLocaleLowerCase()
        const text_settings = JSON.parse(settings.value)
        if (text_settings) {
            try {
                const s = <Array<[number, number, Array<1 | 0>]>>text_settings;
                for (const [i, w_pos, w_cams] of s) {
                    const w = wheels.get(i)
                    if (w !== undefined) {
                        w.cams = w_cams
                        w.pos = w_pos
                    }
                }
            } catch (e) {
                console.error("bad position data")
            }
        }
        wheel_change()
        update_inputs()
    } catch (e) {
        console.log("couldn't parse data")
    }
}

function random() {
    wheels.forEach((wheel, i) => {
        const cams = cam_inputs.get(i)
        if (cams) {
            cams.forEach((input, key) => {
                input.checked = Math.round(Math.random()) === 1
                wheel.cams[key] = input.checked?1:0
            })
        }
    });
    wheel_change();
    set_settings();
}

function update_inputs() {
    wheels = new Map(Tunny.serialize())
    wheels.forEach((wheel, i) => {
        const cams = cam_inputs.get(i)
        if (cams) {
            cams.forEach((input, key) => {
                input.checked = wheel.cams[key] === 1
            })
        }
        const pos = position_inputs.get(i)
        if(pos) pos.value = wheel.pos.toString()
    });
    set_settings();
}

export {
    encrypt,
    decrypt,
    manual_settings,
    settings,
    random,
}