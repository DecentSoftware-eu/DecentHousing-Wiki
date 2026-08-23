document$.subscribe(async () => {
    const api_code = document.querySelectorAll('[data-md-component="api-version"]');
    
    function loadApiInfo(data) {
        const version = data["version"];
        const versionToken = '{version}';
        for(const codeBlock of api_code) {
            codeBlock.innerHTML = codeBlock.innerHTML.replace(new RegExp(versionToken, 'g'), version);
        }
    }
    
    async function fetchApiInfo() {
        const tag = await fetch("https://api.github.com/repos/DecentSoftware-eu/Housing/releases/latest").then(_ => _.json());
        
        const data = {
            "version": tag.tag_name
        };
        
        __md_set("__api_tag", data, sessionStorage);
        loadApiInfo(data);
    }
    
    if(location.href.includes('/api/get-started')) {
        const cachedApi = __md_get("__api_tag", sessionStorage);
        if((cachedApi != null) && (cachedApi["version"])) {
            loadApiInfo(cachedApi);
        } else {
            fetchApiInfo();
        }
    }
})