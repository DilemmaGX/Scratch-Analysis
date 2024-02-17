document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const ele = document.getElementById('output');
        ele.innerHTML = `
            <br><br><br><br>
            <div align="center">
                <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>
        `;
        const contents = e.target.result;
        const zip = new JSZip();
        zip.loadAsync(contents).then(function (zip) {
            const files = Object.values(zip.files);
            zip.file('project.json').async('string').then(function (content) {
                // console.log(content);
                content = JSON.parse(content);
                const extensions = getExtensions(content);
                const meta = getMeta(content);
                const blockInfo = {
                    "Number": getBlockTotal(content),
                    "Detail": getBlock(content)
                };
                const varAndList = {
                    "vars": getVariables(content),
                    "lists": getLists(content)
                };
                const custom = getCustomBlocks(content);
                const gandi = isGandi(content);
                ele.innerHTML = `
                    <h2>Blocks</h2>
                    <code>${JSON.stringify(blockInfo, null, 2)}</code><br><br>
                    <h2>Variables and Lists</h2>
                    <code>${JSON.stringify(varAndList, null, 2)}</code><br><br>
                    <h2>Custom Blocks</h2>
                    <code>${JSON.stringify(custom, null, 2)}</code>
                    <h2>Extensions</h2>
                    <code>${JSON.stringify(extensions)}</code><br><br>
                    <h2>Meta</h2>
                    <code>${JSON.stringify(meta)}</code><br><br>
                    <h2>Is Gandi-IDE?</h2>
                    <code>${gandi}</code><br><br>
                `;
                console.log(extensions);
            });
        });
    };
    reader.readAsArrayBuffer(file);
});