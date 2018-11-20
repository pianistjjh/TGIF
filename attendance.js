function allFunc() {

    var arrayLowVote = [];
    var arrayHighVote = [];
    var tbodyLow = document.getElementById("least-engaged");
    var tbodyHigh = document.getElementById("most-engaged");

    totalMembers();
    numberOfMembers();
    calcSumVote();
    smallTable();
    createVoteTable(lowtoHigh(), tbodyHigh);
    createVoteTable(hightoLow(), tbodyLow);
    loader();

    function loader() {
        document.getElementById("loaderWrap").style.display = "none"
    }

    function totalMembers() {
        for (var i = 0; i < selectMembers.length; i++) {

            var getNumParty = selectMembers[i].party;

            if (getNumParty === "D") {
                statistics[0].memberArray.push(selectMembers[i]);
            } else if (getNumParty === "R") {
                statistics[1].memberArray.push(selectMembers[i]);
            } else {
                statistics[2].memberArray.push(selectMembers[i]);
            }
        }
    }

    function numberOfMembers() {
        for (var j = 0; j < statistics.length; j++) {
            var numOfMem = statistics[j].memberArray.length;
            statistics[j].num_of_members = numOfMem;
        }
    }

    function calcSumVote() {

        var sum1 = 0;
        var sum2 = 0;
        var sum3 = 0;
        var sumForAvg = [];

        for (var i = 0; i < statistics[0].memberArray.length; i++) {
            var demoVote = statistics[0].memberArray[i].votes_with_party_pct;
            sum1 += demoVote;

        }
        for (var i = 0; i < statistics[1].memberArray.length; i++) {
            var repVote = statistics[1].memberArray[i].votes_with_party_pct;
            sum2 += repVote;
        }
        for (var i = 0; i < statistics[2].memberArray.length; i++) {
            var indVote = statistics[2].memberArray[i].votes_with_party_pct;
            sum3 += indVote;
        }

        sumForAvg.push(sum1);
        sumForAvg.push(sum2);
        sumForAvg.push(sum3);

        getAvg(sumForAvg);
    }

    function getAvg(array) {
        var avgSum = [];
        var sum = 0;
        var sumnew = 0;
        for (var j = 0; j < statistics.length; j++) {
            var avg = array[j] / statistics[j].memberArray.length;
            if (isNaN(avg)) {
                avg = 0;
            } else {
                statistics[j].vote_average_of_members = avg.toFixed(2) + "%";
            }
            avgSum.push(avg);
            var totalSum = avgSum.reduce(function getSum(total, num) {
                return total + num;
            }, 0);

            console.log(sumnew);
            var totalMem = statistics[j].memberArray.length;
            sum += totalMem;

        }
        var totalAvg = totalSum / statistics.length;

        function smallTableTotal() {
            var avgTotal = document.getElementById("totalVote");
            avgTotal.innerHTML = totalAvg.toFixed(2) + "%";
            var memTotal = document.getElementById("totalMem");
            memTotal.innerHTML = sum;

        }
        smallTableTotal();
    }

    function smallTable() {
        for (var j = 0; j < statistics.length; j++) {
            var memberNum = document.getElementsByClassName("numofMem");
            memberNum[j].innerHTML = statistics[j].num_of_members;
            var averageVote = document.getElementsByClassName("averageVote");

            averageVote[j].innerHTML = statistics[j].vote_average_of_members;

        }
    }

    function lowtoHigh() {
        for (var i = 0; i < selectMembers.length; i++) {
            var fromLow = selectMembers.sort(function (a, b) {
                if (a.missed_votes_pct < b.missed_votes_pct) {
                    return 1;
                } else {
                    return -1;
                }
            });
            arrayLowVote.push(fromLow[i]);
        }
        var array = tenPctFunction(arrayLowVote);

        return array;
    }

    function hightoLow() {
        for (var i = 0; i < selectMembers.length; i++) {
            var fromHigh = selectMembers.sort(function (a, b) {
                if (a.missed_votes_pct > b.missed_votes_pct) {
                    return 1;
                } else {
                    return -1;
                }
            });
            arrayHighVote.push(fromHigh[i]);
        }
        var array = tenPctFunction(arrayHighVote);

        return array;
    }

    function tenPctFunction(array) {
        var tenPctLength = Math.floor(selectMembers.length * 0.1);
        var tenPctValueLow = array[tenPctLength];
        var lowAttendence = array.slice(0, tenPctLength);
        for (var i = 0; i < array.length; i++) {
            if (array[i].missed_votes_pct === tenPctValueLow.missed_votes_pct) {
                lowAttendence.push(array[i]);
            }
        }
        return lowAttendence;


    }

    function createVoteTable(array1, target) {

        for (var i = 0; i < array1.length; i++) {
            var row = document.createElement("TR");
            var dataName = document.createElement("TD");
            var selectFirstName = array1[i].first_name;
            var selectMiddleName = array1[i].middle_name;
            var selectLastName = array1[i].last_name;

            if (selectMiddleName !== null) {
                dataName.innerHTML = '<a href="' + array1[i].url + '">' + selectFirstName + " " + selectMiddleName + " " + selectLastName + '</a>';
            } else {
                dataName.innerHTML = '<a href="' + array1[i].url + '">' + selectFirstName + " " + selectLastName + '</a>';
            }

            var selectMissedVotes = document.createElement("TD");
            selectMissedVotes.innerHTML = array1[i].missed_votes;

            var selectMissedVotesPct = document.createElement("TD");
            if (array1[i].missed_votes !== 0) {
                selectMissedVotesPct.innerHTML = array1[i].missed_votes_pct + "%";
            } else {
                selectMissedVotesPct.innerHTML = array1[i].missed_votes_pct;
            }
            row.appendChild(dataName);
            row.appendChild(selectMissedVotes);
            row.appendChild(selectMissedVotesPct);

            target.appendChild(row);
        }
    }


}

window.onscroll = function () {
    scrollTop()
    myFunction()
};

function scrollTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}
