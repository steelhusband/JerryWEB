localStorage.setItem("provresultat", JSON.stringify([]));

var datasourceAppList = new kendo.data.DataSource({
    transport: {
        create: function (options) {
            options.data.ID = kendo.guid();
            alert(options.data.desc);
            var localData = JSON.parse(localStorage.getItem("provresultat"));
            localData.push(options.data);
            localStorage.setItem("provresultat", JSON.stringify(localData)); //localStorage["provresultat"] = JSON.stringify(localData); 
            options.success(localData);
        },
        read: function (options) {
            var localData = JSON.parse(localStorage["provresultat"]);
            options.success(localData);
        },
        update: function (options) {
            var localData = JSON.parse(localStorage["provresultat"]);
            for (var i = 0; i < localData.length; i++) {
                if (localData[i].testId == options.data.testId) {
                    localData[i].desc = options.data.desc;
                    localData[i].deviceNo = options.data.deviceNo;
                    localData[i].validationKey = options.data.validationKey;
                }
            }
            localStorage["grid_data"] = JSON.stringify(localData);
            options.success(localData);
        },
        destroy: function (options) {
            var localData = JSON.parse(localStorage["provresultat"]);
            localData.remove(options.data.ID);
            localStorage["provresultat"] = JSON.stringify(localData);
            options.success(localData);
        },
    },
    schema: {
        model: {
            id: "ID",
            fields: {
                testId: { type: "number" },
                desc: { type: "string" },
                studentname: { type: "string" },
                validationKey: { type: "string" }
            }
        }
    }
});

$("#step1").on("click", function () {
    datasourceAppList.add({ testId: 1, desc: "test1", studentname: "oskar oskarsson", validationKey: "test resultat1" });
    datasourceAppList.sync();
});

$("#step2").on("click", function () {
    datasourceAppList.add({ extappId: 9908, desc: "test2", deviceNo: 7, validationKey: "test resultat2" });
    datasourceAppList.sync();
});

$("#show").on("click", function () {
    var localData = JSON.parse(localStorage.getItem("provresultat"));
    $("#listview").html(JSON.stringify(localData, null, 4));
});