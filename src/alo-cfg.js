(function (document, UNDEFINED, setTimeout, sessionStorage, localStorage, ATTRIBUTE_NAME, CHECKBOX, RADIO) {
    var prefix = "alo",
        SELECTOR = "[" + ATTRIBUTE_NAME + "]",
        update = function (parentNode, isVolatile) {
            var allChildren = (parentNode || document.body).querySelectorAll(SELECTOR),
                storage = isVolatile ? sessionStorage : localStorage,
                i = 0;

            for (; i < allChildren.length; i++) {
                if (allChildren[i].type !== RADIO || allChildren[i].checked) {
                    setItem(this, storage);
                }
            }
            return AloCfg;
        },
        volatileListener = function () {
            setItem(this, sessionStorage);
        },
        permanentListener = function () {
            setItem(this, localStorage);
        },
        setItem = function (dis, storage) {
            storage.setItem(
                prefix + "_" + dis.getAttribute(ATTRIBUTE_NAME),
                dis.type === CHECKBOX ? (dis.checked ? 1 : 0) : dis.value
            );
        },
        bind = function (parentNode, isVolatile) {
            var allChildren = (parentNode || document.body).querySelectorAll(SELECTOR),
                listener = (isVolatile || false) ? volatileListener : permanentListener,
                i = 0;
            for (; i < allChildren.length; i++) {
                allChildren[i].addEventListener("keyup", listener);
                allChildren[i].addEventListener("change", listener);
            }
            return AloCfg;
        },
        setValues = function (parentNode) {
            var allChildren = (parentNode || document.body).querySelectorAll(SELECTOR),
                i = 0,
                storedValue,
                dataCfg;

            for (; i < allChildren.length; i++) {
                dataCfg = prefix + "_" + allChildren[i].getAttribute(ATTRIBUTE_NAME);

                if ((storedValue = localStorage.getItem(dataCfg) || sessionStorage.getItem(dataCfg) || null) !== null) {
                    if (allChildren[i].type === CHECKBOX) {
                        allChildren[i].checked = storedValue == 1;
                    } else if (allChildren[i].type === RADIO) {
                        if (storedValue === allChildren[i].value) {
                            allChildren[i].checked = true;
                        }
                    } else {
                        allChildren[i].value = storedValue;
                    }
                }
            }
            return AloCfg;
        },
        clear = function () {
            var storages = [sessionStorage, localStorage],
                storageIterator = 0,
                fullPrefix = prefix + "_",
                keys, keyIterator;

            for (; storageIterator < storages.length; storageIterator++) {
                keys = Object.keys(storages[storageIterator]);

                for (keyIterator = 0; keyIterator < keys.length; keyIterator++) {
                    if (keys[keyIterator].indexOf(fullPrefix) === 0) {
                        storages[storageIterator].removeItem(keys[keyIterator]);
                    }
                }
            }
        },
        remove = function (key) {
            key = prefix + "_" + key;
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
            return AloCfg;
        },
        setPrefix = function (setPrefix) {
            prefix = setPrefix;
            return AloCfg;
        },
        AloCfg = {
            bind: bind,
            update: update,
            setPrefix: setPrefix,
            setValues: setValues,
            clear: clear,
            remove: remove
        };

    window.AloCfg = AloCfg;
})(document, "undefined", setTimeout, sessionStorage, localStorage, "data-cfg", "checkbox", "radio");