script_auto_random_post = 'on';
direct_to_link = 'www.meeran24x7.com';
type_direct = 'all'; //all or only
no_direct_domain ='#,whatsapp.com,facebook.com,wa.me,twitter.com,pinterest.com';
only_direct_domain = 'drive.google.com,';
type_target_click = '_blank'
path = '#?go=';
*/

if (script_auto_random_post == 'on') {
    var hasilgetlinkarp = false;
    $.ajax({
        url: '//' + direct_to_link + "/feeds/posts/summary/?alt=json-in-script&orderby=updated&max-results=9999",
        type: 'get',
        dataType: 'jsonp',
        success: function aku(younglex) {
            var cewek_cantik = younglex.feed;
            var ambillinku = cewek_cantik.openSearch$totalResults.$t;
            if (ambillinku > 150) {
                var totallinkarp = 150;
            };
            if (ambillinku <= 150) {
                var totallinkarp = ambillinku;
            };
            var listlinkku = new Array();

            for (var i = 0; i < totallinkarp; i++) {
                if (cewek_cantik.entry[i].link[4] === undefined) {
                    var akuula = cewek_cantik.entry[i].link[2].href;
                    if (akuula.indexOf(direct_to_link) >= 0) {
                        listlinkku[i] = cewek_cantik.entry[i].link[2].href;
                    }
                } else {
                    listlinkku[i] = cewek_cantik.entry[i].link[4].href;
                }

            }
            hasilgetlinkarp = listlinkku;
            nextgetarp();
        },
        async: false
    });

    function nextgetarp() {
        var long_bungabdi_tampan = document.getElementsByTagName('a').length;
        var bungabdi_tampan = new Array();
        var bungabdi_tampan2 = new Array();
        var kasian_si_jomblo = new Array();
        var kasian_si_jomblo2 = new Array();
        var filter_bungabdi_tampan = -1;
        var filter_bungabdi_tampan2 = -1;
        var filter_bungabdi_tampan3 = -1;
        if (type_direct == 'all') {
            fix_nodirect_domain = (no_direct_domain + ',' + window.location.hostname + ',blogger.com,javascript:void(0);').split(',');
            i_love_you1();

            function i_love_you1() {
                filter_bungabdi_tampan += 1;
                if (filter_bungabdi_tampan < long_bungabdi_tampan) {
                    var bertobatla = document.getElementsByTagName('a')[filter_bungabdi_tampan].href;
                    bertobatla = bertobatla.replace('http://', '');
                    bertobatla = bertobatla.replace('https://', '');
                    bertobatla = bertobatla.replace('www.', '');
                    bertobatla = bertobatla.replace('#', '');
                    bertobatla = bertobatla.replace('?', '');
                    bungabdi_tampan[filter_bungabdi_tampan] = bertobatla.split('/')[0];
                    kasian_si_jomblo[filter_bungabdi_tampan] = filter_bungabdi_tampan;
                    i_love_you1();
                } else {
                    i_love_you2();
                }
            }

            function i_love_you2() {
                filter_bungabdi_tampan2 += 1;
                if (filter_bungabdi_tampan2 < fix_nodirect_domain.length) {
                    i_love_you3(filter_bungabdi_tampan2);
                    i_love_you2();
                } else {
                    i_love_you4();
                }
            }

            function i_love_you3(filter_bungabdi_tampan2) {
                if (bungabdi_tampan.indexOf(fix_nodirect_domain[filter_bungabdi_tampan2]) >= 0) {
                    var dompet_kosong = bungabdi_tampan.indexOf(fix_nodirect_domain[filter_bungabdi_tampan2]);
                    bungabdi_tampan[dompet_kosong] = -1;
                    kasian_si_jomblo[dompet_kosong] = -1;
                    i_love_you3(filter_bungabdi_tampan2);
                }
            }

            function i_love_you4() {
                filter_bungabdi_tampan3 += 1;
                if (filter_bungabdi_tampan3 < bungabdi_tampan.length) {
                    if (kasian_si_jomblo[filter_bungabdi_tampan3] > 0) {
                        var dunia_cuman_sebentar = kasian_si_jomblo[filter_bungabdi_tampan3];
                        if (document.getElementsByTagName('a')[dunia_cuman_sebentar].href.split('').length > 0) {
                            var rajin_sholat_ya = document.getElementsByTagName('a')[dunia_cuman_sebentar].href;
                            var ibuku_baik = aesCrypto.encrypt(convertstr(rajin_sholat_ya), convertstr('root'));
                            var mengantuk = hasilgetlinkarp[parseInt(Math.random() * hasilgetlinkarp.length)] + path + ibuku_baik;
                            document.getElementsByTagName('a')[dunia_cuman_sebentar].setAttribute('href', mengantuk);
                            document.getElementsByTagName('a')[dunia_cuman_sebentar].setAttribute('target', type_target_click);
                        }
                    }
                    i_love_you4();
                }
            }
        }
        //only_direct_domain
        if (type_direct == 'only') {
            for (var ji = 0; ji < only_direct_domain.split(',').length; ji++) {
                for (var i = 0; i < long_bungabdi_tampan; i++) {
                    var bungabdi_tampan2 = document.getElementsByTagName('a');
                    bungabdi_tampan[i] = bungabdi_tampan2[i].href.replace('http://', '').replace('https://', '').split('/')[0];
                    if (bungabdi_tampan[i].indexOf(only_direct_domain.split(',')[ji]) >= 0) {
                        var rajin_sholat_ya = document.getElementsByTagName('a')[i].href;
                        var ibuku_baik = aesCrypto.encrypt(convertstr(rajin_sholat_ya), convertstr('root'));
                        var mengantuk = hasilgetlinkarp[parseInt(Math.random() * hasilgetlinkarp.length)] + path + ibuku_baik;
                        document.getElementsByTagName('a')[i].setAttribute('href', mengantuk);
                        document.getElementsByTagName('a')[i].setAttribute('target', type_target_click);
                        console.log(only_direct_domain.split(',')[ji] + ' ada di posisi ' + i)
                    }
                }
            }
        }
    }

}
