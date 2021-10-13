export interface WheelData {
    pos: number,
    cams: Array<1 | 0>
}

export default class Wheel {
    cams: Array<boolean>
    pos = 0

    constructor(n: number, pos: number = 0) {
        this.cams = new Array(n).fill(false)
        this.pos = pos
    }

    turn() {
        this.pos = (this.pos + 1) % this.cams.length
    }

    is_raised() {
        return this.cams[this.pos]
    }

    serialize(): WheelData {
        return {
            pos: this.pos,
            cams: this.cams.map(cam => cam?1:0)
        }
    }

    deserialize(data: WheelData) {
        this.pos = data.pos
        this.cams = data.cams.map(cam => cam === 1)
    }
}