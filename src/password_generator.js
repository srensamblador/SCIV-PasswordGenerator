class SCIVGenerator {
    constructor() {
        this.symbols = { 0: "-", 1: "A", 2: "W", 3: "H" };
        this.areas = [0x00, 0x08, 0x0C, 0x12, 0x18, 0x1A, 0x23, 0x2A, 0x2E, 0x37, 0x3C, 0x3F,
            0x40, 0x41, 0x42];
        this.nibbleTable = [0x02, 0x03, 0x01, 0x00, 0x03, 0x02, 0x02, 0x01,
            0x03, 0x01, 0x00, 0x00, 0x01, 0x02, 0x03, 0x00,
            0x01, 0x01, 0x02, 0x00, 0x03, 0x03, 0x00, 0x02,
            0x00, 0x01, 0x02, 0x02, 0x00, 0x03, 0x01, 0x03];
    }

    generatePasswords(name) {
        /*
            Generates the passwords (both from the First and Second Quest) for the given name
        */
        var passwords = []
        for (let difficulty = 0; difficulty < 2; difficulty++) {
            passwords[difficulty] = [] 
            for (let i = 0; i < this.areas.length; i++) {
                passwords[difficulty][i] = this.encode(name, difficulty, this.areas[i])
            }
        }
        return passwords
    }

    encode(name, difficulty, area) {
        /*
            Generates a single password for the given parameters
            The resulting password is an array of 16 elements, each of them being a symbol of the grid, starting left to right, top to bottom.
        */
        name = name.toLowerCase()
        name = name.padEnd(8, " ") // Fill empty characters with blanks
        // Convert name string to its ascii code counterpart
        var ascii_name = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < 8; i++) {
            var c = name.charCodeAt(i)
            if (c == " ")
                ascii_name[i] = 0;
            // Transform ASCII codes into their ingame counterparts
            else if (c >= 49 && c <= 57) // Numbers
                ascii_name[i] = c - 47;
            else if (c >= 97 && c <= 122) // Alphabetic
                ascii_name[i] = c - 86;
        }

        // Calculate the checksum matching the name, area, difficulty combination
        var chksum = this.checksum(area, difficulty, ascii_name)

        // Extract the values of the symbols grid from the checksum
        var password = []
        for (let j = 0, p = 0; j < 0x20; j += 2, p++) {
            let k = this.nibbleTable[j];
            let l = chksum[k];
            k = this.nibbleTable[j + 1];
            l >>= (k * 2);
            password[p] = this.symbols[l & 3]
        }
        return password
    }

    checksum(level, difficulty, name) {
        /*
            Calculates the checksum from the given parameters.
            The level (checkpoint) comes from an area code, the difficulty as a binary flag (0 for normal, 1 for second quest) and the name
            transformed into its ingame representation.
            Adress $03/84de contains the checksum builder
        */
        var chksum = [0, 0, 0, 0];
        chksum[0] = level & 0xff;
        chksum[1] = difficulty;
        var i = level;
        var c = level + difficulty;
        for (i = 7; i >= 0; i--) {
            c += (name[i] ^ 0xff)
        }
        chksum[2] = c & 0xff;
        chksum[3] = (c & 0xff00) >> 8
        return chksum
    }
}
