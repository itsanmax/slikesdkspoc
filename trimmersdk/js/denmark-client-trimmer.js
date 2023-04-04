
/**
 * @author: sandeep.gupta1@timmesinternet.in
 * @desc: Code added for use in Denmark UI for slike video trimmer. POC done as per the 
 * provided SDK(trimsdk.js) by Slike Team
 */
this.slikeSdkObj = null;
this.slikeUserObj = false;
this.launchClipElem = null;
this.createdSlikeId = null;

window.onload = (event) => {
    console.log('window loaded....');

    this.launchClipElem = document.getElementById("launch-clip");

    // init Slike SDK and connect user
    initSlikeSdk();

    this.launchClipElem.onclick = () => {
        this.slikeSdkObj.close();
        console.log("== Launch Trimer for slike ID: ");
        let slikeid = document.getElementById("slikeid").value;
        console.log("== slikeid: "+ slikeid);
        
        launchTrimmer(slikeid);
    }


};

enableButtons = () => {
    this.launchClipElem.disabled = false;
}
enableNextSteps = (data) => {
    this.createdSlikeId = data.new_slike_id;
    alert("Created Slike ID: " + this.createdSlikeId);
    document.getElementById("next-step-btn").disabled = false;
}


initSlikeSdk = () => {
    //intialization of sdk
    //sso-token parameter1  //stg for staging sso and  prod for production sso parameter 2
    this.slikeSdkObj = new TrimmerSDK("ec5c8b64a83144dfbff3fd789b18966a","dev");
    
    //dev for qc server and prod or left out without any parameter for prduction server 
    this.slikeSdkObj.setApiBase('dev');  

    verifyUser();

}

verifyUser = () => {
    this.slikeSdkObj.verifyUser().then((result) => {
        return result.json();
    }).then((data) => {
        if(data.code ==200) {
            this.slikeUserObj = data; 
            enableButtons();
            //parameter 1 is slike id 
            //parameter 2 is callback function to recive response
            // let parentElem = document.getElementById("trim-container");
            // this.slikeSdkObj.launchTrimmer("1x8ps7b9ok",myfunc,parentElem);
        }else{
            console.error(data)
        }

    })
}

// default with sdk : recid : KYj9D4cBY84W4PYI723V , livetvid :"n1pg6lggl9",
// type mandatory: alert
launchTrimmer = (slikeId) => {
    
    //parameter 1 is slike id 
    //parameter 2 is callback function to recive response
    let parentElem = document.getElementById("trim-container");
    this.slikeSdkObj.launchTrimmer(slikeId,myCallbackFn,parentElem);
    
}


myCallbackFn = (data) => {
    console.log("callback response ", data);
    if (data) {
        enableNextSteps(data);
    }
    this.slikeSdkObj.close();
}