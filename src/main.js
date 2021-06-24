
function onClickEvent(input) {
    pw = new SCIVGenerator();

    // Clear previous output
    $("#output_area").empty();

    passwords = pw.generatePasswords(input);
    console.log(passwords);

    difficulties = ["First Quest", "Second Quest"];
    stages = ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5",
            "Stage 6", "Stage 7", "Stage 8", "Stage 9", "Stage A",
            "Stage B", "Slogra", "Gaibon", "Death", "Dracula"]
    for (let i = 0; i < difficulties.length; i++) {
        $("#output_area").append("<h2>" + difficulties[i] + "</h2>");
        $("#output_area").append("<div class='quest_area' id='quest_" + i+1 +"'></div>")
        for (let j = 0; j < passwords[i].length; j++) {
            password_table = passwordTable(passwords[i][j]);
            password_container = "<div class='password_container'><h3>" + stages[j] +"</h3>"
            $("#quest_" + i+1).append(password_container + password_table + "</div>");
        }

    }
}

function textMatrix(password) {
    var formatted_string = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            formatted_string += password[i * 4 + j] + " ";
        }
        formatted_string += "\n";
    }

    return formatted_string
}

function passwordTable(password){
    var table = "<table class='password'>";
    for (let i = 0; i <4; i++){
        table += "<tr>";
        for (let j = 0; j < 4; j++){
            table += "<td>"
            switch (password[i * 4 + j]){
                case "A":
                    table += "<img src='img/axe.png' alt='Axe'/>";
                    break;
                case "W":
                    table += "<img src='img/holy_water.png' alt='Holy Water'/>";
                    break;
                case "H":
                    table += "<img src='img/heart.png' alt='Heart'/>";
                    break;
            }
            table +="</td>"
        }
        table +="</tr>";        
    }
    table += "</table>";
    return table;
}