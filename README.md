# Khairun Proton — ProtonMatch

Digital Proton Sales Advisor dengan showroom dalaman untuk Saga, S70, X50, X70 dan X90. Padanan empat soalan, trade-in, profil Khairun dan kredit ARUSLOGIC dikekalkan.

## Kemas kini 4 Oktober 2026

- Halaman model dalaman: harga varian, spesifikasi, kelengkapan, keselamatan/ADAS, sampel warna dan galeri brosur rasmi.
- S70: Lite, Prime, Premium, Flagship dan Flagship X. Enjin tanpa turbo dan turbo dibezakan.
- Compare dua varian/model dengan penanda perbezaan dan anggaran beza ansuran.
- Kalkulator menggunakan harga varian, deposit RM, kadar rata boleh ubah dan tempoh 5/7/9 tahun. Bukan tawaran bank.
- Test drive: nama, model, varian, tarikh dan masa Malaysia disusun ke WhatsApp asal Khairun, 60172032996. Pelanggan menekan Hantar sendiri; slot belum disahkan.
- Floating WhatsApp dengan konteks pilihan; promosi bertarikh dipisahkan daripada data model.
- Harga katalog ialah OTR Semenanjung, individu persendirian, tanpa insurans, sebelum rebat. Rebat tidak ditolak automatik.
- Warna ialah sampel skrin, bukan simulasi warna kereta. Galeri ilustrasi brosur; kelengkapan mengikut varian.

## Kemas kini data

Edit `data/saga.json`, `s70.json`, `x50.json`, `x70.json` atau `x90.json`. Sumber rasmi dan tarikh semakan direkod setiap model. Promosi hanya berada di `data/promotions.json`.

```text
node scripts/build-data.mjs
node tests/validate.mjs
node tests/showroom.mjs
```

`showroom-data.js` dijana daripada JSON dan mesti dihantar bersama aplikasi untuk startup serta penggunaan offline. Katalog asal mengekalkan peraturan padanan; varian dan rujukan brosur diselaraskan daripada data baharu. Naikkan `RELEASE` dalam `sw.js` selepas perubahan fail awam. Tambah aset baharu ke cache dan workflow jika perlu.

## Ujian pelayar

Dengan pelayan tempatan berjalan dan Playwright tersedia, jalankan `node tests/browser.cjs`. Pilihan persekitaran: `PLAYWRIGHT_MODULE`, `BROWSER_PATH` dan `TEST_URL`. Ujian merangkumi empat lebar skrin, aliran utama dan reload offline. WhatsApp dipintas semasa ujian; tiada mesej dihantar.

## Deploy melalui GitHub Actions (disyorkan)

1. Muat naik kandungan folder ini ke root repositori. `index.html` mesti berada di root, bukan di dalam folder tambahan. Ekstrak ZIP sebelum memuat naik.
2. Buka Settings → Pages.
3. Pilih GitHub Actions sebagai Source. Workflow `.github/workflows/pages.yml` menjalankan semakan dan menerbitkan fail awam sahaja. Jalankan workflow secara manual jika push pertama berlaku sebelum Pages diaktifkan.
4. Tunggu penerbitan selesai dan buka pautan yang ditunjukkan oleh GitHub Pages.

Semua pautan aset menggunakan laluan relatif untuk menyokong URL repositori GitHub Pages.

## Nota pembangunan

- Tiada build, server atau API key diperlukan.
- PWA statik dengan manifest.json, service worker, ikon 192/512/maskable dan apple-touch-icon. Pemasangan bergantung pada sokongan pelayar; pada iPhone gunakan Safari → Share → Add to Home Screen.
- Selepas lawatan online pertama selesai, aset boleh digunakan offline. WhatsApp dan rujukan Proton memerlukan internet.
- Selepas perubahan aset, naikkan RELEASE dalam sw.js. Pelanggan ditawarkan butang kemas kini dan pilihan sesi dikekalkan.
- Jalankan `node tests/validate.mjs` sebelum commit.
- Alternatif tanpa Actions: Settings → Pages → Deploy from a branch → main → / (root).
- Jawapan disimpan dalam sessionStorage pada tab pelanggan. Tiada database lead atau penghantaran mesej automatik.
- Pembelian dihadkan kepada Saga, S70, X50, X70 dan X90. Trade-in boleh memasukkan jenama lain.
- Harga varian digunakan dalam anggaran pembiayaan; kelayakan rebat dan kelulusan bank tidak ditentukan aplikasi.
- Fail JavaScript dan peraturan padanan dihantar ke pelayar. GitHub Pages tidak menyembunyikan business logic; perlindungan itu memerlukan backend.
- Nombor SA: 017-203 2996. Pautan promosi pembangun: https://wa.me/qr/AGHHT7IHPCMFI1.
- Untuk semakan tempatan: `python -m http.server 8000` kemudian buka http://localhost:8000.

## Aset

Foto Khairun dan logo ARUSLOGIC dibekalkan oleh pemilik projek. Sumber imej model direkodkan dalam ASSET-SOURCES.md.

2026 Arus Logic by Zaikeri_Rosli

## Status persediaan

Lihat RELEASE-CHECKLIST.md untuk hasil semakan. Kemas kini ini berada dalam salinan tempatan repository asal `aruslogic/khairun_proton_v1`. Belum dipush atau diterbitkan ke laman live.

## Rujukan teknikal

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
