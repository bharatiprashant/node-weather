const yargs = require("yargs")
var getAddress = require("./getAddress/getAddress")
var getTemperature = require("./weather/getTemperature")
var note = require("./note/note")
const argv = yargs
                .option({
                    a:{
                        demand:true,
                        alias:"address",
                        describe:"Address for fetching the temperature",
                        string:true
                    },
                    action:{
                        demand:true,
                        alias:'command',
                        describe:"Action what to do with the temperature",
                        string:true
                     }
                
                })
                .help()
                .alias('help','h')
                .argv;
                

if(argv.action == 'add'){
getAddress.gettingAddress(argv.address,(error,result) => {
    if(error){
        console.log(error)
    }else{
        Address = result.Address;
        getTemperature.getTemp(result.Latitude,result.Longitutde,(error,results) => {
            if(error){
                console.log(error)
            }else{
                Temperature = results.temperature
                note = note.addingNote(Address,Temperature)
                if(note){
                    console.log('Note Created');
		            console.log('---');
		            console.log(`Address: ${note.address}`);
		            console.log(`temperature: ${note.temperature}`);

                }else{
                    console.log("Note address taken");
                }
                
            }
        })


    }
});
}else if(argv.action == 'read'){
    var note = note.readNote(argv.address)
    if(note){
        
        console.log("Note Found");
        console.log("---------------");
        console.log(`Address:${note.address}`)
        console.log(`Temperature:${note.temperature}`);
    }else{
        console.log("No note found");
    }

}else if(argv.action == 'list'){

}else if(argv.action == 'delete'){

}else{
    console.log("Invalid action")
}
