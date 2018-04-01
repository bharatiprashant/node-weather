const fs = require('fs')

var fetchNote = () => {
    try{
        notes = fs.readFileSync('note-data.json')
        return JSON.parse(notes);
    }catch(e){
        return [];
    }
};

var saveNote = (notes) => {
    fs.writeFileSync('note-data.json',JSON.stringify(notes));
}

var addingNote = (address,temperature) => {
 var notes = fetchNote();
 var note = {
     address,
     temperature
 };
 //checking weather the address is already present there or not it will only save new address
 duplicatesNote = notes.filter((note) => note.address == address);
 if(duplicatesNote.length === 0){
     notes.push(note);
     saveNote(notes);
     return note
 }

};

var readNote = (address) => {
    notes = fetchNote();
    readingNote = notes.filter((note) => note.address == address)
    return readingNote[0]
    
}

var getAll = () => {
    notes = fetchNote ();
    return notes
}

var removeNote = (address) => {
    notes = fetchNote();
    
}

module.exports = {
    addingNote,
    readNote
}