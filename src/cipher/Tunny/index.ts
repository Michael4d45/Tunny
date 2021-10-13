import Wheel, { WheelData } from "./wheel";
import * as Teletype from "../Teleprinter";

const chi_wheels: Array<Wheel> = [
    new Wheel(43),
    new Wheel(47),
    new Wheel(51),
    new Wheel(53),
    new Wheel(59),
]

const mu37 = new Wheel(37)
const mu61 = new Wheel(61)

const psi_wheels: Array<Wheel> = [
    new Wheel(41),
    new Wheel(31),
    new Wheel(29),
    new Wheel(26),
    new Wheel(23),
]

const wheels: Map<number, Wheel> = new Map([
    [1, psi_wheels[0]],
    [2, psi_wheels[1]],
    [3, psi_wheels[2]],
    [4, psi_wheels[3]],
    [5, psi_wheels[4]],
    [6, mu37],
    [7, mu61],
    [8, chi_wheels[0]],
    [9, chi_wheels[1]],
    [10, chi_wheels[2]],
    [11, chi_wheels[3]],
    [12, chi_wheels[4]],
])

function get_pulse(n: number) {
    return Teletype.bool_to_pulse(chi_wheels[n].is_raised() !== psi_wheels[n].is_raised())
}

function get_character() {
    const p1 = get_pulse(0)
    const p2 = get_pulse(1)
    const p3 = get_pulse(2)
    const p4 = get_pulse(3)
    const p5 = get_pulse(4)
    const pulses = `${p1}${p2}${p3}${p4}${p5}`
    return Teletype.pulses_to_conventional_name.get(<Teletype.pulses>pulses)
}

function turn() {
    chi_wheels.forEach(wheel => wheel.turn())
    if (mu37.is_raised()) psi_wheels.forEach(wheel => wheel.turn())
    if (mu61.is_raised()) mu37.turn()
    mu61.turn()
}

function get_key(len: number) {
    let ret = ""
    for (let i = 0; i < len; i++) {
        ret += get_character()
        turn()
    }
    return ret
}

function serialize() {
    const s_wheels: Array<[number, WheelData]> = []
    wheels.forEach((wheel, i) => s_wheels.push([i, wheel.serialize()]))
    return s_wheels
}

function deserialize(s_wheels: Array<[number, WheelData]>) {
    s_wheels.forEach(data => {wheels.get(data[0])?.deserialize(data[1])})
}

export {
    get_key,
    serialize,
    deserialize,
}