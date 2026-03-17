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
    
