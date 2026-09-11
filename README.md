# Khairun Proton — ProtonMatch

Versi terkini dengan profil Khairun, lima model Proton, padanan, perbandingan, trade-in, mesej WhatsApp dan kredit ARUSLOGIC.

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
- Harga, anggaran pembiayaan dan kelayakan rebat tidak dikira secara automatik.
- Fail JavaScript dan peraturan padanan dihantar ke pelayar. GitHub Pages tidak menyembunyikan business logic; perlindungan itu memerlukan backend.
- Nombor SA: 017-203 2996. Pautan promosi pembangun: https://wa.me/qr/AGHHT7IHPCMFI1.
- Untuk semakan tempatan: `python -m http.server 8000` kemudian buka http://localhost:8000.

## Aset

Foto Khairun dan logo ARUSLOGIC dibekalkan oleh pemilik projek. Sumber imej model direkodkan dalam ASSET-SOURCES.md.

2026 Arus Logic by Zaikeri_Rosli

## Status persediaan

Lihat RELEASE-CHECKLIST.md untuk semakan yang lulus dan batas yang belum disahkan. GitHub repository dan Pages belum dicipta/diaktifkan oleh eksport ini.

## Rujukan teknikal

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
