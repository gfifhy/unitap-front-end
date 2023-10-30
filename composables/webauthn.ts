export default class WebAuthn {
    /**
     * Routes for WebAuthn assertion (login) and attestation (register).
     *
     * @type {{registerOptions: string, register: string, loginOptions: string, login: string, }}
     */
    #routes = {
        base: "https://api.unitap.dev",
        registerOptions: "api/webauth/register/options",
        register: "api/webauth/register",
        loginOptions: "api/webauth/login/options",
        login: "api/webauth/login",
    }

    /**
     * Returns a fetch promise to resolve later.
     *
     * @param data {Object}
     * @param route {string}
     * @param headers {{string}}
     * @returns {Promise<Response>}
     */
    #fetch(data, route, headers = {}, meth) {

        const requestOptions = {
            method: meth ? "POST" : "GET",
            headers: { ...headers },
        };
  
        if (meth) {
            requestOptions.body = JSON.stringify(data);
        }
  
        return doRequest(
            route,
            requestOptions
        );
    }

    /**
     * Register the user credentials from the browser/device.
     *
     * You can add request input if you are planning to register a user with WebAuthn from scratch.
     *
     * @param request {{string}}
     * @param response {{string}}
     * @returns Promise<JSON|ReadableStream>
     */
    async register(request = {}, response = {}) {
        const optionsResponse = await this.#fetch(request, this.#routes.registerOptions);
        const publicKey = this.#parseIncomingServerOptions(optionsResponse.data._rawValue);
        const credentials = await navigator.credentials.create({publicKey});
        const publicKeyCredential = this.#parseOutgoingCredentials(credentials);

        Object.assign(publicKeyCredential, response);
        Object.assign(publicKeyCredential, request);

        return await this.#fetch(publicKeyCredential, this.#routes.register, {}, true);
    }

    /**
     * Log in a user with his credentials.
     *
     * If no credentials are given, the app may return a blank assertion for userless login.
     *
     * @param request {{string}}
     * @param response {{string}}
     * @returns Promise<JSON|ReadableStream>
     */
    async login(request = {}, response = {}) {
        const optionsResponse = await this.#fetch(request, this.#routes.loginOptions);
        const publicKey = this.#parseIncomingServerOptions(optionsResponse.data._rawValue);
        const credentials = await navigator.credentials.get({publicKey});
        const publicKeyCredential = this.#parseOutgoingCredentials(credentials);

        Object.assign(publicKeyCredential, response);

        return await this.#fetch(publicKeyCredential, this.#routes.login, response, true);
    }

    /**
     * Checks if the browser supports WebAuthn.
     *
     * @returns {boolean}
     */
    static supportsWebAuthn() {
        return typeof PublicKeyCredential != "undefined";
    }

    /**
     * Checks if the browser doesn't support WebAuthn.
     *
     * @returns {boolean}
     */
    static doesntSupportWebAuthn() {
        return !this.supportsWebAuthn();
    }

    /**
     * Decodes a BASE64 URL string into a normal string.
     *
     * @param input {string}
     * @returns {string|Iterable}
     */
    static #base64UrlDecode(input) {
        input = input.replace(/-/g, "+").replace(/_/g, "/");

        const pad = input.length % 4;

        if (pad) {
            if (pad === 1) {
                throw new Error("InvalidLengthError: Input base64url string is the wrong length to determine padding");
            }

            input += new Array(5 - pad).join("=");
        }

        return atob(input);
    }

    /**
     * Transform a string into Uint8Array instance.
     *
     * @param input {string}
     * @param useAtob {boolean}
     * @returns {Uint8Array}
     */
    static #uint8Array(input, useAtob = false) {
        return Uint8Array.from(
            useAtob ? atob(input) : WebAuthn.#base64UrlDecode(input), c => c.charCodeAt(0)
        );
    }

    /**
     * Encodes an array of bytes to a BASE64 URL string
     *
     * @param arrayBuffer {ArrayBuffer|Uint8Array}
     * @returns {string}
     */
    static #arrayToBase64String(arrayBuffer) {
        return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    }

    /**
     * Parses the Public Key Options received from the Server for the browser.
     *
     * @param publicKey {Object}
     * @returns {Object}
     */
    #parseIncomingServerOptions(publicKey) {

        publicKey.challenge = WebAuthn.#uint8Array(publicKey.challenge);

        if ('user' in publicKey) {
            publicKey.user = {
                ...publicKey.user,
                id: WebAuthn.#uint8Array(publicKey.user.id)
            };
        }

        [
            "excludeCredentials",
            "allowCredentials"
        ]
            .filter(key => key in publicKey)
            .forEach(key => {
                publicKey[key] = publicKey[key].map(data => {
                    return {...data, id: WebAuthn.#uint8Array(data.id)};
                });
            });

        return publicKey;
    }

    /**
     * Parses the outgoing credentials from the browser to the server.
     *
     * @param credentials {Credential|PublicKeyCredential}
     * @return {{response: {string}, rawId: string, id: string, type: string}}
     */
    #parseOutgoingCredentials(credentials) {
        let parseCredentials = {
            id: credentials.id,
            type: credentials.type,
            rawId: WebAuthn.#arrayToBase64String(credentials.rawId),
            response: {}
        };

        [
            "clientDataJSON",
            "attestationObject",
            "authenticatorData",
            "signature",
            "userHandle"
        ]
            .filter(key => key in credentials.response)
            .forEach(key => parseCredentials.response[key] = WebAuthn.#arrayToBase64String(credentials.response[key]));

        return parseCredentials;
    }

}