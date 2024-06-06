import {itemsHouse} from './houses.js'

async function fetchAll() {
    const response = await fetch('1c_site.json')
    const data = await response.json()
    return data
} 


window.addEventListener('DOMContentLoaded', () => {
    
    // menu selectors

    const menuOpenBytton = document.querySelector('.menu__Open')
    const menu = document.querySelector('.menu')
    const overlay = document.querySelector('.overlay')

    // fifth block selectors

    const fifthBlockButtonWrapper = document.querySelector('.fifthBlock__items')
    
    // nav selectors

    const navElem = document.querySelector('.nav')
    const navElemHeight = navElem.offsetHeight / 2;

    // houses and houses field selectors 

    const allItemsField = document.querySelector('.fourthAndThirdBlockTogether__inner')    

    // house filtering controls

    const selectionButtonsMenu = document.querySelector('.fourthAndThirdBlockTogether__menuWrapper')
    const buttonsSelectionButtonsMenu = document.querySelectorAll('.fourthAndThirdBlockTogether__text')

    // form feedback selectors

    const buttonModalFeedBack = document.querySelector('.firstBlock__buttonMediaMin940px')
    const feedBackMenu = document.querySelector('.feedBack__menu')
    const feedBack = document.querySelector('.feedBack')
    const crestik = document.querySelector('.crestik')
    const formButtonWrapper = document.querySelector('.feedBack__menu-buttons')
    const flag = document.querySelector('.feedBack__menu-flag')
    const numberText = document.querySelector('.feedBack__menu-number')
    const input = document.querySelector('.feedBack__from-inputPhone')
    const form = document.querySelector('.feedBack__form')
    const loader = document.querySelector('.loader')
    const btnText = document.querySelector('.feedBack__form-submitText')
    const feedBackModal = document.querySelector('.feedBackModal')
    const btnCLoseBlackCrestik = document.querySelector('.crestikBlack')
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const arrayNameAndNumber = ['af', '    Aghanistan (افغانستان)    ', '    +93', '    al', '    Albania (Shqipëri)', '    +355', '    dz', '    Algeria (الجزائر)', '    +213', '    ad', '    Andorr', '    +376', '    ao', '    Angol', '    +244', '    am', '    Armenia (Հայաստան)', '    +374', '    ag', '    Antigua and Barbud', '    +1 (268)', '    ar', '    Argentin', '    +54', '    au', '    Australi', '    +61', '    at', '    Austria (Österreich)', '    +43', '    az', '    Azerbaijan (Azərbaycan)', '    +994', '    bs', '    Bahama', '    +1 (242)', '    bh', '    Bahrain (البحرين)', '    +973', '    bd', '    Bangladesh (বাংলাদেশ)', '    +880', '    bb', '    Barbado', '    +1 (246)', '    by', '    Belarus (Беларусь)', '    +375', '    be', '    Belgium (België)', '    +32', '    bz', '    Beliz', '    +501', '    bj', '    Benin (Bénin)', '    +229', '    bt', '    Bhutan (འབྲུག)', '    +975', '    bo', '    Bolivi', '    +591', '    ba', '    Bosnia and Herzegovin', '    +387', '    bw', '    Botswan', '    +267', '    br', '    Brazil (Brasil)', '    +55', '    bn', '    Brune', '    +673', '    bg', '    Bulgaria (България)', '    +359', '    bf', '    Burkina Fas', '    +226', '    bi', '    Burundi (Uburundi)', '    +257', '    kh', '    Cambodia (កម្ពុជា)', '    +855', '    cm', '    Cameroon (Cameroun)', '    +237', '    ca', '    Canad', '    +1', '    cv', '    Cape Verde (Kabu Verdi)', '    +238', '    cf', '    Central African Republic (République centrafricaine)', '    +236    ', '    td', '    Chad (Tchad)', '    +235', '    cl', '    Chil', '    +56', '    cn', '    China (中国)', '    +86', '    co', '    Colombi', '    +57', '    km', '    Comoros (جزر القمر)', '    +269', '    cd', '    Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)', '    +243    ', '    gc', '    Congo (Republic) (Congo-Brazzaville)', '    +242    ', '    ck', '    Cook Island', '    +682', '    cr', '    Costa Ric', '    +506', '    ci', '    Cote d’Ivoir', '    +225', '    hr', '    Croatia (Hrvatska)', '    +385', '    cu', '    Cub', '    +53', '    cy', '    Cyprus (Κύπρος)', '    +357', '    cz', '    Czech Republic (Česká republika)', '    +420', '    dk', '    Denmark (Danmark)', '    +45', '    dj', '    Djibout', '    +253', '    dm', '    Dominic', '    +1 (767)', '    do', '    Dominican Republic (República Dominicana)', '    +1    ', '    ec', '    Ecuador', '    +593', '    eg', '    Egypt (مصر)', '    +20', '    sv', '    El Salvado', '    +503', '    gq', '    Equatorial Guinea (Guinea Ecuatorial)', '    +240    ', '    e', '    Eritre', '    +291', '    ee', '    Estonia (Eesti)', '    +372', '    et', '    Ethiopi', '    +251', '    fj', '    Fij', '    +679', '    fi', '    Finland (Suomi)', '    +358', '    fr', '    Franc', '    +33', '    ga', '    Gabo', '    +241', '    gm', '    Gambi', '    +220', '    ge', '    Georgia (საქართველო)', '    +995', '    de', '    Germany (Deutschland)', '    +49', '    gh', '    Ghana (Gaana)', '    +233', '    gr', '    Greece (Ελλάδα)', '    +30', '    gd', '    Grenad', '    +1 (473)', '    gt', '    Guatemal', '    +502', '    gn', '    Guinea (Guinée)', '    +224', '    gw', '    Guinea-Bissau (Guiné Bissau)', '    +245', '    gy', '    Guyan', '    +592', '    ht', '    Hait', '    +509', '    hn', '    Hondura', '    +504', '    hk', '    Hong Kong (香港)', '    +852', '    hu', '    Hungary (Magyarország)', '    +36', '    is', '    Iceland (Ísland)', '    +354', '    in', '    India (भारत)', '    +91', '    id', '    Indonesi', '    +62', '    ir', '    Iran (ایران)', '    +98', '    iq', '    Iraq (العراق)', '    +964', '    ie', '    Irelan', '    +353', '    il', '    Israel (ישראל)', '    +972', '    it', '    Italy (Italia)', '    +39', '    jm', '    Jamaic', '    +1', '    jp', '    Japan (日本)', '    +81', '    jo', '    Jordan (الأردن)', '    +962', '    kz', '    Kazakhstan (Казахстан)', '    +7', '    ke', '    Keny', '    +254', '    ki', '    Kiribat', '    +686', '    xk', '    Kosovo (Republic)', '    +383', '    kw', '    Kuwait (الكويت)', '    +965', '    kg', '    Kyrgyzstan (Кыргызстан)', '    +996', '    la', '    Laos (ລາວ)', '    +856', '    lv', '    Latvia (Latvija)', '    +371', '    lb', '    Lebanon (لبنان)', '    +961', '    ls', '    Lesoth', '    +266', '    lr', '    Liberi', '    +231', '    ly', '    Libya (ليبيا)', '    +218', '    li', '    Liechtenstei', '    +423', '    lt', '    Lithuania (Lietuva)', '    +370', '    lu', '    Luxembour', '    +352', '    mo', '    Maca', '    +853', '    mk', '    Macedonia (FYROM) (Македонија)', '    +389', '    mg', '    Madagascar (Madagasikara)', '    +261', '    mw', '    Malaw', '    +265', '    my', '    Malaysi', '    +60', '    mv', '    Maldive', '    +960', '    ml', '    Mal', '    +223', '    mt', '    Malt', '    +356', '    mh', '    Marshall Island', '    +692', '    mr', '    Mauritania (موريتانيا)', '    +222', '    mu', '    Mauritius (Moris)', '    +230', '    mx', '    Mexico (México)', '    +52', '    mb', '    Mexico (México)', '    +521', '    fm', '    Micronesi', '    +691', '    md', '    Moldova (Republica Moldova)', '    +373', '    mc', '    Monac', '    +377', '    mn', '    Mongolia (Монгол)', '    +976', '    me', '    Montenegro (Crna Gora)', '    +382', '    ma', '    Morocco (المغرب)', '    +212', '    mz', '    Mozambique (Moçambique)', '    +258', '    mm', '    Myanmar (Burma) (မြန်မာ)', '    +95', '    na', '    Namibia (Namibië)', '    +264', '    nr', '    Naur', '    +674', '    np', '    Nepal (नेपाल)', '    +977', '    nl', '    Netherlands (Nederland)', '    +31', '    nz', '    New Zealan', '    +64', '    ni', '    Nicaragu', '    +505', '    ne', '    Niger (Nijar)', '    +227', '    ng', '    Nigeri', '    +234', '    nu', '    Niue', '    +683', '    kp  ', '    North Korea (조선 민주주의 인민 공화국)', '    +850    ', '    no', '    Norway (Norge)', '    +47', '    om', '    Oman (عُمان)', '    +968', '    pa', '    Panam', '    +507', '    pk', '    Pakistan (پاکستان)', '    +92', '    pw', '    Pala', '    +680', '    ps', '    Palestinian Territor', '    +970', '    pg', '    Papua New Guine', '    +675', '    py', '    Paragua', '    +595', '    pe', '    Peru (Perú)', '    +51', '    ph', '    Philippine', '    +63', '    pl', '    Poland (Polska)', '    +48', '    pt', '    Portuga', '    +351', '    qa', '    Qatar (قطر)', '    +974', '    ro', '    Romania (România)', '    +40', '    ru', '    Russian Federation (Российская Федерация)', '    +7    ', '    rw', '    Rwand', '    +250', '    kn', '    Saint Kitts and Nevi', '    +1 (869)', '    lc', '    Saint Luci', '    +1 (758)', '    vc', '    Saint Vincent and the Grenadine', '    +1 (784)', '    ws', '    Samo', '    +685', '    sm', '    San Marin', '    +378', '    st', '    Sao Tome and Principe (São Tomé e Príncipe)', '    +239    ', '    sa', '    Saudi Arabia (المملكة العربية السعودية)', '    +966    ', '    sn', '    Senegal (Sénégal)', '    +221', '    rs', '    Serbia (Србија)', '    +381', '    sc', '    Seychelle', '    +248', '    sl', '    Sierra Leon', '    +232', '    sg', '    Singapor', '    +65', '    sk', '    Slovakia (Slovensko)', '    +421', '    si', '    Slovenia (Slovenija)', '    +386', '    sb', '    Solomon Island', '    +677', '    so', '    Somalia (Soomaaliya)', '    +252', '    za', '    South Afric', '    +27', '    kr', '    South Korea (대한민국)', '    +82', '    ss', '    South Sudan (جنوب السودان)', '    +211', '    es', '    Spain (España)', '    +34', '    lk', '    Sri Lanka (ශ්‍රී ලංකාව)', '    +94', '    sd', '    Sudan (السودان)', '    +249', '    sr', '    Surinam', '    +597', '    sz', '    Swazilan', '    +268', '    se', '    Sweden (Sverige)', '    +46', '    ch', '    Switzerland (Schweiz)', '    +41', '    sy', '    Syria (سوريا)', '    +963', '    tw', '    Taiwan (台灣)', '    +886', '    tj', '    Tajikista', '    +992', '    tz', '    Tanzani', '    +255', '    th', '    Thailand (ไทย)', '    +66', '    tg', '    Togo', '    +228', '    to', '    Tonga', '    +676', '    tt', '    Trinidad and Tobag    ', '    1 (868)', '    tn', '    Tunisia (تونس)', '    +216', '    tr', '    Turkey (Türkiye)', '    +90', '    tm', '    Turkmenista', '    +993', '    tv', '    Tuval', '    +688', '    ug', '    Ugand', '    +256', '    ua', '    Ukraine (Україна)', '    +380', '    ae', '    United Arab Emirates (الإمارات العربية المتحدة)', '    +971    ', '    gb', '    United Kingdom', '    +44', '    us', '    US', '    +1', '    uy', '    Urugua', '    +598', '    uz', '    Uzbekistan (Oʻzbekiston)', '    +998', '    vu', '    Vanuat', '    +678', '    va', '    Vatican City (Città del Vaticano)', '    +39', '    ve', '    Venezuel', '    +58', '    vn', '    Vietnam (Việt Nam)', '    +84', '    ye', '    Yemen (اليمن)', '    +967', '    zm', '    Zambi', '    +260', '    zw', '    Zimbabw', '    +263']
        
    const arrayPositionBG = ['ad','    -5px','    -5px','    ae','    -33px','    -5px','    af','    -61px','    -5px','    ag','    -89px','    -5px','    al','    -117px','    -5px','    am','    -145px','    -5px','    ao','    -173px','    -5px','    ar','    -201px','    -5px','    at','    -229px','    -5px','    au','    -257px','    -5px','    az','    -285px','    -5px','    ba','    -313px','    -5px','    bb','    -5px','    -28px','    bd','    -33px','    -28px','    be','    -61px','    -28px','    bf','    -89px','    -28px','    bg','    -117px','    -28px','    bh','    -145px','    -28px','    bi','    -173px','    -28px','    bj','    -201px','    -28px','    bm','    -229px','    -28px','    bn','    -257px','    -28px','    bo','    -285px','    -28px','    br','    -313px','    -28px','    bs','    -5px','    -51px','    bt','    -33px','    -51px','    bw','    -61px','    -51px','    by','    -89px','    -51px','    bz','    -117px','    -51px','    ca','    -145px','    -51px','    cd','    -173px','    -51px','    cf','    -201px','    -51px','    cg','    -229px','    -51px','    ch','    -257px','    -51px','    ci','    -285px','    -51px','    ck','    -313px','    -51px','    cl','    -5px','    -74px','    cm','    -33px','    -74px','    cn','    -61px','    -74px','    co','    -89px','    -74px','    cr','    -117px','    -74px','    cu','    -145px','    -74px','    cv','    -173px','    -74px','    cy','    -201px','    -74px','    cz','    -229px','    -74px','    de','    -257px','    -74px','    dj','    -285px','    -74px','    dk','    -313px','    -74px','    dm','    -5px','    -97px','    do','    -33px','    -97px','    dz','    -61px','    -97px','    ec','    -89px','    -97px','    ee','    -117px','    -97px','    eg','    -145px','    -97px','    eh','    -173px','    -97px','    er','    -201px','    -97px','    es','    -229px','    -97px','    et','    -257px','    -97px','    fi','    -285px','    -97px','    fj','    -313px','    -97px','    fm','    -5px','    -120px','    fr','    -33px','    -120px','    ga','    -61px','    -120px','    gb','    -89px','    -120px','    gd','    -117px','    -120px','    ge','    -145px','    -120px','    gh','    -173px','    -120px','    gm','    -201px','    -120px','    gn','    -229px','    -120px','    gq','    -257px','    -120px','    gr','    -285px','    -120px','    gt','    -313px','    -120px','    gw','    -5px','    -143px','    gy','    -33px','    -143px','    hk','    -61px','    -143px','    hn','    -89px','    -143px','    hr','    -117px','    -143px','    ht','    -145px','    -143px','    hu','    -173px','    -143px','    id','    -201px','    -143px','    ie','    -229px','    -143px','    il','    -257px','    -143px','    in','    -285px','    -143px','    iq','    -313px','    -143px','    ir','    -5px','    -166px','    is','    -33px','    -166px','    it','    -61px','    -166px','    jm','    -89px','    -166px','    jo','    -117px','    -166px','    jp','    -145px','    -166px','    ke','    -173px','    -166px','    kg','    -201px','    -166px','    kh','    -229px','    -166px','    ki','    -257px','    -166px','    km','    -285px','    -166px','    kn','    -313px','    -166px','    kp','    -5px','    -189px','    kr','    -33px','    -189px','    ks','    -61px','    -189px','    kw','    -89px','    -189px','    kz','    -117px','    -189px','    la','    -145px','    -189px','    lb','    -173px','    -189px','    lc','    -201px','    -189px','    li','    -229px','    -189px','    lk','    -257px','    -189px','    lr','    -285px','    -189px','    ls','    -313px','    -189px','    lt','    -5px','    -212px','    lu','    -33px','    -212px','    lv','    -61px','    -212px','    ly','    -89px','    -212px','    ma','    -117px','    -212px','    mc','    -145px','    -212px','    md','    -173px','    -212px','    me','    -201px','    -212px','    mg','    -229px','    -212px','    mh','    -257px','    -212px','    mk','    -285px','    -212px','    ml','    -313px','    -212px','    mm','    -5px','    -235px','    mn','    -33px','    -235px','    mo','    -61px','    -235px','    mr','    -89px','    -235px','    mt','    -117px','    -235px','    mu','    -145px','    -235px','    mv','    -173px','    -235px','    mw','    -201px','    -235px','    mb','    -229px','    -235px','    mx','    -229px','    -235px','    my','    -257px','    -235px','    mz','    -285px','    -235px','    na','    -313px','    -235px','    ne','    -5px','    -258px','    ng','    -33px','    -258px','    ni','    -61px','    -258px','    nl','    -89px','    -258px','    no','    -117px','    -258px','    np','    -341px','    -5px','    nr','    -145px','    -258px','    nu','    -173px','    -258px','    nz','    -201px','    -258px','    om','    -229px','    -258px','    pa','    -257px','    -258px','    pe','    -285px','    -258px','    pg','    -313px','    -258px','    ph','    -5px','    -281px','    pk','    -33px','    -281px','    pl','    -61px','    -281px','    ps','    -89px','    -281px','    pt','    -117px','    -281px','    pw','    -145px','    -281px','    py','    -173px','    -281px','    qa','    -201px','    -281px','    ro','    -229px','    -281px','    rs','    -257px','    -281px','    ru','    -285px','    -281px','    rw','    -313px','    -281px','    sa','    -5px','    -304px','    sb','    -33px','    -304px','    sc','    -61px','    -304px','    sd','    -89px','    -304px','    se','    -117px','    -304px','    sg','    -145px','    -304px','    si','    -173px','    -304px','    sk','    -201px','    -304px','    sl','    -229px','    -304px','    sm','    -257px','    -304px','    sn','    -285px','    -304px','    so','    -313px','    -304px','    sr','    -5px','    -327px','    ss','    -33px','    -327px','    st','    -61px','    -327px','    sv','    -89px','    -327px','    sy','    -117px','    -327px','    sz','    -145px','    -327px','    td','    -173px','    -327px','    tg','    -201px','    -327px','    th','    -229px','    -327px','    tj','    -257px','    -327px','    tl','    -285px','    -327px','    tm','    -313px','    -327px','    tn','    -367px','    -5px','    to','    -341px','    -28px','    tr','    -341px','    -51px','    tt','    -341px','    -74px','    tv','    -341px','    -97px','    tw','    -341px','    -120px','    tz','    -341px','    -143px','    ua','    -341px','    -166px','    ug','    -341px','    -189px','    us','    -341px','    -212px','    uy','    -341px','    -235px','    uz','    -341px','    -258px','    va','    -341px','    -281px','    vc','    -341px','    -304px','    ve','    -341px','    -327px','    vn','    -5px','    -350px','    vu','    -33px','    -350px','    ws','    -61px','    -350px','    xk','    -89px','    -350px','    ye','    -117px','    -350px','    za','    -145px','    -350px','    zm','    -173px','    -350px','    zw','    -201px','    -350px']

    // phone mask selectors

    const formInputMask = document.querySelector('.feedBack__from-inputPhone')
    const maskOptions = {
        mask: '(000) 000-00-00',
        lazy: true
    }

    const mask = new IMask(formInputMask, maskOptions)

    // modal selectors

    const slidesFieldActionOpen = document.querySelector('.fifthBlock__imgs')
    const modal = document.querySelector('.modalImgSlider')
    const buttonCloseModal = document.querySelector('.modalImgSlider__close')
    const slideModalField = document.querySelector('.modalImgSlider__field')
    const slidesModal = document.querySelectorAll('.modalImgSlider__img')
    const prevModal = document.querySelector('.modalImgSlider__button-left')
    const nextModal = document.querySelector('.modalImgSlider__button-right')

    let slideIndex = 1;

    // actions on the dropdown menu

    function menuAddorRemoveClass(action) {
        switch (action){
            case 'remove':
                menu.classList.remove('visible');
                overlay.classList.remove('block')
                document.body.style.overflow = '';
                break
            case 'add':
                menu.classList.add('visible');
                overlay.classList.add('block')
                document.body.style.overflow = 'hidden';
                break
        } 
    }

    function checkingTheTargetInTheMenu (event) {
        target = event.target.className

        switch (target){
            case 'menu__Close':
                menuAddorRemoveClass('remove')
                break
            case 'overlay':
                menuAddorRemoveClass('remove')
                break
            case 'menu__link':
                menuAddorRemoveClass('remove')
                break
        }
    }

    //detailed information fifth block

    function changesHeightAndPadding(target, rotate) {
        switch (rotate){
            case false:
                target.nextElementSibling.style.maxHeight = '0px'
                target.nextElementSibling.style.marginBottom = '0px'
                target.classList.remove('rotate')
                break
            case true:
                target.nextElementSibling.style.maxHeight = '190px'
                target.nextElementSibling.style.marginBottom = '20px'
                target.classList.add('rotate')
                break
        }
        
    }

    function actionOnFifthBLockButton(event) {
        let target = event.target
        if (target.classList.contains('fifthBlock__item-plus')) {
            switch (target.classList.length){
                case 1:
                    changesHeightAndPadding(target, true)
                    break
                case 2:
                    changesHeightAndPadding(target, false)
                    break
            }
        }
    } 

    //animation nav at scroll


    function changesBGColorInNav() {
        if (window.scrollY > navElemHeight){
            navElem.style.backgroundColor = '#074097';
        } else {
            navElem.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        }
    }

    // create new array and filtration types and houses

    function findingHouseTypes(houses) {
        let typesHouseArray = []

        houses.forEach((item) => {
            if (typesHouseArray.indexOf(item.typeHouse) == -1) {
                typesHouseArray.push(item.typeHouse)
            }
        })

        return typesHouseArray
    }

    function getActiveTypeHouses(target) {

        let activeAllCatalog = []
        
        if (target.dataset.modal != 'all') {
            createEntireCatalogOfHouses(itemsHouse).forEach((item) => {
                if (item.type === target.dataset.modal ) {
                    if (activeAllCatalog.indexOf(item.typeHouse) == -1) {
                        activeAllCatalog.push(item.typeHouse)
                    }
                    activeAllCatalog.push(item)
                } 
            })
        } else {
            activeAllCatalog = [...createEntireCatalogOfHouses(itemsHouse)]
        }

        return activeAllCatalog
    }

    // create entire catalog of houses

    function createEntireCatalogOfHouses(houses) {
        const entireCatalogOfHouses = []


        findingHouseTypes(houses).forEach((type) => {
            entireCatalogOfHouses.push(type)
    
            houses.forEach(item => {
                if (item.typeHouse == type){
                    entireCatalogOfHouses.push(item)
                }
            })
        })

        return entireCatalogOfHouses
    }

    // modal house, bathhouse and typeName

    function modalHouse(img, alt, size, square, code, coust, mortgage, link) {
        return `
            <div class="fourthAndThirdBlockTogether__tile">
                <img class="fourthAndThirdBlockTogether__tile-img" src=${img} alt=${alt}>
                <div class="fourthAndThirdBlockTogether__tile-text">${size}</div>
                <div class="fourthAndThirdBlockTogether__tile-text">${square}</div>
                <div class="fourthAndThirdBlockTogether__tile-text"  id="${code}">${coust}</div>
                <div class="fourthAndThirdBlockTogether__tile-text">${mortgage}</div>
                <a href=${link} class="fourthAndThirdBlockTogether__link">
                    <img src="./assets/icons/textSvg.svg" alt="link">
                </a>
            </div>
        `
    }

    function modalBathHouse(img, alt, size, square, code, coust, link){
        return `
            <div class="fourthAndThirdBlockTogether__tile">
                <img class="fourthAndThirdBlockTogether__tile-img" src=${img} alt=${alt}>
                <div class="fourthAndThirdBlockTogether__tile-text">${size}</div>
                <div class="fourthAndThirdBlockTogether__tile-text">${square}</div>
                <div class="fourthAndThirdBlockTogether__tile-text"  id="${code}">${coust}</div>
                <a href=${link} class="fourthAndThirdBlockTogether__link">
                    <img src="./assets/icons/textSvg.svg" alt="link">
                </a>
            </div>
        `
    }

    function modalTypeHousesOrBathHouses(typeName){
        return `
            <div class="fourthBlock__headers">
                ${typeName}
                <div class='fullScreenLine'></div>
            </div>
        `
    }

    // open and close modal 

    function openModal(event) {
        const target = event.target

        const parent = target.parentElement

        if (target.className === 'fifthBlock__img'){
            modal.style.visibility = 'visible'
            modal.classList.remove('none')
            slideIndex = Array.from(parent.children).indexOf(target) + 1;
            showSlides(slideIndex)
        }
    }

    function closeModal() {
        modal.style.visibility = 'hidden'
        modal.classList.add('none')
    }
    

    // show slides in modal


    function showSlides(n) {
        if (n > slidesModal.length) {
            slideIndex = 1
        } 

        if  (n < 1) {
            slideIndex = slidesModal.length
        }

        slidesModal.forEach( slide => slide.style.display = 'none')

        slidesModal[slideIndex - 1].style.display = 'block'

    }

    function plusSlides(n) {
        showSlides(slideIndex += n)
    }

    // zoom in, zoom out in modal slide

    function zoomModalSlide(event) {
        const target = event.target
        switch (target.style.scale) {
            case '1.3':
                target.style.scale = '1.0'
                target.style.cursor ='zoom-in'
                break
            default:
                target.style.scale = '1.3'
                target.style.cursor ='zoom-out'
        }
    }

    //catalog of baths, houses

    function createAllElem (arr) {
        allItemsField.innerHTML = arr
            .map(
                (task) => {
                    switch (typeof(task)) {
                        case 'object':
                            switch (Object.keys(task).length){
                                case 10:
                                    return modalHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.mortgage, task.link)
                                case 9:
                                    return modalBathHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.link)
                            }        
                        case 'string':
                            return modalTypeHousesOrBathHouses(task)
                    }
                } 
            )
            .join('')
        updateCost()
    }

    //changes backgorund color in selections buttons

    function changesBgColorInSelectionsButtons(target) {
        buttonsSelectionButtonsMenu.forEach(button => {
            button.classList.remove('changesBg')
        })

        target.classList.add('changesBg')
    }

    // redraw houses field due to filtering


    function redrawHousesFieldDueToFiltering(event) {
        let target = event.target;

        changesBgColorInSelectionsButtons(target)

        allItemsField.innerHTML = getActiveTypeHouses(target)
            .map(
                (task) => {
                    switch (target.dataset.modal){
                        case 'all':
                            switch (typeof(task)) {
                                case 'object':
                                    switch (Object.keys(task).length){
                                        case 10:
                                            return modalHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.mortgage, task.link)
                                        case 9:
                                            return modalBathHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.link)
                                    }        
                                case 'string':
                                    return modalTypeHousesOrBathHouses(task)
                            }
                        default:
                            switch (typeof(task)) {
                                case 'object':
                                    switch (task.type){
                                        case 'bathhouse':
                                            return modalBathHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.link)
                                        case 'two-storey house':
                                        case 'cottage':
                                            return modalHouse(task.img, task.alt, task.size, task.square, task.code, task.coust, task.mortgage, task.link)
    
                                    }
                                case 'string':
                                    return modalTypeHousesOrBathHouses(task)
    
                            }
                    }
                }
            ).join('')   
            
        updateCost()     
    }

    // open or close form modal

    function openOrCLoseFormModal(action) {
        switch (action){
            case 'open':
                feedBack.style.display = 'flex'
                document.body.style.overflow = 'hidden';
                break
            case 'close':
                form.reset()
                feedBack.style.display = 'none'
                document.body.style.overflow = '';
                break
        }
    }

    // create array by using position , name and number

    function createArrCountryCatalog() {
        const countryCatalog =[]

        for (let i = 0; i < arrayNameAndNumber.length; i++) {
            const indexPosition = arrayPositionBG.indexOf(arrayNameAndNumber[i])
    
            if (indexPosition != -1) {
                let task = {
                    name:  arrayNameAndNumber[i + 1],
                    number:  arrayNameAndNumber[i + 2],
                    position: `${arrayPositionBG[indexPosition + 1]} ${arrayPositionBG[indexPosition + 2]}`
                };
            
                countryCatalog.push(task)
            }
        }

        return countryCatalog
    }

    // modal item choice country

    function modalChoiceCountry(name, position, number){
        return `
            <div class="feedBack__menu-button">
                <div class="feedBack__menu-buttonLeft">${name}</div>
                <div class="feedBack__menu-buttonRight">
                    <div class="feedBack__menu-buttonNumber" data-position='${position}'>${number}</div>
                    <div class="img" style='background-position:${position}'></div>
                </div>
            </div>
        `
    }

    // create items form choice country

    function createFormChoiceCountry() {
        formButtonWrapper.innerHTML = createArrCountryCatalog().map(task => modalChoiceCountry(task.name, task.position, task.number)).join('')
    }

    function openOrCloseFeedbackMenu(event) {
        switch (formButtonWrapper.style.display){
            case 'none':
                formButtonWrapper.style.display = 'flex'
                break
            default:
                formButtonWrapper.style.display = 'none'
                break
        }
    }

    function changesCountryItem(number) {
        let width = window.getComputedStyle(number).width;
        width = +width.slice(0, width.length - 2);
        input.style.paddingLeft = `${width - 17 + 100}` + 'px'
        flag.style.backgroundPosition = number.dataset.position
        numberText.textContent = number.textContent
        formButtonWrapper.style.display = 'none'
    }

    function switchingCountry(event) {
        let target = event.target
        let number
        switch (target.className){
            case 'feedBack__menu-button':
                number = target.querySelector('.feedBack__menu-buttonNumber')
                input.dataset.phonemask = number.textContent
                changesCountryItem(number)
                break
            case 'feedBack__menu-buttonRight':
            case 'feedBack__menu-buttonLeft':
            case 'feedBack__menu-buttonNumber':
            case 'img':
                const parent = target.parentElement
                number = parent.querySelector('.feedBack__menu-buttonNumber')
                changesCountryItem(number)
                break
        }
    }

    // sending form 

    postData(form)
    
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let error = formValidate()

            const indexNumber = document.querySelector('.feedBack__menu-number').textContent
            const inputTel = document.querySelector('.feedBack__from-inputPhone').value
            
            btnText.classList.add('block')
            btnText.classList.remove('none')
            loader.classList.remove('block')
            loader.classList.add('none')
            
            if (error === 0) {
                const request = new XMLHttpRequest();
                request.open('POST', 'sendmail.php');
                const formData = new FormData(form);
                
                const phone = indexNumber + inputTel
                
                formData.set('user_phone', phone)
    
                request.send(formData);
    
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        showThanksModal()
                        form.reset();
                    } else {
                        alert(message.failure)
                    }
                });
            }
        });
    }

    function formValidate(){
        let error = 0;
        
        let formReq = document.querySelectorAll('._req')
        let errorInfo = document.querySelectorAll('.error')
        let errorInfoTel = document.querySelector('.errorTel')
        let errorInfoBig = document.querySelector('.errorBig')


        formRemoveError(input, errorInfoTel)
        formRemoveError(input, errorInfoBig)

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            const errorCar = errorInfo[index]
            formRemoveError(input, errorCar)

            if (input.name === 'user_name'){
                if (input.value.length > 25){
                    formAddError(input, errorInfoBig);
                    error++;
                }

                if (input.value.trim() === ''){
                    formAddError(input, errorCar)
                    error++;
                }
                
                
            }


            if (input.name === 'user_phone') {
                if (input.value === '') {
                    formAddError(input, errorCar);
                    error++;
                }

                if (input.value.length !== 15 && input.value.length > 0) {
                    formAddError(input, errorInfoTel)
                    error++;    
                }
            }       
        }

        return error;

    }


    function formAddError(input, error) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
        error.classList.add('show')
        error.classList.remove('notVisible')
    }

    function formRemoveError(input, error) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
        error.classList.remove('show')
        error.classList.add('notVisible')
    }

    function hideThanksModal() {
        const thanksModal = document.querySelector('.feedBackModal')
        thanksModal.classList.add('none')
        thanksModal.classList.remove('block')
    }

    function showThanksModal() {
        const thanksModal = document.querySelector('.feedBackModal')
        thanksModal.classList.remove('none')
        thanksModal.classList.add('block')

        setTimeout(hideThanksModal, 4000)
    }


    function closeFeedbackModal(event) {
        if (!e.target.classList.contains('feedBackModal__wrapper')) {
            feedBackModal.classList.add('none')
            feedBackModal.classList.remove('block')
        }
    }



    async function updateCost() {
        const data = await fetchAll()

        data['Дома'].forEach(house => {
            const code = house['ДомКод']
            
            const codeElement = document.getElementById(`${code}`)
            if (!codeElement) {
                return
            }
            
            let children = codeElement.children[0]
            let nextSib = codeElement.nextElementSibling.children[0]
            let cost = 0

            house['Разделы'].forEach(subsection => {
                switch (subsection['Раздел']){
                    case 'Строительство дома в базовой комплектации':
                        cost += subsection['Подразделы'][0]['Стоимость']
                    case 'Отделка фасада':
                        subsection['Подразделы'].forEach(item => {
                            if (item['Подраздел'] == 'Имитация бруса') {
                                cost += item['Стоимость']
                            }
                        })
                    case 'Внутренняя отделка и комфорт':
                        subsection['Подразделы'].forEach(item => {
                            if (item['Подраздел'] == 'Стены и потолки: имитация бруса') {
                                cost += item['Стоимость']
                            }
                        })
                }
            })


            children.textContent = cost
            nextSib.textContent = cost/5
        })
    }

    createAllElem(createEntireCatalogOfHouses(itemsHouse))  

    createFormChoiceCountry()

    menuOpenBytton.addEventListener('click', () => menuAddorRemoveClass('add'));

    menu.addEventListener('click', (event) => checkingTheTargetInTheMenu(event));

    overlay.addEventListener('click', () => menuAddorRemoveClass('remove'));

    fifthBlockButtonWrapper.addEventListener('click', (event) => actionOnFifthBLockButton(event));

    window.addEventListener('scroll', () => changesBGColorInNav());

    selectionButtonsMenu.addEventListener('click', (event) => redrawHousesFieldDueToFiltering(event));

    slidesFieldActionOpen.addEventListener('click', (event) => openModal(event));

    prevModal.addEventListener('click', () => plusSlides(-1));

    nextModal.addEventListener('click', () => plusSlides(1));

    buttonCloseModal.addEventListener('click', () => closeModal());

    slideModalField.addEventListener('click', (event) => zoomModalSlide(event));

    buttonModalFeedBack.addEventListener('click', () => openOrCLoseFormModal('open'));

    crestik.addEventListener('click', () => openOrCLoseFormModal('close'));

    feedBackMenu.addEventListener('click', (event) => openOrCloseFeedbackMenu(event));

    formButtonWrapper.addEventListener('click', (event) => switchingCountry(event));

    btnCLoseBlackCrestik.addEventListener('click', () => hideThanksModal());

    feedBackModal.addEventListener('click', (event) => closeFeedbackModal(event));

})