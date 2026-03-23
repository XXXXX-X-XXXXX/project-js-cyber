function ceaserEncrypt(message, shift) {
    let result = ""
    for (let i = 0 ; i < message.length; i++) {
        let c = message[i]

        if (c >= 'a' && c <= 'z') {
        let code = c.charCodeAt(0)
        let base = 'a'.charCodeAt(0)
        let pos = code - base
        let newPos = (pos + shift) % 26
        let newCode = base + newPos
        c = String.fromCharCode(newCode)
        }

        else if (c >= 'A' && c <= 'Z') {
            let code2 = c.charCodeAt(0)
            let base2 = 'A'.charCodeAt(0)
            let pos2 = code2 - base2
            let newPos2 = (pos2 + shift) % 26
            let newCode2 = base2 + newPos2
            c = String.fromCharCode(newCode2)  
        }
        result = result + c
    }
    return result
}

function ceaserDecrypt(message, shift) {
    let result = ""
    for (let i = 0 ; i < message.length; i++) {
        let c = message[i]

        if (c >= 'a' && c <= 'z') {
        let code = c.charCodeAt(0)
        let base = 'a'.charCodeAt(0)
        let pos = code - base
        let newPos = (pos - shift + 26) % 26
        let newCode = base + newPos
        c = String.fromCharCode(newCode)
        }

        else if (c >= 'A' && c <= 'Z') {
            let code2 = c.charCodeAt(0)
            let base2 = 'A'.charCodeAt(0)
            let pos2 = code2 - base2
            let newPos2 = (pos2 - shift + 26) % 26
            let newCode2 = base2 + newPos2
            c = String.fromCharCode(newCode2)  
        }
        result = result + c
    }
    return result
}

function ceaserBruteforce(messageChiffre) {
    for (let s = 1; s <= 25; s++) {
        let texte = ceaserDecrypt(messageChiffre, s)
        console.log("Shift " + s + " : " + texte)
    }
}
    
function vigenereEncrypt(message, key) {
    let result = ""
    key = key.toUpperCase()
    let keyIndex = 0

    for (let i = 0; i < message.length; i++) {
        let c = message[i]

        if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
            let keyChar = key[keyIndex % key.length]
            let shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0)

            if (c >= 'a' && c <= 'z') {
                let base = 'a'.charCodeAt(0)
                let pos = c.charCodeAt(0) - base
                let newPos = (pos + shift) % 26
                c = String.fromCharCode(base + newPos)

            } else {
                let base = 'A'.charCodeAt(0)
                let pos = c.charCodeAt(0) - base
                let newPos = (pos + shift) % 26
                c = String.fromCharCode(base + newPos)
            }

            keyIndex++ 
        }

        result = result + c
    }

    return result
}

function vigenereDecrypt(message, key) {
    let result = ""
    key = key.toUpperCase()
    let keyIndex = 0

    for (let i = 0; i < message.length; i++) {
        let c = message[i]

        if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
            let keyChar = key[keyIndex % key.length]
            let shift = keyChar.charCodeAt(0) - 'A'.charCodeAt(0)

            if (c >= 'a' && c <= 'z') {
                let base = 'a'.charCodeAt(0)
                let pos = c.charCodeAt(0) - base
                let newPos = (pos - shift + 26) % 26
                c = String.fromCharCode(base + newPos)

            } else {
                let base = 'A'.charCodeAt(0)
                let pos = c.charCodeAt(0) - base
                let newPos = (pos - shift + 26) % 26
                c = String.fromCharCode(base + newPos)
            }

            keyIndex++ 
        }

        result = result + c
    }

    return result
}
