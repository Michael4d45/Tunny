type pulse = "X" | "•";
type conventional_name = "/" | "9" | "H" | "T" | "O" | "M" | "N" | "3" | "R" | "C" | "V" | "G" | "L" | "P" | "I" | "4" | "A" | "U" | "Q" | "W" | "+" | "5" | "-" | "8" | "K" | "J" | "D" | "F" | "X" | "B" | "Z" | "Y" | "S" | "E"
type pulses = `${pulse}${pulse}${pulse}${pulse}${pulse}`

const PULSE_LEN = 5;

const add_pulse_table = {
    "X": {
        "X": "•",
        "•": "X",
    },
    "•": {
        "•": "•",
        "X": "X",
    }
}

function bool_to_pulse(b: boolean) {
    return b ? "X" : "•"
}

function add_pulse(a: pulse, b: pulse) {
    return add_pulse_table[a][b]
}

const conventional_name_to_pulses: Map<conventional_name, pulses> = new Map([
    ["/", "•••••"],
    ["9", "••X••"],
    ["H", "••X•X"],
    ["T", "••••X"],
    ["O", "•••XX"],
    ["M", "••XXX"],
    ["N", "••XX•"],
    ["3", "•••X•"],
    ["R", "•X•X•"],
    ["C", "•XXX•"],
    ["V", "•XXXX"],
    ["G", "•X•XX"],
    ["L", "•X••X"],
    ["P", "•XX•X"],
    ["I", "•XX••"],
    ["4", "•X•••"],
    ["A", "XX•••"],
    ["U", "XXX••"],
    ["Q", "XXX•X"],
    ["W", "XX••X"],
    ["5", "XX•XX"],
    ["+", "XX•XX"],
    ["8", "XXXXX"],
    ["-", "XXXXX"],
    ["K", "XXXX•"],
    ["J", "XX•X•"],
    ["D", "X••X•"],
    ["F", "X•XX•"],
    ["X", "X•XXX"],
    ["B", "X••XX"],
    ["Z", "X•••X"],
    ["Y", "X•X•X"],
    ["S", "X•X••"],
    ["E", "X••••"],
]);

const pulses_to_conventional_name: Map<pulses, conventional_name> = new Map([
    ["•••••", "/"],
    ["••X••", "9"],
    ["••X•X", "H"],
    ["••••X", "T"],
    ["•••XX", "O"],
    ["••XXX", "M"],
    ["••XX•", "N"],
    ["•••X•", "3"],
    ["•X•X•", "R"],
    ["•XXX•", "C"],
    ["•XXXX", "V"],
    ["•X•XX", "G"],
    ["•X••X", "L"],
    ["•XX•X", "P"],
    ["•XX••", "I"],
    ["•X•••", "4"],
    ["XX•••", "A"],
    ["XXX••", "U"],
    ["XXX•X", "Q"],
    ["XX••X", "W"],
    ["XX•XX", "5"],
    ["XXXXX", "8"],
    ["XXXX•", "K"],
    ["XX•X•", "J"],
    ["X••X•", "D"],
    ["X•XX•", "F"],
    ["X•XXX", "X"],
    ["X••XX", "B"],
    ["X•••X", "Z"],
    ["X•X•X", "Y"],
    ["X•X••", "S"],
    ["X••••", "E"],
]);

type letters = `${conventional_name}${conventional_name}`
const added_letters: Map<letters, conventional_name> = new Map();

for (const [a, a_pulses] of conventional_name_to_pulses.entries()) {
    for (const [b, b_pulses] of conventional_name_to_pulses.entries()) {
        if (!a_pulses || !b_pulses) continue;
        let pulses = "";
        for (let k = 0; k < PULSE_LEN; k++) {
            pulses += add_pulse(<pulse>a_pulses[k], <pulse>b_pulses[k]);
        }
        const name = pulses_to_conventional_name.get(<pulses>pulses);
        if (name) added_letters.set(`${a}${b}`, name);
    }
}

function add_letter(a: conventional_name, b: conventional_name) {
    return added_letters.get(`${a}${b}`);
}

function add_message(a: string, b: string) {
    let ret = ""
    a = a.toUpperCase();
    b = b.toUpperCase();
    for (let i = 0; i < a.length && i < b.length; i++) {
        const a_let = a[i];
        const b_let = b[i];
        const letter = add_letter(<conventional_name>a_let, <conventional_name>b_let)
        if (letter) ret += letter;
    }
    return ret;
}
const action = [
    'none',
    'line feed',
    'figure shift',
    'letter shift',
    'bell',
    'who are you?',
    'carriage return',
] as const;
type action = (typeof action)[number];
const isAction = (x: any): x is action => action.includes(x);

const letter_shift: Map<conventional_name, string> = new Map([
    ["/", <action>'none'],
    ["9", " "],
    ["H", "H"],
    ["T", "T"],
    ["O", "O"],
    ["M", "M"],
    ["N", "N"],
    ["3", <action>'carriage return'],
    ["R", "R"],
    ["C", "C"],
    ["V", "V"],
    ["G", "G"],
    ["L", "L"],
    ["P", "P"],
    ["I", "I"],
    ["4", <action>'line feed'],
    ["A", "A"],
    ["U", "U"],
    ["Q", "Q"],
    ["W", "W"],
    ["5", <action>'figure shift'],
    ["+", <action>'figure shift'],
    ["8", <action>'none'],
    ["-", <action>'none'],
    ["K", "K"],
    ["J", "J"],
    ["D", "D"],
    ["F", "F"],
    ["X", "X"],
    ["B", "B"],
    ["Z", "Z"],
    ["Y", "Y"],
    ["S", "S"],
    ["E", "E"],
])

