var app = new Vue({
    el: '#senate-data',
    data: {
        members: [],
        filteredArray: [],
        states: [],
        seen: true,
        noMem: false

    },
    created: function () {
        if (location.pathname == "/senate-data.html" || location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/senate-data.html") {

            this.getData("https://api.propublica.org/congress/v1/113/senate/members.json");
            window.addEventListener('scroll', this.handleScroll);
        } else if (location.pathname == "/house-data.html" || location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/house-data.html") {
            this.getData("https://api.propublica.org/congress/v1/113/house/members.json");
            window.addEventListener('scroll', this.handleScroll);
        }
        
    },
    methods: {
        getData: function (url) {
            fetch(url, {
                    method: "GET",
                    headers: new Headers({
                        "X-API-Key": 'hwZtvZv7vV2WbHinf56I83PDm5p5Zb40wNNJLHq2'
                    })
                })
                .then(function (response) {
                    return response.json()
                })
                .then(function (json) {
                    app.members = json.results[0].members;
                    if (location.pathname == "/senate-data.html" || location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/senate-data.html" || location.pathname == "/house-data.html" || location.pathname == "/C:/Users/piani/Desktop/coding/02-01_181101_TGIF1/house-data.html") {
                        app.createDropdown()
                    }
                    app.loader()
                })
                .catch(function (error) {
                    console.log(error)
                });

        },
        filterData: function () {
            checkbox1 = document.getElementById("republican");
            checkbox2 = document.getElementById("democrat");
            checkbox3 = document.getElementById("independent");
            drop = document.getElementById("dropdownBox")
            app.filteredArray = [];

            for (var i = 0; i < app.members.length; i++) {
                if (drop.value == app.members[i].state || drop.value == "all") {
                    if (checkbox1.checked == true && app.members[i].party === 'R') {
                        app.filteredArray.push(app.members[i]);
                    }
                    if (checkbox2.checked == true && app.members[i].party === 'D') {
                        app.filteredArray.push(app.members[i]);
                    }
                    if (checkbox3.checked == true && app.members[i].party === 'I') {
                        app.filteredArray.push(app.members[i]);
                    }
                }
            }

            if (app.filteredArray.length == 0) {
                var dataPlace = document.getElementById("dataPlace");
                if (checkbox1.checked == false && checkbox2.checked == false && checkbox3.checked == false) {
                    app.seen = true;
                    app.noMem = false;
                } else if (checkbox1.checked == true || checkbox2.checked == true || checkbox3.checked == true) {
                    app.seen = false;
                    app.noMem = true;
                } else {
                    app.seen = false;
                    app.noMem = false;
                }
            } else {
                app.seen = false;
                app.noMem = false;

            }
        },
        createDropdown: function () {
            var NewArrayState = [];
            for (var i = 0; i < app.members.length; i++) {
                NewArrayState.push(app.members[i].state);
            }
            app.states = Array.from(new Set(NewArrayState)).sort();
        },
        loader: function () {
            document.getElementById("loaderWrap").style.display = "none"
        },
        topFunction: function () {
            document.documentElement.scrollTop = 0;
        },

        handleScroll: function () {
            var nav = document.getElementById("navFix");
            var tableHead = document.getElementById("thead");

            var tableHeadOffsetTop = document.getElementById("table-area").offsetTop;

            var navWrap = document.getElementById("navWrap").offsetTop;

            if (window.pageYOffset > tableHeadOffsetTop) {
                tableHead.classList.add("stickyToTable");
            } else {
                tableHead.classList.remove("stickyToTable");
            }

            function topBtn() {
                if (window.pageYOffset > 20) {
                    document.getElementById("topBtn").style.display = "block";
                } else {
                    document.getElementById("topBtn").style.display = "none";
                }
            }
            topBtn();
        }
    }
});

    window.onscroll = function () {

        myFunction()
    };


    function myFunction() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

