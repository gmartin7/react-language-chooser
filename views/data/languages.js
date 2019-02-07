// This is actually a small section of the data for testing.
// The next 25 lines demonstrate the actual data format of one entry from the downloaded resource at:
// https://ldml.api.sil.org?query=alltags&ext=json
// {
//   "full": "blt-Tavt-VN", 
//   "iso639_3": "blt", 
//   "name": "Tai Dam", 
//   "names": [
//       "Black Tai", 
//       "Hei Dai", 
//       "Jinping Dai", 
//       "Tai Do", 
//       "Tai Noir", 
//       "Tailam", 
//       "Tailon", 
//       "Thai Den", 
//       "Thái Den", 
//       "Táy-Dam"
//   ], 
//   "region": "VN", 
//   "regions": "CN LA TH US", 
//   "sldr": true, 
//   "tag": "blt", 
//   "tags": [
//       "blt-VN", 
//       "blt-Tavt"
//   ]
// }
// There could be more than one entry with the same "iso639_3" code (e.g. 'blt' has 3 entries), but there will only be
// one entry with the same "tag".

module.exports = [
  { name: 'Lao', tag: 'lo', region: 'Cambodia', regions: 'Lao People\'s Democratic Republic', names: 'Lao-Kao'},
  { name: 'Thai', tag: 'th', region: 'Cambodia', regions: 'Thailand', names: 'Thai-Ko'},
  { name: 'Akeu', tag: 'aeu', region: 'China', regions: 'Lao People\'s Democratic Republic', names: 'Aki, Akui, Akheu'},
  { name: 'Akha', tag: 'ahk', region: 'China', regions: 'Lao People\'s Democratic Republic', names: 'Ahka, Aini, Aka'},
  { name: 'Ban Khor', tag: 'bfa', region: 'Thailand', names: 'pasa kidd'},
  { name: 'Pa\'o Karen', tag: 'blk', region: 'Myanamar', regions: 'Thailand', names: 'P\'ao, Northern'},
  { name: 'Blang', tag: 'blr', region: 'China', regions: 'Myanamar, Thailand', names: 'Kem Degne'},
  { name: 'Tai Dam', tag: 'blt', region: 'China', regions: 'Lao People\'s Democratic Republic', names: 'Black Tai, Hei Dai'},
  { name: 'Sokoro', tag: 'sok', region: 'Chad', regions: '', names: '' }
];


