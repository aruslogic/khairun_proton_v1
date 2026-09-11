/* Reviewed 2026-09-09. Facts: official pages and brochures linked below.
   Match tags are ARUSLOGIC editorial rules, not manufacturer endorsements.
   No prices or promotions. Khairun model scope and contact confirmed by user-supplied flyer. */
globalThis.PM={
 reviewed:'9 September 2026',
 advisor:{name:'Khairun',whatsapp:'60172032996',displayPhone:'017-203 2996',showroom:'HZN Resources Sdn. Bhd.',address:'Lot 915, Jalan Tuanku Antah, 70100 Seremban, Negeri Sembilan'},
 allowedIds:['saga','s70','x50','x70','x90'],
 catalog:[
 {id:'saga',brand:'Proton',name:'Proton Saga',type:'Sedan',power:'Petrol',seats:5,tags:['Ulang-alik','Keselesaan'],note:'Sedan dengan enjin i-GT 1.5, 120 PS dan 150 Nm.',consideration:'Semak perbezaan transmisi dan kelengkapan keselamatan bagi varian pilihan.',variants:['1.5 Standard','1.5 Executive','1.5 Premium'],source:'https://www.proton.com/models/all-new-saga',variantSource:'https://www.proton.com/happenings/2025/november/the-all-new-saga-is-here-malaysia-s-iconic-sedan-drives-nation-into-a-new-era'},
 {id:'s70',brand:'Proton',name:'Proton S70',type:'Sedan',power:'Petrol',seats:5,tags:['Prestasi','Teknologi'],note:'S70 1.5TD menggunakan enjin i-GT turbo 181 PS dan transmisi DCT tujuh kelajuan.',consideration:'Lite dan Prime turut dipaparkan dalam pendaftaran minat rasmi. Spesifikasi 1.5TD di sini tidak boleh digunakan untuk dua varian itu; dapatkan butiran berasingan daripada Khairun.',variants:['1.5TD Executive','1.5TD Premium','1.5TD Flagship','1.5TD Flagship X'],source:'https://www.proton.com/models/s70',variantSource:'https://www.proton.com/happenings/2026/february/proton-defines-malaysia-s-sporty-sedan-with-the-2026-proton-s70',announcement:'https://www.proton.com/register-interest/s70-prime-lite'},
 {id:'x50',brand:'Proton',name:'Proton X50',type:'SUV',power:'Petrol',seats:5,tags:['Prestasi','Teknologi'],note:'SUV dengan enjin i-GT 1.5TD, 181 PS, 290 Nm dan transmisi DCT tujuh kelajuan.',consideration:'Ciri seperti sunroof dan bantuan pemanduan bergantung pada varian.',variants:['1.5TD Executive','1.5TD Premium','1.5TD Flagship'],source:'https://www.proton.com/models/all-new-x50',variantSource:'https://www.proton.com/happenings/2025/july/the-all-new-proton-x50-is-here-malaysia-s-no1-b-segment-suv-raises-the-bar-once-more'},
 {id:'x70',brand:'Proton',name:'Proton X70',type:'SUV',power:'Petrol',seats:5,tags:['Keluarga','Perjalanan jauh','Keselesaan'],note:'SUV dengan enjin i-GT 1.5TD dan transmisi DCT tujuh kelajuan.',consideration:'ADAS dan kelengkapan tempat duduk berbeza mengikut varian. Sport Edition ialah edisi terhad; ketersediaannya perlu disemak.',variants:['1.5TD Executive','1.5TD Premium'],source:'https://www.proton.com/models/x70',variantSource:'https://cms-assets.proton.com/proton-cms-blob/media/egudkist/2026-proton-x70-brochure.pdf'},
 {id:'x90',brand:'Proton',name:'Proton X90',type:'SUV',power:'Petrol',seats:7,seatsLabel:'6 atau 7 mengikut varian',tags:['Keluarga','Perjalanan jauh','Ruang','Keselesaan'],note:'SUV tiga baris dengan enjin i-GT 1.5TD. Lite dan Prime menggunakan bangku baris kedua; Prime X menggunakan captain seats.',consideration:'Jika memerlukan tujuh tempat duduk, pilih Lite atau Prime. Prime X mempunyai enam tempat duduk.',variants:['1.5TD Lite','1.5TD Prime','1.5TD Prime X'],variantSeats:{'1.5TD Lite':7,'1.5TD Prime':7,'1.5TD Prime X':6},source:'https://www.proton.com/models/x90',variantSource:'https://cms-assets.proton.com/proton-cms-blob/media/lzkpxp31/2026-proton-x90-leaflet.pdf'},
 ],
 get(id){return this.catalog.find(m=>m.id===id&&m.brand==='Proton'&&this.allowedIds.includes(m.id))},
 variants(m,minSeats){return m.variants.filter(v=>!m.variantSeats||m.variantSeats[v]>=Number(minSeats||1))},
 match(a,power='Petrol'){
  if(!Array.isArray(a)||a.length!==4||!['5','7'].includes(a[1])||!Array.isArray(a[2]))return [];
  return this.catalog.filter(m=>m.brand==='Proton'&&this.allowedIds.includes(m.id)&&m.seats>=Number(a[1])&&(power==='Semua'||m.power===power)).map(m=>({model:m,score:m.tags.filter(t=>[a[0],...a[2]].includes(t)).length+(m.type===a[3]?2:0)})).sort((a,b)=>b.score-a.score||a.model.id.localeCompare(b.model.id)).slice(0,3);
 }
};