const figure_shift: Map<conventional_name, string> = new Map([
    ["/", <action>'none'],
    ["9", " "],
    ["H", "£"],
    ["T", "5"],
    ["O", "9"],
    ["M", "."],
    ["N", ","],
    ["3", <action>'carriage return'],
    ["R", "4"],
    ["C", ":"],
    ["V", "="],
    ["G", "@"],
    ["L", "]"],
    ["P", "0"],
    ["I", "8"],
    ["4", <action>'line feed'],
    ["A", "-"],
    ["U", "7"],
    ["Q", "1"],
    ["W", "2"],
    ["5", <action>'none'],
    ["+", <action>'none'],
    ["8", <action>'letter shift'],
    ["-", <action>'letter shift'],
    ["K", "["],
    ["J", <action>'bell'],
    ["D", <action>'who are you?'],
    ["F", "%"],
    ["X", "/"],
    ["B", "?"],
    ["Z", "+"],
    ["Y", "6"],
    ["S", "'"],
    ["E", "3"],
])

const either_name: Map<string, conventional_name> = new Map([
    [<action>'none', "/"],
    [<action>'\r', "3"],
    [<action>'\n', "4"],
    [" ", "9"],
])

const letter_name: Map<string, conventional_name> = new Map([
    ["H", "H"],
    ["T", "T"],
    ["O", "O"],
    ["M", "M"],
    ["N", "N"],
    ["R", "R"],
    ["C", "C"],
    ["V", "V"],
    ["G", "G"],
    ["L", "L"],
    ["P", "P"],
    ["I", "I"],
    ["A", "A"],
    ["U", "U"],
    ["Q", "Q"],
    ["W", "W"],
    ["K", "K"],
    ["J", "J"],
    ["D", "D"],
    ["F", "F"],
    ["X", "X"],
    ["B", "B"],
    ["Z", "Z"],
    ["Y", "Y"],
    ["S", "S"],
    ["E", "E"],
])

const figure_name: Map<string, conventional_name> = new Map([
    ["£", "H"],
    ["5", "T"],
    ["9", "O"],
    [".", "M"],
    [",", "N"],
    ["4", "R"],
    [":", "C"],
    ["=", "V"],
    ["@", "G"],
    ["]", "L"],
    ["0", "P"],
    ["8", "I"],
    ["-", "A"],
    ["7", "U"],
    ["1", "Q"],
    ["2", "W"],
    ["[", "K"],
    [<action>'bell', "J"],
    [<action>'who are you?', "D"],
    ["%", "F"],
    ["/", "X"],
    ["?", "B"],
    ["+", "Z"],
    ["6", "Y"],
    ["'", "S"],
    ["3", "E"],
])

const shift_name: Map<string, conventional_name> = new Map([
    [<action>'figure shift', "5"],
    //[<action>'figure shift', "+"],
    [<action>'letter shift', "8"],
    //[<action>'letter shift', "-"],
])

function translate_to_letter(a: conventional_name, is_figure: boolean) {
    return is_figure ? figure_shift.get(a) : letter_shift.get(a)
}

function translate_from_letter(a: string) {
    let is_letter = letter_name.has(a)
    let is_figure = figure_name.has(a)
    let ret: string | undefined = ""
    if (is_letter) ret = letter_name.get(a)
    if (is_figure) ret = figure_name.get(a)
    if (either_name.has(a)) ret = either_name.get(a)
    return [ret, is_letter, is_figure]
}

function translate_to_message(a: string, newline = '\n') {
    let ret = ""
    let is_figure = false;
    a = a.toUpperCase();
    for (let i = 0; i < a.length; i++) {
        const a_let = a[i];
        let letter = translate_to_letter(<conventional_name>a_let, is_figure);
        if (letter === null || letter === undefined) continue
        if (isAction(letter)) {
            let ret_letter = "";
            switch (letter) {
                case "carriage return":
                    ret_letter = newline
                    break;
                case "bell":
                    break;
                case "figure shift":
                    is_figure = true;
                    break;
                case "letter shift":
                    is_figure = false;
                    break;
                case "line feed":
                    ret_letter = newline
                    break;
                case "none":
                    break;
                case "who are you?":
                    break;
            }
            letter = ret_letter
        }
        ret += letter;
    }
    return ret;
}

function translate_from_message(a: string) {
    let ret = ""
    let currently_is_figure = false;
    a = a.toUpperCase();
    for (let i = 0; i < a.length; i++) {
        const a_let = a[i];
        let [
            letter,
            is_letter,
            is_figure,
        ] = translate_from_letter(a_let);
        if (currently_is_figure && is_letter) ret += shift_name.get(<action>'letter shift')
        if (!currently_is_figure && is_figure) ret += shift_name.get(<action>'figure shift')

        ret += letter;

        if (is_figure) currently_is_figure = true;
        if (is_letter) currently_is_figure = false;
    }
    return ret;
}

function translate_to_pulses(s: string, newline = '\n') {
    let ret = ""
    s = s.toUpperCase();
    for (let i = 0; i < s.length; i++) {
        const pulses = conventional_name_to_pulses.get(<conventional_name>s[i])
        if (pulses !== undefined) ret += pulses + newline;
    }
    return ret
}

function translate_from_pulses(s: string) {
    let ret = ""
    for (let i = 0; i < s.length;) {
        let pulses = ""
        for (; i < s.length && pulses.length < PULSE_LEN; i++) {
            if (s[i] !== 'X' && s[i] !== "•") continue;
            pulses += s[i]
        }
        const name = pulses_to_conventional_name.get(<pulses>pulses)
        if (name !== undefined) ret += name
    }
    return ret
}

export {
    add_letter,
    add_message,
    translate_to_message,
    translate_from_message,
    translate_to_pulses,
    translate_from_pulses,
    pulses_to_conventional_name,
    bool_to_pulse,
    pulses,
}