// Canonical lesson references -> YouVersion USFM. No lesson/data identifiers change.
const BOOKS={'Genesis':'GEN','Exodus':'EXO','Psalms':'PSA','Psalm':'PSA','Isaiah':'ISA','Jeremiah':'JER','Ecclesiastes':'ECC','Matthew':'MAT','John':'JHN','Acts':'ACT','Romans':'ROM','Ephesians':'EPH','1 Corinthians':'1CO','2 Corinthians':'2CO','Philippians':'PHP','1 Timothy':'1TI','Hebrews':'HEB','James':'JAS','1 John':'1JN','Revelation':'REV'};
export function passageIds(reference){
 const m=/^((?:[1-3] )?[A-Za-z]+) (\d{1,3}):(\d{1,3}(?:[-,]\d{1,3})*)$/.exec(reference);
 if(!m||!BOOKS[m[1]]||Number(m[2])<1)throw Error('reference');
 return m[3].split(',').map(part=>{const [start,end=start]=part.split('-').map(Number);if(start<1||end<start||end-start>=25)throw Error('reference');return `${BOOKS[m[1]]}.${Number(m[2])}.${start}${end===start?'':'-'+end}`;});
}
export const bibleVersions=Object.freeze({es:{id:128,name:'Nueva Versión Internacional 2025',abbreviation:'NVI'},en:{id:111,name:'New International Version 2011',abbreviation:'NIV'}});
