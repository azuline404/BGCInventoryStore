var genderList = [];
var objectMap = {};
var sizeObjecct = [];
var jsonData;
var currentSelectedGender;
var currentSelectedColor;
var currentSelectedSize;

$(document).ready(function() {
    console.log( "document is ready!" );
    const path = window.location.href;
    const product_id = path.substring(path.lastIndexOf('/') + 1)
    var data = {
        id: product_id
    };
    console.log(data.id);
    $.ajax({
        url: '/getProductPageDetails',
        type: 'POST',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(response) {
            jsonData = response;
            generateGenders(jsonData);
            generateGenderButtons(genderList);
        }
      });
});

function generateGenders (data) {
    for (var i = 0; i < data.length; i++) {
        var itemGender = data[i].gender;
        if (genderList.indexOf(itemGender) == -1) {
            genderList.push(itemGender)
        }    
    }
    console.log(genderList);
}

function generateGenderButtons(genderList) {
    var gendersDiv = document.getElementById("gendersDiv");
    for (var i = 0; i < genderList.length; i++) {
        var button = document.createElement("button");
        button.textContent = genderList[i];
        button.setAttribute('class','gender-button')
        gendersDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedGender = this.textContent;
            currentSelectedColor = null;
            currentSelectedSize = null;
            eraseColorSizeButtons();
            generateColorButtons(this.textContent);
            var genderButtons = gendersDiv.querySelectorAll(".gender-button");
            genderButtons.forEach(function(genderButton) {
                genderButton.style.border = "#e7e7e7";
                genderButton.style.background = "white";
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}

function eraseColorSizeButtons() {
    var sizesDiv = document.getElementById("sizesDiv");
    // add new sizes based on new gender/color option
    while (sizesDiv.hasChildNodes()) {
        sizesDiv.removeChild(sizesDiv.lastChild);
    }
    var colorsDiv = document.getElementById("colorsDiv");
    // add new sizes based on new gender/color option
    while (colorsDiv.hasChildNodes()) {
        colorsDiv.removeChild(colorsDiv.lastChild);
    }
}

function getAllColors(gender) {
    var colorList = [];
    for (var j = 0; j < jsonData.length;j++) {
        if (jsonData[j].gender == gender) {
            if (colorList.indexOf(jsonData[j].color) == -1) {
                colorList.push(jsonData[j].color);
            }
        }
    }
    return colorList;
}

function generateColorButtons(gender) {
    console.log("hit generateColorButtons!");
    var colors = getAllColors(gender);
    var colorsDiv = document.getElementById("colorsDiv");

    // remove all previous colors based on prev gender option
    while (colorsDiv.hasChildNodes()) {
        colorsDiv.removeChild(colorsDiv.lastChild);
    }
    // add new colors based on new gender option
    for (var i = 0; i < colors.length; i++) {
        var button = document.createElement("button");
        button.setAttribute('class','color-button')
        button.textContent = colors[i];
        colorsDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedColor = this.textContent;
            currentSelectedSize = null;
            generateSizeButtons(currentSelectedGender, currentSelectedColor);
            var colorButtons = colorsDiv.querySelectorAll(".color-button");
            colorButtons.forEach(function(colorButton) {
                colorButton.style.border = "#e7e7e7";
                colorButton.style.background = "white";
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}

function getAllSizes(gender,color) {
    var sizeList = [];
    for (var j = 0; j < jsonData.length;j++) {
        if (jsonData[j].gender == gender && jsonData[j].color == color) {
            if (sizeList.indexOf(jsonData[j].size) == -1) {
                sizeList.push(jsonData[j].size);
            }
        }
    }
    return sizeList;
}

function generateSizeButtons(gender,color) {
    var sizes = getAllSizes(gender,color);
    var sizesDiv = document.getElementById("sizesDiv");
    // add new sizes based on new gender/color option
    while (sizesDiv.hasChildNodes()) {
        sizesDiv.removeChild(sizesDiv.lastChild);
    }

    for (var i = 0; i < sizes.length; i++) {
        var button = document.createElement("button");
        button.setAttribute('class','color-button')
        button.textContent = sizes[i];
        sizesDiv.appendChild(button);
        button.addEventListener("click", function() {
            currentSelectedSize = this.textContent;
            var sizeButtons = sizesDiv.querySelectorAll(".color-button");
            sizeButtons.forEach(function(sizeButton) {
                sizeButton.style.border = "#e7e7e7";
                sizeButton.style.background = "white";
            });
            this.style.border = "#2196F3";
            this.style.background = "dodgerblue";
        });
    }
}
