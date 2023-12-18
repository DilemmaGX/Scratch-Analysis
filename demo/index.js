document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const zip = new JSZip();
        document.getElementById("fileListComplex").innerHTML = "<code>Loading</code>";
        document.getElementById("fileListBasic").innerHTML = "<code>Loading</code>";
        zip.loadAsync(contents).then(function (zip) {
            const files = Object.values(zip.files);
            //console.log(files);
            // 读取project.json文件的内容
            zip.file('project.json').async('string').then(function (content) {
                //console.log(content);
                let comp = getHead(JSON.parse(content))
                document.getElementById("fileListComplex").innerHTML = "<code>" + JSON.stringify(comp) + "</code>"

                let basi = getStats(JSON.parse(content))
                document.getElementById("fileListBasic").innerHTML = "<code>" + JSON.stringify(basi) + "</code>"
            });
        });
    };

    reader.readAsArrayBuffer(file);
});