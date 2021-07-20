window.addEventListener('load', function () {
    document.getElementById("addJacketBtn").addEventListener("click", addJacketRow);
    document.getElementById("deleteJacketBtn").addEventListener("click", deleteJacketRow);
});

function deleteJacketRow() {
    var rows = document.getElementById("rows-div");
    rows.removeChild(rows.lastChild);
}
function addJacketRow() {
    
    var rowsDiv = document.getElementById("rows-div");
    var formRow = document.createElement('div');
    formRow.className = "form-row";


    // for gender
    var genderGroup = document.createElement('div');
    genderGroup.className = "form-group col-md-2";

    var genderLabel = document.createElement('label')
    genderLabel.textContent = "Gender"


    var genderList = document.createElement('select')
    genderList.className = "form-control";
    var male = document.createElement('option');
    male.text = "Male"
    var female = document.createElement('option');
    female.text = "Female"
    var unisex = document.createElement('option');
    unisex.text = "Unisex"

    genderList.appendChild(male);
    genderList.appendChild(female);
    genderList.appendChild(unisex);

    genderGroup.appendChild(genderLabel);
    genderGroup.appendChild(genderList);


    // for sizes 
    var sizeGroup = document.createElement('div');
    sizeGroup.className = "form-group col-md-2";

    var sizeLabel = document.createElement('label')
    sizeLabel.textContent = "Size"

    var sizeList = document.createElement('select')
    sizeList.className = "form-control"
    var XS = document.createElement('option');
    XS.text = "XS"
    var S = document.createElement('option');
    S.text = "S"
    var M = document.createElement('option');
    M.text = "M"
    var L = document.createElement('option');
    L.text = "L"
    var XL = document.createElement('option');
    XL.text = "XL"

    sizeList.appendChild(XS);
    sizeList.appendChild(S);
    sizeList.appendChild(M);
    sizeList.appendChild(L);
    sizeList.appendChild(XL);

    sizeGroup.appendChild(sizeLabel);
    sizeGroup.appendChild(sizeList);

    // colors 
    var colorGroup = document.createElement('div');
    colorGroup.className = "form-group col-md-2";

    var colorLabel = document.createElement('label')
    colorLabel.textContent = "Color"

    var colorInput = document.createElement('input')
    colorInput.setAttribute('type', 'text')
    colorInput.className = "form-control"
    
    colorGroup.appendChild(colorLabel);
    colorGroup.appendChild(colorInput);

    // location
    var locationGroup = document.createElement('div');
    locationGroup.className = "form-group col-md-2";

    var locationLabel = document.createElement('label')
    locationLabel.textContent = "Location"

    var locationInput = document.createElement('input')
    locationInput.setAttribute('type', 'text')
    locationInput.className = "form-control"

    locationGroup.appendChild(locationLabel);
    locationGroup.appendChild(locationInput);
    
    // count

    var countGroup = document.createElement('div');
    countGroup.className = "form-group col-md-1";

    var countLabel = document.createElement('label')
    countLabel.textContent = "Count"

    var countInput = document.createElement('input')
    countInput.setAttribute('type', 'text')
    countInput.className = "form-control"

    countGroup.appendChild(countLabel);
    countGroup.appendChild(countInput);


    // image

    var imageGroup = document.createElement('div');
    imageGroup.className = "form-group col-md-2";

    var imageLabel = document.createElement('label')
    imageLabel.textContent = "Image"

    var imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')

    imageGroup.appendChild(imageLabel);
    imageGroup.appendChild(imageInput);

    var lastDiv = document.getElementById("lastDiv");
    formRow.appendChild(genderGroup);
    formRow.appendChild(sizeGroup);
    formRow.appendChild(colorGroup);
    formRow.appendChild(locationGroup);
    formRow.appendChild(countGroup);
    formRow.appendChild(imageGroup);

    rowsDiv.appendChild(formRow);

}
