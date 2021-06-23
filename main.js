class PasswordGenerator {
    constructor() {
        this.sprites = { 0: "-", 1: "A", 2: "W", 3: "H" };
        this.areas = [0x00, 0x08, 0x0C, 0x12, 0x18, 0x1A, 0x23, 0x2A, 0x2E, 0x2E, 0x37, 0x3C, 0x3F,
            0x40, 0x41, 0x42];
        this.cntTable = [0x02, 0x03, 0x01, 0x00, 0x03, 0x02, 0x02, 0x01,
            0x03, 0x01, 0x00, 0x00, 0x01, 0x02, 0x03, 0x00,
            0x01, 0x01, 0x02, 0x00, 0x03, 0x03, 0x00, 0x02,
            0x00, 0x01, 0x02, 0x02, 0x00, 0x03, 0x01, 0x03];
    }

    generatePassword(name) {
        // Clear output
        $("#output_div").empty();
        
        var passwords = []
        for (let i = 0; i < this.areas.length; i++){
            passwords[i] = this.encode(name, this.areas[i])
        }
        console.log(passwords)
        var i = 0;
        for (const p of passwords){
            $("#output_div").append("<pre>Level " + i + "\n" + p + "</pre>");
            i++;
        }


    }

    encode(name, area) {
        name = name.padEnd(8, " ") // Fill empty characters with blanks
        // Convert name string to its ascii code counterpart
        var ascii_name = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < 8; i++) {
            var c = name.charCodeAt(i)
            if (c == " ")
                ascii_name[i] = 0;
            else if (c >= 49 && c <= 57)
                ascii_name[i] = c - 47;
            else if (c >= 65 && c <= 90)
                ascii_name[i] = c - 54;
            else if (c >= 97 && c <= 122)
                ascii_name[i] = c - 86;
        }
        console.log("ASCII", ascii_name)


        var checksum = this.generateChecksum(area, ascii_name)
        console.log("Checksum: " + checksum)

        var password = []
        for (let j = 0, p = 0; j < 0x20; j += 2, p++) {
            let k = this.cntTable[j];
            let l = checksum[k];
            k = this.cntTable[j + 1];
            l >>= (k * 2);
            password[p] = l & 3
        }
        console.log(password)

        return this.printMatrix(password)
        /* for (let i= 0; i <= 0x43; i++){
            
        } */
    }

    printMatrix(password) {
        var formatted_string = ""
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                formatted_string += this.sprites[password[i * 4 + j]] + " ";
            }
            formatted_string += "\n"
        }
        return formatted_string
    }

    generateChecksum(level, difficulty, name) {
        // 0 for NG, 1 for NG+
        var checksum = [0, 0, 0, 0];
        checksum[0] = level & 0xff;
        checksum[1] = difficulty;
        var i = level;
        var c = level + difficulty;
        for (i = 7; i >= 0; i--) {
            c += (name[i] ^ 0xff)
        }
        checksum[2] = c & 0xff;
        checksum[3] = (c & 0xff00) >> 8
        return checksum
    }
}

pw = new PasswordGenerator()
