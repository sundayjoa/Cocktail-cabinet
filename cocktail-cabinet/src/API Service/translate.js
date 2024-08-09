
//구글 번역 api 사용
export function loadGoogleTranslate(callback) {
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
}

export function googleTranslateElementInit() {
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement({
            pageLanguage: 'ko',
            autoDisplay: false
        }, 'google_translate_element');
    } else {
        console.error("Google Translate Element is not available.");
    }
}

export function translateElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    googleTranslateElementInit();
                }
            });
        });

        observer.observe(element, { childList: true });
        googleTranslateElementInit();
    }
}

export function triggerTranslateion() {
    translateElementById('cocktail-recipe');
    translateElementById('cocktail-ingredients');
}

//전역 함수로 설정
window.googleTranslateElementInit = googleTranslateElementInit;