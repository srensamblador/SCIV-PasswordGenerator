
function onClickEvent(input) {
    pw = new SCIVGenerator();

    // Clear previous output
    $("#output_area").empty();

    passwords = pw.generatePasswords(input);
    console.log(passwords)

    difficulties = ["First Quest", "Second Quest"]
    for (let i = 0; i < difficulties.length; i++) {
        $("#output_area").append("<h2>"+difficulties[i]+"</h2>");
        for (let j = 0; j < passwords[i].length; j++) {
            formatted_p = textMatrix(passwords[i][j])
            $("#output_area").append("<pre>Level " + j + "\n" + formatted_p + "</pre>");
        }

    }
}

    function textMatrix(password) {
        var formatted_string = ""
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                formatted_string += password[i * 4 + j] + " ";
            }
            formatted_string += "\n"
        }

        return formatted_string
    }