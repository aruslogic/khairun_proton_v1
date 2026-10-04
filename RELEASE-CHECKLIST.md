# Release 2026-10-04.2 — Digital showroom

## Selesai

- Repository asal digunakan; nombor SA 60172032996 dibaca daripada `catalog.js`.
- Lima model / 16 varian disemak dengan halaman, brosur dan sumber harga rasmi pada 4 Oktober 2026.
- Semakan sintaks, aset, manifest, ikon dan cache service worker lulus.
- Ujian lama: padanan, minimum tujuh tempat duduk, sesi rosak, konteks WhatsApp dan privasi trade-in lulus.
- Ujian baharu: kesepadanan JSON/runtime, harga sebelum rebat, tempat duduk/ADAS X90, galeri, kalkulator dan tarikh test drive lulus.
- Edge/Chromium headless: padanan → showroom; varian → kalkulator; compare silang model; test drive → URL WhatsApp; trade-in → privasi lulus.
- 12 laluan pada lebar 320, 390, 768 dan 1440 px: tiada overflow mendatar halaman. Jadual compare boleh discroll dalam bekasnya.
- Reload offline dan navigasi kalkulator lulus selepas cache siap.
- Screenshot telefon dan desktop disemak.
- Workflow Pages merangkumi fail showroom, aset, JSON dan kedua-dua suite semakan tanpa dependency.

## Had semakan

- Belum dipush atau dideploy; laman live masih versi terdahulu.
- Pemasangan telefon sebenar/iOS dan handoff aplikasi WhatsApp sebenar belum diuji. URL penerima dan medan mesej disemak tanpa menghantar mesej.
- Warna ialah sampel skrin; stok/warna varian disahkan Khairun. Foto galeri ialah ilustrasi brosur.
- Harga ialah rekod sumber rasmi, bukan sebut harga langsung. Promosi tidak digunakan dalam kalkulator. Tiada janji stok, kelulusan pembiayaan atau slot test drive.
- Sambungan telefon tertakluk kepada ketersediaan perisian. X70 Sport Edition ialah pakej terhad, bukan varian standard dalam senarai ini.

## Penerbitan

1. Semak pratonton dan maklumat jualan.
2. Push perubahan atau muat naik kandungan pakej ke repository asal; workflow Pages akan menjalankan semakan dan deployment.
3. Terima notis Kemas kini dalam PWA sedia ada dan semak aliran pada telefon sebenar.
