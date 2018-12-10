var rowCount = 0;

function setUpPage(){
    addRow();
    document.body.style.backgroundColor = "mediumslateblue";
}


function addRow(){
    var table = document.getElementById("primary");
    var tr1 = document.createElement("tr");
    var tr2 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    input1.type = "text";
    input1.value = "100,90,80";
    input2.type = "text";
    input2.value = "20";

    var category = document.getElementById("inputName").value;

    input1.setAttribute("id", "points" + rowCount);
    input2.setAttribute("id", "weight" + rowCount);

    if(category.length === 0){
        category = "Homework";
    }
    td1.innerHTML = category + " Points";
    td2.innerHTML = category + " Weight";

    td3.appendChild(input1);
    td4.appendChild(input2);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr2.appendChild(td3);
    tr2.appendChild(td4);
    table.appendChild(tr1);
    table.appendChild(tr2);

    if(rowCount % 3 === 0){
        tr1.setAttribute("class", "yellow");
    }

    if((rowCount + 1) % 3 === 0){
        tr1.setAttribute("class", "pink");
    }
    if((rowCount + 2) % 3 === 0){
        tr1.setAttribute("class", "green");
    }
    rowCount += 1;

    if(rowCount === 6){
        alert("Maximum weights reached");
        var button = document.getElementById("myButton");
        button.parentNode.removeChild(button);
        return false;
    }
}


function convertArrayStringToNumber(str){
    var isValid;
    var array = str.split(",");
    for(var i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);

        isValid = validateGrade(array[i]);
        if(!isValid) {
            console.log("NO");
            return false;
        }
    }
    return array;
}


function averageArray(arr){
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
         sum = sum + arr[i];
    }
    sum = sum / arr.length;
    return sum;
}


function validateGrade(grade){
    if(grade > 200){
        return confirm("You entered a grade above 200%. Please verify that this is correct.");
    }
    return true;
}


function calculateCurrentGrade(){
    var points = [];
    var weight = [];
    var total = 0;

    for(var i = 0; i< rowCount; i++){
        points.push(document.getElementById("points" + i).value);
        weight.push(document.getElementById("weight" + i).value);
        weight[i] = weight[i] * .01;
        points[i] = convertArrayStringToNumber(points[i]);

        if(points[i] === false) {
            return false;
        }

        points[i] = averageArray(points[i]);

        total += points[i] * weight[i];
    }

    document.getElementById("currentGrade").innerHTML = total;
    document.getElementById("percent").innerHTML = "%";

    return total;
}


function calculateGradeNeeded(){
    var currentGrade = calculateCurrentGrade();

    var gradeWanted = parseInt(document.getElementById("gradeWanted").value);
    var finalWeight = parseInt(document.getElementById("finalWeight").value);
    var initialWeight = 1 - (finalWeight/100);
    var initialGrade = currentGrade * initialWeight;
    var gradeNeeded = (gradeWanted - initialGrade)/(finalWeight / 100);
    document.getElementById("gradeNeeded").innerHTML = gradeNeeded.toString().slice(0,5) + "%";
    if(gradeNeeded > 100){
        alert("Good luck!");
    }
}

