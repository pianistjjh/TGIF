//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
if (location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/senate-data.html" || location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/house-data.html") {

    var selectMembers = data.results[0].members;

    var checkbox1 = document.getElementById("republican");
    checkbox1.addEventListener("click", filterData);
    var checkbox2 = document.getElementById("democrat");
    checkbox2.addEventListener("click", filterData);
    var checkbox3 = document.getElementById("independent");
    checkbox3.addEventListener("click", filterData);

    var drop = document.getElementById("dropdownBox")
    drop.addEventListener('change', filterData);

    function createTable(array) {
        var tbody = document.getElementById("senate-data");
        tbody.innerHTML = ""; // not to write thead repeatly


        for (var i = 0; i < array.length; i++) {
            var row = document.createElement("TR");
            var dataName = document.createElement("TD");
            var selectFirstName = array[i].first_name;
            var selectMiddleName = array[i].middle_name;
            var selectLastName = array[i].last_name;

            if (selectMiddleName !== null) {
                dataName.innerHTML = '<a href="' + array[i].url + '">' + selectFirstName + " " + selectMiddleName + " " + selectLastName + '</a>';
            } else {
                dataName.innerHTML = '<a href="' + array[i].url + '">' + selectFirstName + " " + selectLastName + '</a>';
            }

            var selectParty = document.createElement("TD");
            selectParty.innerHTML = array[i].party;

            var selectState = document.createElement("TD");
            selectState.innerHTML = array[i].state;

            var selectSeniority = document.createElement("TD");
            selectSeniority.innerHTML = array[i].seniority;

            var selectPct = document.createElement("TD");
            selectPct.innerHTML = array[i].votes_with_party_pct + "\%";

            row.appendChild(dataName);
            row.appendChild(selectParty);
            row.appendChild(selectState);
            row.appendChild(selectSeniority);
            row.appendChild(selectPct);
            tbody.appendChild(row);
        }
    }



    ////////////dropdown list

    function createDropdown() {
        var NewArrayState = [];
        for (var i = 0; i < selectMembers.length; i++) {
            NewArrayState.push(selectMembers[i].state);
        }
        var removeRepeat = Array.from(new Set(NewArrayState)).sort();
        for (var i = 0; i < removeRepeat.length; i++) {
            var selectDropdown = document.createElement("option");
            selectDropdown.innerHTML = removeRepeat[i];
            drop.appendChild(selectDropdown);
        }
    }
    createDropdown();

    ////////filter

    function filterData() {
        var newArray = [];
        for (var i = 0; i < selectMembers.length; i++) {
            if (drop.value == selectMembers[i].state || drop.value == "all") {
                if (checkbox1.checked == true && selectMembers[i].party === 'R') {
                    newArray.push(selectMembers[i]);
                }
                if (checkbox2.checked == true && selectMembers[i].party === 'D') {
                    newArray.push(selectMembers[i]);
                }
                if (checkbox3.checked == true && selectMembers[i].party === 'I') {
                    newArray.push(selectMembers[i]);
                }
            }
        }
        if (newArray.length > 0) {
            createTable(newArray);
        } else {
            var dataPlace = document.getElementById("senate-data");
            if (checkbox1.checked == false && checkbox2.checked == false && checkbox3.checked == false) {
                dataPlace.innerHTML = '<span style="color:red" "text-align:center">Please select party</span>';
            } else {
                dataPlace.innerHTML = '<span style="color:red" "text-align:center">No members for this values</span>';
            }
        }
    }

    var dataPlace = document.getElementById("senate-data");
    if (!dataPlace.innerHTML) {
        var instruction = dataPlace.innerHTML = '<span style="color:red" "text-align:center">Please select party</span>';
    }






}









window.onscroll = function () {
    scrollTop()
};

function scrollTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
    var navFix = document.getElementById("navFix");
    var sticky = navFix.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            navFix.classList.add("sticky");
        } else {
            navFix.classList.remove("sticky");
        }
    }myFunction();
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
